<template>
  <q-page class="flex-center bg-negative">
    <div class="q-pa-md">
      <div class="row">
        <div class="col col-12 offset-md-1 col-md-6">
            <div class="flex-center justify-start">
              <div class="col text-white">
                <h4>Anstehende Events</h4>
              </div>
            </div>
            <q-card>
              <div class="calendarCard">
                <div class="row justify-center items-center">
                  <q-btn flat label="Prev" @click="calendarPrev"/>
                  <q-separator vertical/>
                  <q-btn flat label="Next" @click="calendarNext"/>
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
                    locale="en-us"
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
                            <q-avatar
                              style="margin-top: -25px; margin-bottom: 10px; font-size: 60px; max-height: 50px;">
                              <img :src="agenda.avatar" style="border: #9e9e9e solid 5px;">
                            </q-avatar>
                          </div>
                          <div class="col-12 q-px-sm">
                            <strong>{{ agenda.time }}</strong>
                          </div>
                          <div v-if="agenda.desc" class="col-12 q-px-sm" style="font-size: 10px;">
                            {{ agenda.desc }}
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
              <div v-if="this.events.length > 0" class="col q-pb-md">
                <q-card class="my-card" style="width: 100%;">
                  <q-card-section>
                    <div class="row items-center no-wrap">
                      <div class="col">
                        <div class="text-h5">{{ events[0].Name }}</div>
                        <div class="text-subtitle2 q-pa-sm">erstellt von: {{ events[0].Creator }}</div>
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
                          <q-item-label caption>{{ events[0].Location }}</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section avatar>
                          <q-icon color="dark" name="today"/>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>Wann</q-item-label>
                          <q-item-label caption>{{ events[0].DateTime | dateToString }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                  <q-card-section>
                    <q-expansion-item
                      expand-separator
                      icon="list"
                      label="Zutaten die ich mitbringe"
                      :caption="events[0].ItemsFinished"
                    >
                      <q-card>
                        <q-list>
                          <q-item
                            v-for="item in events[0].LoadedItems">
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
      userItems: [],
      events: [],
      agenda: {
        // value represents day of the week
        1: [
          {
            time: '08:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
            desc: 'Meeting with CEO'
          },
          {
            time: '08:30',
            avatar: 'https://cdn.quasar.dev/img/avatar.png',
            desc: 'Meeting with HR'
          },
          {
            time: '10:00',
            avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
            desc: 'Meeting with Karen'
          }
        ],
        2: [
          {
            time: '11:30',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
            desc: 'Meeting with Alisha'
          },
          {
            time: '17:00',
            avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
            desc: 'Meeting with Sarah'
          }
        ],
        3: [
          {
            time: '08:00',
            desc: 'Stand-up SCRUM',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          },
          {
            time: '09:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
          },
          {
            time: '10:00',
            desc: 'Sprint planning',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          },
          {
            time: '13:00',
            avatar: 'https://cdn.quasar.dev/img/avatar1.jpg'
          }
        ],
        4: [
          {
            time: '09:00',
            avatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
          },
          {
            time: '10:00',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
          },
          {
            time: '13:00',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          }
        ],
        5: [
          {
            time: '08:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
          },
          {
            time: '09:00',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
          },
          {
            time: '09:30',
            avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
          },
          {
            time: '10:00',
            avatar: 'https://cdn.quasar.dev/img/avatar5.jpg'
          },
          {
            time: '11:30',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          },
          {
            time: '13:00',
            avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
          },
          {
            time: '13:30',
            avatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
          },
          {
            time: '14:00',
            avatar: 'https://cdn.quasar.dev/img/linux-avatar.png'
          },
          {
            time: '14:30',
            avatar: 'https://cdn.quasar.dev/img/avatar.png'
          },
          {
            time: '15:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
          },
          {
            time: '15:30',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
          },
          {
            time: '16:00',
            avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
          }
        ]
      }
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
        await this.getItems()

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
    async getItems() {
      let userId = this.$fb.auth().currentUser.uid
      let items = await this.getItemsOfUser(userId);
      this.userItems = items;
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

      if (events.length > 0) {
        await this.loadEventData(events[0]);
      }

      this.events = events;

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
        } else {
          event.Creator = ""
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
      return this.agenda[parseInt(day.weekday, 10)]
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
  mounted(){
    if(this.$q.screen.gt.md){
      this.padding='q-px-xl'
    }
    else{
      this.padding=''
    }
  },
  async created() {
    await this.getDataWithLoading();
  }
}
</script>




