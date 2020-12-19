<template>
  <q-page class="flex-center bg-image" padding>
    <div class="q-pa-md">
      <div class="row">
        <div class="col col-12 offset-0 col-md-8 offset-md-2">
          <div class="row flex-center justify-start">
            <div class="col text-white">
              <h4>Alle Events von dir</h4>
            </div>
            <div class="col" v-if="$q.screen.gt.xs">
              <q-btn color="positive" class="float-right" icon="add" label="Neues Event erstellen" @click="openNewEventPopup"/>
            </div>
            <div class="col" v-else>
              <q-btn color="positive" class="float-right" icon="add" @click="openNewEventPopup"/>
            </div>
          </div>
          <q-dialog v-model="newEventPopup" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Neues Event</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input label="Benenne dein Event" v-model="newEventName" autofocus />
                <q-input label="Wo findet es statt?" v-model="newEventLocation" />
                <q-select label="Für welche Gruppe?" v-model="newEventGroup" :options="groups"/>
                <q-input type="date" v-model="newEventDate" />
                <q-input type="time" v-model="newEventTime" />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn color="negative" flat label="Abbrechen" v-close-popup />
                <q-btn color="positive" flat label="Erstellen" @click="createNewEvent"/>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="newGroupPopup" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Du bist in keiner Gruppe.</div>
                <div>Du musst in einer Gruppe sein um ein Event zu erstellen.
                  Möchtest du jetzt eine neue Gruppe erstellen?</div>
              </q-card-section>
              <q-card-actions align="right" class="text-primary">
                <q-btn color="negative" flat label="Abbrechen" v-close-popup />
                <q-btn color="positive" flat label="Neue Gruppe erstellen" to="/Groups"/>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="newItemPopup" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Neue Zutat</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input label="Welche Zutat?" v-model="newItemName" autofocus />
                <q-input label="Wie viel?" v-model="newItemAmount" />
                <q-toggle label="Bringe ich mit" color="green" v-model="newItemIsShopperUser"/>
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn color="negative" flat label="Abbrechen" v-close-popup />
                <q-btn color="positive" flat label="Hinzufügen" @click="createNewItem"/>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="deleteItemPopup" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Wisst du diese Zutat wirklich löschen?</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <div> Zutat: {{deleteItemName}} </div>
                <div> Menge: {{deleteItemAmount}}</div>
                <div> Hinzugefügt von: {{deleteItemCreator}}</div>
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn color="negative" flat label="Abbrechen" @click="resetDeleteItem" />
                <q-btn color="positive" flat label="Löschen" @click="deleteItem"/>
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-dialog v-model="deleteEventPopup" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Willst du das Event <strong>"{{ deleteEventName }}"</strong> wirklich löschen?</div>
              </q-card-section>
              <q-card-section>
                <div class="text-body1">Das Event wird für alle Mitglieder der Gruppe gelöscht, nicht nur für dich!</div>
              </q-card-section>
              <q-card-actions align="right" class="text-primary">
                <q-btn color="negative" flat label="Abbrechen" @click="deleteEventPopup = false" />
                <q-btn color="positive" flat label="Löschen" @click="deleteEvent()"/>
              </q-card-actions>
            </q-card>
          </q-dialog>

          <div class="row"
               v-for="event in Events">
            <div class="col q-pb-md">
              <q-card class="my-card">
                <q-card-section>
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div class="text-h5">{{ event.Name }}</div>
                      <div class="text-subtitle2 q-pa-sm">erstellt von: {{ event.Creator }}</div>
                    </div>
                    <div class="col-auto">
                      <q-btn color="grey-7" round flat icon="more_vert">
                        <q-menu cover auto-close>
                          <q-list>
                            <q-item clickable>
                              <q-item-section @click="showDeleteEvent(event)">Event löschen</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-btn>
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
                        <q-item-label caption>{{ event.Location }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="dark" name="today"/>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Wann</q-item-label>
                        <q-item-label caption>{{ event.DateTime | dateToString }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
                <q-card-section>
                  <q-expansion-item
                    expand-separator
                    :icon="event.ItemsFinishedIcon"
                    label="Zutaten"
                    :caption="event.ItemsFinished"
                  >
                    <q-card>
                      <q-list>
                        <q-item
                          v-for="item in event.LoadedItems" v-bind:key="item.id">
                          <q-item-section avatar>
                            <q-avatar color="blue-grey-10" size="28px" font-size="24px" round="round" icon="person" text-color="white" v-if="item.Creator.profilePhoto === '' ">
                              <q-tooltip>
                                {{item.Creator.fullName}} hats erstellt
                              </q-tooltip>
                            </q-avatar>
                            <q-avatar size="28px" v-else>
                              <q-tooltip>
                                {{item.Creator.fullName}} hats erstellt
                              </q-tooltip>
                              <img :src="item.Creator.profilePhoto">
                            </q-avatar>
                          </q-item-section>

                          <q-item-section v-if="item.Shopper === ''" avatar>
                            <q-tooltip>
                              Bring mich mit
                            </q-tooltip>
                            <q-btn round size="sm" color="orange" icon="add_task" @click="assignItemToUser(event.id, item.Id)"/>
                          </q-item-section>
                          <q-item-section v-else-if="item.Shopper.id === currentUserId()" avatar>
                            <q-btn round size="sm" color="red" @click="stopShopItem(event.id, item.Id)">
                              <q-avatar size="28px" round="round" icon="person" v-if="item.Shopper.profilePhoto === '' ">
                                <q-tooltip>
                                  Ich brings mit
                                </q-tooltip>
                              </q-avatar>
                              <q-avatar size="28px" v-else>
                                <q-tooltip>
                                  Ich brings mit
                                </q-tooltip>
                                <img :src="item.Shopper.profilePhoto">
                              </q-avatar>
                            </q-btn>
                          </q-item-section>
                          <q-item-section v-else avatar>
                            <q-avatar color="blue-grey-10" size="28px" font-size="28px" round="round" icon="person" text-color="white"  v-if="item.Shopper.profilePhoto === '' ">
                              <q-tooltip>
                                {{item.Shopper.fullName}} bringts mit
                              </q-tooltip>
                            </q-avatar>
                            <q-avatar v-else size="28px">
                              <q-tooltip>
                                {{item.Shopper.fullName}} bringts mit
                              </q-tooltip>
                              <img :src="item.Shopper.profilePhoto">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ item.Name }}</q-item-label>
                            <q-item-label caption>{{ item.Amount }}</q-item-label>
                          </q-item-section>
                          <q-item-section avatar>
                            <q-btn round size="sm" color="red" icon="delete" @click="deleteItemClick(event.id ,item.Id)"/>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-btn color="positive" class="float-right" icon="add" label="Neue Zutat hinzufügen" @click="newItem(event.id)"/>
                        </q-item>
                      </q-list>
                    </q-card>
                  </q-expansion-item>
                </q-card-section>
                <q-card-section>
                  <div class="row">
                    <div class="col col-12 col-md-6 q-pa-sm">
                      <div class="text-h6 q-pa-sm">Teilnehmer:
                        <div class="q-gutter-x-sm row">
                          <div v-for="user in event.Participants" v-bind:key="user.id">
                            <div v-if="user.profilePhoto === '' " class="q-pa-sm">
                              <q-avatar v-if="user.profilePhoto === '' "  color="blue-grey-10" size="28px" font-size="28px" round="round" icon="person" text-color="white">
                                <q-tooltip>
                                  {{user.fullName}}
                                </q-tooltip>
                              </q-avatar>
                            </div>
                            <div v-else >
                              <q-avatar class="q-pa-sm" size="28px" >
                                <q-tooltip>
                                  {{user.fullName}}
                                </q-tooltip>
                                <img :src="user.profilePhoto">
                              </q-avatar>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
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
import { QSpinnerGears } from 'quasar'
import {currentUser} from "src/store/user/getters";
import {mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'PageEvents',
  data () {
    return {
      // Data to fill the Page
      Events: [
      ],
      groups:[
      ],
      // Variable to shop the "New group" popup
      newGroupPopup: false,
      // Variables for the "New event" popup
      newEventPopup: false,
      newEventName: '',
      newEventLocation: '',
      newEventDate:'',
      newEventTime: '',
      newEventGroup:'',
      // Variables for the "New item" popup
      newItemPopup: false,
      newItemName: '',
      newItemAmount: '',
      newItemIsShopperUser: false,
      newItemEventId: '',
      // Variables for the "Delete item" popup
      deleteItemPopup: false,
      deleteItemId: '',
      deleteItemName: '',
      deleteItemAmount: '',
      deleteItemCreator: '',
      // Variables for the "Delete event" popup
      deleteEventPopup: false,
      deleteEventName: '',
      deleteEventId: '',
      // Indicator if all group names are loaded
      allGroupNamesLoaded: false
    }
  },
  filters:{
    /**
     * Filter to display a timestamp in normal date time format
     * @param timestamp
     * @returns {string}
     */
    dateToString(timestamp){
      let timestampInMs = timestamp.seconds * 1000
      return date.formatDate(timestampInMs, "DD.MM.YYYY HH:mm") + " Uhr"
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    meta () {
      return {
        id: this.currentUser.id,
        photoType: this.photoType
      }
    }
  },
  methods:{
    /**
     * Starts displaying a spinner while initial loading.
     * Loads all groups of the current user and all events of the groups.
     * Then starts filling the data of the events async.
     * @returns {Promise<void>}
     */
    async loadData() {
      // Loading and displaying the qspinner
      this.$q.loading.show({
        message:  'Lade deine Events...',
        backgroundColor: 'grey',
        spinner: QSpinnerGears,
        customClass: 'loader'
      })
      try {
        // Get all groups of user
        let allGroupsOfUser = await this.getAllGroupsOfUser(this.currentUserId())
        // Load the names of all groups of the user
        this.loadNameOfGroups(allGroupsOfUser)
        // Await all events of all groups and start filling them with data async.
        this.loadDataOfEvents(await this.getEventsOfGroups(allGroupsOfUser))
      } catch (err) {
        this.$q.notify({
          message: 'Ein Fehler beim laden der Events ist aufgetreten.',
          color: 'negative'
        })
      } finally {
        // Hiding the qspinner
        this.$q.loading.hide()
      }
    },
    /**
     * Get the ID of the current logged in user
     * @returns the id of the current logged in user
     */
    currentUserId() {
      return this.$fb.auth().currentUser.uid
    },
    /**
     * Get all groups of a given user id
     * @param userId The user id
     * @returns Promise of Array of groups
     */
    async getAllGroupsOfUser(userId) {
      let data = [];
      // Get a reference to the desired user from the database
      let userRef = this.$firestore.collection("users").doc(userId);
      // Get the groups of the user reference from the database
      await this.$firestore.collection("Groups").where("Users", "array-contains", userRef).get()
        .then(function(querySnapshot){
          // Push each group into local array
          querySnapshot.forEach(function(doc) {
            data.push(doc);
          });
        }).catch(function(error) {});
      return data;
    },
    /**
     * Loads all names of given groups to be displayed in the new event popup
     * @param groups The groups to load the names from
     */
    async loadNameOfGroups(groups) {
      if(!this.allGroupNamesLoaded){
        for (let group of groups)
        {
          this.groups.push(group.data().Name)
        }
        this.allGroupNamesLoaded = true
      }
    },
    /**
     * Get all events of all groups sorted by the date decending.
     * @param groups The groups to get the events from
     * @returns Promise of events sorted by date
     */
    async getEventsOfGroups(groups) {
      let eventsOfAllGroups = []
      for (let group of groups)
      {
        let eventsOfGroup = [];
        // Get the reference to the group from the database
        let groupRef = this.$firestore.collection("Groups").doc(group.id);
        // Get the events from the group from the database
        await this.$firestore.collection("Events").where("Group", "==", groupRef).get()
          .then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
              eventsOfGroup.push(doc);
            });
          }).catch(function(error) {});
        // Copy events into array of events of all groups
        for (let event of eventsOfGroup){
          let data = event.data()
          // The id has to be copied seperate
          data.id = event.id
          eventsOfAllGroups.push(data)
        }
      }
      // Sort the events by their Date
      return eventsOfAllGroups.sort(function (a, b){return b.DateTime - a.DateTime})
    },
    /**
     * Exchanges the references in the events with actual data for all events given
     * @param eventsToLoad The events to load the data
     */
    async loadDataOfEvents(eventsToLoad) {
      for (let event of eventsToLoad){
        await this.loadEventData(event)
      }
    },
    /**
     * Exchanges the references in the events with actual data for a single event
     * @param event Reference to the event to load the data
     * @returns {Promise<void>}
     */
    async loadEventData(event) {
      // Load all items async. Dont await this because every call goes into the database and takes quite long.
      // Without awaiting the items are filled in dynamically when the page is already usable.
      this.loadAllItemsOfEvent(event)
      // Load the creator of the event.
      // Has to be awaited, otherwise the html displaying throws an error.
      await this.loadCreatorOfEvent(event)
      // Load the participants of the event.
      // Has to be awaited, otherwise the html displaying throws an error.
      await this.loadAllParticipantsOfEvent(event)
      // Push into the page variable to get displayed.
      this.Events.push(event)
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
      for (let userRefs of group.Users){
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
      event.ItemsFinishedIcon = ""
      for (let itemIndex in event.Items)
      {
        try {
          // Load the data of the item and push the item containing the data into the loadedItems array
          event.LoadedItems.push(await this.getItemData(event.Items[itemIndex]))
        }catch (error){}
      }
      // Check the status of the items
      this.evaluateItemStatusOfEvent(event)
    },
    /**
     * Exchange the reference to the creator with the creator name to be displayed.
     * @param event Reference to the event
     */
    async loadCreatorOfEvent(event) {
      // Check if a creator exists
      if (event.Creator){
        // Get the reference from the database
        let creatorRef = await this.getUserRefByUserId(event.Creator.id)
        let creator = creatorRef.data()
        // Save the name of the creator or an empty string if no creator exists
        if(creator){
          event.Creator = creator.fullName
        }else{
          event.Creator = ""
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
      try{
        let shopperRef = await this.getUserRefByUserId(newItem.Shopper.id)
        shopper = shopperRef.data()
      }catch (error){
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
      try{
        let shopperRef = await this.getUserRefByUserId(newItem.Shopper.id)
        shopper = shopperRef.data()
      }catch (error){
        shopper = ""
      }
      newItem.Shopper = shopper
      return newItem
    },
    /**
     * Return all the users that are part of a group
     * @param groupId The id of the group
     * @returns Promise of array of users
     */
    async getAllUsersOfGroup(groupId) {
      let data = [];
      // Load the group from the database
      await this.$firestore.collection("Groups").doc(groupId).get().then(function(doc){
        if (doc.exists){
          // Push every user of the group into an array
          data.push(doc.data().Users);
        };});
      return data;
    },
    /**
     * Returns an group reference by a given name
     * @param groupName The name of the group to load
     * @returns Promise of the group reference
     */
    async getGroupByName(groupName) {
      let data = [];
      // Load the group from the database
      await this.$firestore.collection("Groups").where("Name", "==", groupName).get()
        .then(function(querySnapshot){
          querySnapshot.forEach(function(doc) {
            data.push(doc);
          });
        }).catch(function(error) {});
      return data;
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
      await docRef.get().then(function(doc) {
        // If the item exists load it to the local variable
        if (doc.exists) {
          returnValue = doc.data()
        }
      }).catch(function(error) {});
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
      await docRef.get().then(function(doc) {
        // If the user exists write the user to the local variable
        if (doc.exists) {
          returnValue = doc
        }
      }).catch(function(error) {});
      return returnValue;
    },
    /**
     * Checks if the user is in any group.
     * If he is the "new Event" popup is displayed
     * Otherwise the "new Group" popup is displayed
     */
    openNewEventPopup(){
      if (this.groups.length > 0){
        this.newEventPopup = true
      }else {
        this.newGroupPopup = true
      }
    },
    /**
     * Checks if the popup is filled in correctly and creates a new event in the database
     */
    async createNewEvent() {

       try {
         // Checks if the input field are filled
         if(this.newEventName == ""){ throw "Empty event name"};
         if(this.newEventLocation == ""){ throw "Empty location"};
         // Load the event time in the correct format
        let dateTime = new Date(this.newEventDate + "T" + this.newEventTime);
        // Load the user id of the current user
        let userID = this.$fb.auth().currentUser.uid;
        if(userID == ""){ throw "Empty User ID"}
        // Load the reference to the user from the database
        let userRef = this.$firestore.collection("users").doc(userID);
        // Loads the reference to the group.
        let groups = await this.getGroupByName(this.newEventGroup);
        let groupId = groups[0].id;
        let groupRef = this.$firestore.collection("Groups").doc(groupId);
        // Creates the new event in the database
        let newEvRef = await this.$firestore.collection("Events").add({
          Name: this.newEventName,
          Location: this.newEventLocation,
          DateTime: dateTime,
          Creator: userRef,
          Group: groupRef
        })
         // Clear all events and reload page
        this.Events = []
        await this.loadData();
      }catch (error){
         this.$q.notify({
           message: `Bitte fülle alle Felder aus.`,
           color: 'negative'
         })
        return;
      }
      this.$q.notify({
        message: "Das Event wurde erfolgreich erstellt.",
        color: 'positive'
      })
      // Clear the variables and hide the popup
      this.newEventPopup = false;
      this.newEventGroup = ''
      this.newEventDate = ''
      this.newEventTime = ''
      this.newEventLocation = ''
      this.newEventName = ''
    },
    /**
     * Saves the id of the event in which the event should be created and opens the "new event" popup
     * @param id The id of the event to create the item in
     */
    newItem(id) {
      this.newItemPopup = true;
      this.newItemEventId = id;
    },
    /**
     * Adds an item to an already loaded event without reloading the complete event.
     * @param eventID The id of the event
     * @param newItemId The id of the item to add
     */
    async addItemToEvent(eventID, newItemId) {
      // Get the event
      let event = this.Events.find(event => event.id === eventID)
      // Load the item data and push it into the loaded items of the event to be displayed
      event.LoadedItems.push(await this.getItemDataById(newItemId))
      // Reevaluate the status of the items
      this.evaluateItemStatusOfEvent(event)
    },
    /**
     * Checks if the popup is filled and creates a new item in the database
     */
    async createNewItem() {
        try {
          // Load the name and amount of the new item and check if they are not empty
          let itemName = this.newItemName;
          let itemAmount = this.newItemAmount;
          let itemEventId = this.newItemEventId;
          let itemShopperIsUser = this.newItemIsShopperUser;
          if(itemName === ""){ throw "Error: Empty item name"};
          if(itemAmount === ""){ throw "Error: Empty item amount"};
          // Load the reference to the current user
          let activeUserReference = this.$firestore.collection("users").doc(this.$fb.auth().currentUser.uid);
          // Set the current use as shopper if checkbox is checked
          let itemShopper;
          if (itemShopperIsUser){
            itemShopper = activeUserReference;
          }else{
            itemShopper = "";
          }
          let newItemReference = "";
          let newItemId
          // Create the item in the database
          await this.$firestore.collection("Items").add({
            Name: itemName,
            Amount: itemAmount,
            Creator: activeUserReference,
            Shopper: itemShopper
          }).then(function(docRef){
            // Save the id and reference in local variables
            newItemReference = docRef;
            newItemId = docRef.id
          });
          // Load the reference to the event
          let eventReference = this.$firestore.collection("Events").doc(itemEventId);
          // Input the new item as a reference to the event items
          eventReference.update({
            Items: firebase.firestore.FieldValue.arrayUnion(newItemReference)
          }).catch(function(error){})
          // Add the item to the viewed event without reloading from the database
          this.addItemToEvent(itemEventId, newItemId)
        }catch (error){
          this.$q.notify({
            message: `Bitte fülle alle Felder aus.`,
            color: 'negative'
          })
          return;
        }
      // Clear the variables and hide the popup
      this.newItemName = '';
      this.newItemAmount = '';
      this.newItemEventId = '';
      this.newItemIsShopperUser = false;
      this.newItemPopup = false;
    },
    /**
     * Opens the popup to delete an item
     * @param eventId The it of the event to delete the item from
     * @param itemId the id of the item to delete
     */
    async deleteItemClick(eventId, itemId) {
      // Loads the data of the item from the database
      let item = await this.getItemDataById(itemId)
      // Fill in variables and shop popup
      this.deleteItemId = item.Id
      this.deleteItemEventId = eventId
      this.deleteItemName = item.Name
      this.deleteItemAmount = item.Amount
      this.deleteItemCreator = item.Creator.fullName
      this.deleteItemPopup = true
    },
    /**
     * Deletes an item from the database
     * @returns {Promise<void>}
     */
    async deleteItem() {
      // Loads the reference to the event from which the item should be deleted
      let eventData = await this.$firestore.collection("Events").doc(this.deleteItemEventId).get();
      if(eventData.exists){
        eventData = eventData.data()
      }
      // Remove the reference to the item from the event
      eventData.Users = this.removeFromArray(this.deleteItemId, eventData.Items)
      // Updates the event with the removed item in the database
      await this.$firestore.collection("Events").doc(this.deleteItemEventId).update({
        Items: eventData.Items
      }).catch(function(error) {});
      // Get the loaded items of the event
      let eventItems = this.Events.find(event => event.id === this.deleteItemEventId).LoadedItems
      // Delete the item from the loaded items, so that it is no longer displayed
      for (let index = 0; index < eventItems.length; index++)
      {
        if (eventItems[index].id !== this.deleteItemId){
          eventItems.splice(index, 1)
          break
        }
      }
      // Update the event to save the changes
      let event = this.Events.find(event => event.id === this.deleteItemEventId)
      event.Items = eventItems
      // Close the popup and reevaluate the item status
      this.resetDeleteItem()
      this.evaluateItemStatusOfEvent(event)
    },
    /**
     * Clears the variables and closes the "delete item" popup
     */
    resetDeleteItem() {
      this.deleteItemId = ''
      this.deleteItemEventId = ''
      this.deleteItemName = ''
      this.deleteItemAmount = ''
      this.deleteItemCreator = ''
      this.deleteItemPopup = false
    },
    /**
     * Removes an element with an given id from an array
     * @param id The element id to remove from the array
     * @param array The reference to the array
     * @returns The modified array
     */
    removeFromArray(id, array){
      for(let index in array)
      {
        if(array[index].id === id)
        {
          array.splice(index, 1)
        }
      }
      return array
    },
    /**
     * Assign an item to an user so that he is displayed as the shopper
     * @param eventId The id of the event
     * @param itemId The id of the item
     */
    async assignItemToUser(eventId, itemId) {
      // Get the reference of the current user
      let currentUserRef = this.$firestore.collection("users").doc(this.currentUserId());
      // Set the current user as shopper from the item in the database
      let itemRef = this.$firestore.collection("Items").doc(itemId).update({
        Shopper: currentUserRef
      }).catch(function(error) {});
      // Set the current user as shopper of the loaded item so no reload of the database is needed
      let event = this.Events.find(event => event.id === eventId)
      let item = event.LoadedItems.find(item => item.Id === itemId)
      let shopperRef = await this.getUserRefByUserId(this.currentUserId())
      item.Shopper = shopperRef.data()
      // Reevaluate the item status
      this.evaluateItemStatusOfEvent(event)
    },
    /**
     * Remove the current user from the shopper of an item
     * @param eventId The id of the event
     * @param itemId The id of the item
     */
    stopShopItem(eventId, itemId) {
      // Delete the shopper of the item in the database
      let itemRef = this.$firestore.collection("Items").doc(itemId).update({
        Shopper: firebase.firestore.FieldValue.delete()
      }).catch(function(error) {});
      // Remove the user from the shopper of the loaded item, so no database reload is needed
      let event = this.Events.find(event => event.id === eventId)
      let item = event.LoadedItems.find(item => item.Id === itemId)
      item.Shopper = ''
      // Reevaluate the status of the items
      this.evaluateItemStatusOfEvent(event)
    },
    /**
     * Evaluates the status of the items to display if all items have a shopper, some items are missing a shopper or there are no item.
     * @param event The event to check
     */
    async evaluateItemStatusOfEvent(event) {
      let itemsFinished = true;
      // Check for every item of the event if it has a shopper
      for(let item of event.LoadedItems) {
        if (item.Shopper === "") {
          itemsFinished = false
          break
        }
      }
      if (event.LoadedItems.length === 0){
        // No items are listed
        event.ItemsFinished = "Es wurden noch keine Zutaten eingetragen"
        event.ItemsFinishedIcon = "playlist_add"
      }
      else if (itemsFinished)
      {
        // Every item has a shopper
        event.ItemsFinished = "Alles wird mitgebracht."
        event.ItemsFinishedIcon = "playlist_add_check"
      }else {
        // Not every item has a shopper
        event.ItemsFinished = "Noch nicht alle Zutaten werden mitgebracht!"
        event.ItemsFinishedIcon = "rule"
      }
    },
    /**
     * Open the "delete event" popup
     * @param event The event to delete
     */
    showDeleteEvent(event){
      // Load the name and id of the event
      this.deleteEventName = event.Name
      this.deleteEventId = event.id
      // Display the popup
      this.deleteEventPopup = true
    },
    /**
     * Deletes an event
     */
    async deleteEvent(){
      // Load the reference to the event from the database
      let eventRef = await this.$firestore.collection("Events").doc(this.deleteEventId).get()
      let eventData = await eventRef.data()
      if(eventData.Items){
        // Delete all items that the event referenced to
        for(let item of eventData.Items){
          this.$firestore.collection("Items").doc(item.id).delete().catch(function(error){})
        }
      }
      // Deletes the event from the database
      this.$firestore.collection("Events").doc(this.deleteEventId).delete().catch(function(error){})
      // Deletes the event from the loaded events to no longer display it
      for(let eventIndex in this.Events){
        if(this.Events[eventIndex].id == this.deleteEventId){
          this.Events.splice(eventIndex, 1);
          break;
        }
      }
      this.$q.notify({
        message: "Das Event wurde gelöscht.",
        color: 'positive'
      })
      // Hides popup and clears variables
      this.deleteEventPopup = false
      this.deleteEventName = ""
      this.deleteEventId = ""
    }
  },
  /**
   * Executed on the page start and loads all needed data
   */
  created() {
    this.loadData();
  }
}
</script>
