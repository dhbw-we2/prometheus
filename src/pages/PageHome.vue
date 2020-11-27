<template>
  <q-page class="flex-center bg-image">
    <div class="q-pa-md">
      <div class="row">
        <div class="col col-12 offset-md-1 col-md-6">
          <div class="flex-center justify-start">
            <div class="col text-white">
              <h4>Anstehende Events</h4>
            </div>
          </div>
          <q-card class="my-card">
            <div class="calendarCard">
              <div class="row justify-center items-center">
                <q-btn flat label="Zurück" @click="calendarPrev"/>
                <q-separator vertical/>
                <q-btn flat label="Vor" @click="calendarNext"/>
              </div>
              <q-separator/>
              <div style="overflow: hidden">
                <q-calendar
                  ref="calendar"
                  v-model="selectedDate"
                  view="week-agenda"
                  animated
                  transition-prev="slide-right"
                  transition-next="slide-left"
                  locale="de-de"
                  style="height: 400px;"
                >
                  <template #day-body="{ timestamp }">
                    <template v-for="(agenda) in getAgenda(timestamp)">
                      <div
                        :key="timestamp.date + agenda.time"
                        :label="agenda.time"
                        class="justify-start q-ma-sm shadow-5 bg-grey-6"
                      >
                        <div v-if="agenda.avatar" class="row justify-center" style="margin-top: 30px; width: 100%;">
                          <q-avatar style="margin-top: -25px; margin-bottom: 10px; font-size: 60px; max-height: 50px;">
                            <img :src="agenda.avatar" style="border: #9e9e9e solid 5px;">
                          </q-avatar>
                        </div>
                        <div class="col-12 q-px-sm">
                          <strong>{{ agenda.desc }}</strong>
                        </div>
                        <div class="col-12 q-px-sm" style="font-size: 15px;">
                          von {{ agenda.creator }}
                        </div>
                        <div class="col-12 q-px-sm" style="font-size: 15px;">
                          {{ agenda.time }}
                        </div>
                      </div>
                    </template>
                  </template>
                </q-calendar>
              </div>
            </div>
          </q-card>
        </div>
        <div class="col col-12 col-md-4">
          <div :class="padding">
            <div class="flex-center justify-start">
              <div class="text-white">
                <h4>Nächstes Event</h4>
              </div>
              <div v-if="dataReady" class="col q-pb-md">
                <q-card class="my-card">
                  <q-card-section>
                    <div class="row items-center no-wrap">
                      <div class="col">
                        <div class="text-h5">{{ events[nextEventIndex].Name }}</div>
                        <div class="text-subtitle2 q-pa-sm">erstellt von: {{ events[nextEventIndex].Creator }}</div>
                      </div>

                    </div>
                  </q-card-section>
                  <q-card-section class="q-pt-none">
                    <q-list>
                      <q-item>
                        <q-item-section avatar>
                          <q-icon color="dark" name="place"/>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>Wo</q-item-label>
                          <q-item-label caption>{{ events[nextEventIndex].Location }}</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section avatar>
                          <q-icon color="dark" name="today"/>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>Wann</q-item-label>
                          <q-item-label caption>{{ events[nextEventIndex].DateTime | dateToString }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section>
                    <q-expansion-item
                      expand-separator
                      icon="list"
                      label="Zutaten die ich mitbringe"
                      :caption="events[nextEventIndex].ItemsFinished"
                    >
                      <q-card>
                        <q-list>
                          <q-item
                            v-for="item in events[nextEventIndex].LoadedItems">
                            <q-item-section avatar>
                              <q-avatar size="28px">
                                <img :src="item.Creator.profilePhoto">
                              </q-avatar>
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{ item.Name }}</q-item-label>
                              <q-item-label caption>{{ item.Amount }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-card>
                    </q-expansion-item>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
import {date} from "quasar";
import firebase from 'firebase/app';
import {QSpinnerGears} from 'quasar';
import {getAllGroupsOfUser, getEventsOfGroups} from "src/js/global.js";

export default {
  data() {
    return {
      selectedDate: '',
      padding: '',
      events: [],
      nextEventIndex: 0,
      dataReady: false
    }
  },
  filters: {
    dateToString(timestamp) {
      let timestampInMs = timestamp.seconds * 1000
      return date.formatDate(timestampInMs, "DD.MM.YYYY HH:mm") + " Uhr"
    }
  },
  methods: {

    async getDataWithLoading() {
      this.$q.loading.show({
        message: 'Deine Daten werden geladen...',
        backgroundColor: 'grey',
        spinner: QSpinnerGears,
        customClass: 'loader'
      })
      try {

        await this.getCalendarData()

      } catch (err) {
        console.error(err)
        this.$q.notify({
          message: "Ein Fehler ist aufgetreten: ${err}",
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
      }
    },
    async getItemsOfUser(userId) {
      let data = [];
      let userRef = this.$firestore.collection("users").doc(userId);
      await this.$firestore.collection("Items").where("Shopper", "==", userRef).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            data.push(doc.data());
          });
        });
      return data;
    },
    async getCalendarData() {
      let userId = this.$fb.auth().currentUser.uid
      let groups = await getAllGroupsOfUser(userId);
      let events = await getEventsOfGroups(groups);

      if(events.length > 0)
      {
        let nextEventLoaded = false
        for(let event in events)
        {
          if( (Date.now() < (events[event].DateTime.seconds * 1000) ) && !nextEventLoaded)
          {
            this.nextEventIndex = event;
            await this.loadEventData(events[event]);
            nextEventLoaded = true
          }else{
            await this.loadCreatorOfEvent(events[event]);
          }
        }
      }

      this.events = events;
      this.dataReady = true;
    },

    async loadEventData(event) {
      await this.loadAllItemsOfEvent(event)
      await this.loadCreatorOfEvent(event)
      await this.loadAllParticipantsOfEvent(event)
    },
    async loadAllParticipantsOfEvent(event) {
      event.Participants = []
      let groupID = event.Group.id
      let groupRef = await this.$firestore.collection("Groups").doc(groupID).get();
      let group = groupRef.data();
      for (let userRefs of group.Users) {
        let userRef = await this.getUserRefByUserId(userRefs.id)
        let user = userRef.data()
        event.Participants.push(user)
      }
    },

    async loadAllItemsOfEvent(event) {
      event.LoadedItems = []
      event.ItemsFinished = ""
      let currentUser = this.$fb.auth().currentUser.uid
      for (let itemIndex in event.Items) {
        try {
          let item = await this.getItemData(event.Items[itemIndex])

          if (item.Shopper.id === currentUser) {
            event.LoadedItems.push(await this.getItemData(event.Items[itemIndex]))
          }
        } catch (error) {
          console.warn("Could not load item " + event.Items[itemIndex].id + "! \n " +
            "Maybe item got deleted but reference in the event is still pointing on it")
        }
      }
    },

    async loadCreatorOfEvent(event) {
      if (event.Creator) {
        let creatorRef = await this.getUserRefByUserId(event.Creator.id)
        let creator = creatorRef.data()
        if (creator) {
          event.Creator = creator.fullName
          event.CreatorPhoto = creator.profilePhoto
        } else {
          event.Creator = ""
          event.CreatorPhoto = ""
        }
      }
    },
    async getItemDataById(itemID) {
      let newItem = await this.getItemByItemId(itemID)
      newItem.Id = itemID
      let creatorRef = await this.getUserRefByUserId(newItem.Creator.id)
      newItem.Creator = creatorRef.data()
      let shopper
      try {
        let shopperRef = await this.getUserRefByUserId(newItem.Shopper.id)
        shopper = shopperRef.data()
      } catch (error) {
        shopper = ""
      }
      newItem.Shopper = shopper
      return newItem
    },

    async getItemData(item) {
      let newItem = await this.getItemByItemId(item.id)
      newItem.Id = item.id
      let creatorRef = await this.getUserRefByUserId(newItem.Creator.id)
      newItem.Creator = creatorRef.data()
      let shopper
      try {
        let shopperRef = await this.getUserRefByUserId(newItem.Shopper.id)
        shopper = shopperRef.data()
      } catch (error) {
        shopper = ""
      }
      newItem.Shopper = shopper
      return newItem
    },
    async getItemByItemId(itemId) {
      let docRef = this.$firestore.collection("Items").doc(itemId);
      var returnValue
      await docRef.get().then(function (doc) {
        if (doc.exists) {
          returnValue = doc.data()
        }
      }).catch(function (error) {
        console.log("Error getting item:", error);
      });
      return returnValue;
    },
    async getUserRefByUserId(userId) {
      let docRef = this.$firestore.collection("users").doc(userId);
      var returnValue
      await docRef.get().then(function (doc) {
        if (doc.exists) {
          returnValue = doc
        }
      }).catch(function (error) {
        console.log("Error getting user:", error);
      });
      return returnValue;
    },

    getEventsOfDay(day) {

    },
    
    getAgenda(day) {
      let eventsOfDay = [];
      let dateOfDay = new Date(day.date)

      for (let event of this.events) {
        let dateOfEvent = new Date(event.DateTime.seconds * 1000)

        if (dateOfDay.toDateString() === dateOfEvent.toDateString()) {
          let party = {
            time: dateOfEvent.toTimeString().substr(0, 5),
            avatar: event.CreatorPhoto,
            desc: event.Name,
            creator: event.Creator
          };
          eventsOfDay.push(party);
        }
      }
      return eventsOfDay;
    },
    calendarNext() {
      this.$refs.calendar.next()
    },
    calendarPrev() {
      this.$refs.calendar.prev()
    }
  },
  /**
   * determines the screen size of the user and therefore adjusts the padding
   */
  mounted() {
    if (this.$q.screen.gt.sm) {
      this.padding = 'q-px-xl'
    } else {
      this.padding = ''
    }
  },
  async created() {
    await this.getDataWithLoading();
  }
}
</script>




