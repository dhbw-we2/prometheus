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
                        <q-separator></q-separator>
                        <div class="col-12 q-px-sm" style="font-size: 15px;">
                          {{ agenda.time }}
                        </div>
                        <div class="col-12 q-px-sm" style="font-size: 15px;">
                          {{ agenda.loc }}
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

                <q-card class="my-card" v-if="nextEventIndex > -1">
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
                            v-for="item in events[nextEventIndex].LoadedItems" v-bind:key="item.id">
                            <q-item-section avatar>
                              <q-avatar color="blue-grey-10" icon="person" text-color="white" font-size="32px" v-if="item.Creator.profilePhoto === '' "></q-avatar>
                              <q-avatar v-else size="28px">
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
                <q-card class="my-card" v-if="nextEventIndex == -1">
                  <q-card-section>
                    <div class="row items-center no-wrap">
                      <div class="col">
                        <div class="text-h5">Es gibt kein Event in nächster Zeit</div>
                      </div>
                    </div>
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
import {QSpinnerGears} from 'quasar';
// import some functions from other locations
import {getAllGroupsOfUser, getEventsOfGroups} from "src/js/global.js";

export default {
  data() {
    return {
      // data to fill the Home Page
      selectedDate: '',
      padding: '',
      events: [],
      nextEventIndex: -1,
      dataReady: false
    }
  },
  filters: {
    /**
     * Filter to display a timestamp in normal date time format
     * @param timestamp
     * @returns {string}
     */
    dateToString(timestamp) {
      let timestampInMs = timestamp.seconds * 1000
      return date.formatDate(timestampInMs, "DD.MM.YYYY HH:mm") + " Uhr"
    }
  },
  methods: {
    /*
    * load the data and display a spinning gear while fetching data from the database
    * */
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
    /*
    * @param userId
    * @returns list of items where user is the shopper
    * */
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
    /*
    * loading all groups of the current user
    * loading all events of the groups of the user
    *
    * load the specific data of the next event
    * */
    async getCalendarData() {
      let userId = this.$fb.auth().currentUser.uid
      let groups = await getAllGroupsOfUser(userId);
      let events = await getEventsOfGroups(groups);

      if(events.length > 0)
      {
        let nextEventLoaded = false
        for(let event in events)
        {
          // checking which event is the next in the future
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
      // setting the data and the ready flag
      this.events = events;
      this.dataReady = true;
    },
    /**
     * Exchanges the references in the events with actual data for a single event
     * @param event Reference to the event to load the data
     * @returns {Promise<void>}
     */
    async loadEventData(event) {
      // Load all items async. Dont await this because every call goes into the database and takes quite long.
      // Without awaiting the items are filled in dynamically when the page is already usable.
      await this.loadAllItemsOfEvent(event)
      // Load the creator of the event.
      // Has to be awaited, otherwise the html displaying throws an error.
      await this.loadCreatorOfEvent(event)
      // Load the participants of the event.
      // Has to be awaited, otherwise the html displaying throws an error.
      await this.loadAllParticipantsOfEvent(event)
    },
    /**
     * Loads all the participants of an event.
     * @param event Reference to the event to load the participants
     */
    async loadAllParticipantsOfEvent(event) {
      // Create new array in the referenced event
      event.Participants = []
      let groupID = event.Group.id
      // Get the reference to the group from the database
      let groupRef = await this.$firestore.collection("Groups").doc(groupID).get();
      let group = groupRef.data();
      // Push the data of all users of the group into the new array
      for (let userRefs of group.Users) {
        let userRef = await this.getUserRefByUserId(userRefs.id)
        let user = userRef.data()
        event.Participants.push(user)
      }
    },
    /**
     * Replaces the item references in an given event with actual data
     * @param event Reference to the event
     */
    async loadAllItemsOfEvent(event) {
      // Create new variables in the event to load the items into
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
    /**
     * Exchange the reference to the creator with the creator name to be displayed.
     * @param event Reference to the event
     */
    async loadCreatorOfEvent(event) {
      // Check if a creator exists
      if (event.Creator) {
        // Get the reference from the database
        let creatorRef = await this.getUserRefByUserId(event.Creator.id)
        let creator = creatorRef.data()
        // Save the name and profilephoto of the creator or an empty string if no creator exists
        if (creator) {
          event.Creator = creator.fullName
          event.CreatorPhoto = creator.profilePhoto
        } else {
          event.Creator = ""
          event.CreatorPhoto = ""
        }
      }
    },
    /**
     * Loads an item from the database by the item id and returns a new item with the loaded data
     * @param itemID The id of the item to be loaded
     * @returns Promise of the item
     */
    async getItemDataById(itemID) {
      // Load the item reference from the database
      let newItem = await this.getItemByItemId(itemID)
      newItem.Id = itemID
      // Load the creator of the item from the database
      let creatorRef = await this.getUserRefByUserId(newItem.Creator.id)
      newItem.Creator = creatorRef.data()
      // Loads the shopper from the database if any exists
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
    /**
     * Loads and item from the database by item reference
     * @param item The reference to the item
     * @returns Promise of the item
     */
    async getItemData(item) {
      // Load the item from the database
      let newItem = await this.getItemByItemId(item.id)
      newItem.Id = item.id
      // Load the creator from the database
      let creatorRef = await this.getUserRefByUserId(newItem.Creator.id)
      newItem.Creator = creatorRef.data()
      // Loads the shopper from the database if any exists
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
    /**
     * Returns an item by its id
     * @param itemId The id of the item
     * @returns Promise of the item
     */
    async getItemByItemId(itemId) {
      // Load the item reference from the database
      let docRef = this.$firestore.collection("Items").doc(itemId);
      var returnValue
      await docRef.get().then(function (doc) {
        // If the item exists load it to the local variable
        if (doc.exists) {
          returnValue = doc.data()
        }
      }).catch(function (error) {

      });
      return returnValue;
    },
    /**
     * Gets an user by its id
     * @param userId The id of the user
     * @returns Promise of the user
     */
    async getUserRefByUserId(userId) {
      // Loads the reference to the user from the database
      let docRef = this.$firestore.collection("users").doc(userId);
      var returnValue
      await docRef.get().then(function (doc) {
        // If the user exists write the user to the local variable
        if (doc.exists) {
          returnValue = doc
        }
      }).catch(function (error) {});
      return returnValue;
    },
    /*
    * getAgenda is checking all events that have the same date as the param
    * all events that matches this date are stored into an array
    *
    * @param day
    * @returns list of events on specific day
    * */
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
            creator: event.Creator,
            loc: event.Location
          };
          eventsOfDay.push(party);
        }
      }
      return eventsOfDay;
    },
    /*
    * going forwards on the calendar timeline
    * */
    calendarNext() {
      this.$refs.calendar.next()
    },
    /*
    * going backwards on the calendar timeline
    * */
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
    // starts the loading procedures for all data on start
    await this.getDataWithLoading();
  }
}
</script>




