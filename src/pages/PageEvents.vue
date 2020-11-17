<template>
  <q-page class="flex-center bg-negative" padding>
    <div class="q-pa-md">
      <div class="row">
        <div class="col col-12 offset-0 col-md-8 offset-md-2">
          <div class="row flex-center justify-start">
            <div class="col text-white">
              <h4>Kommende Events</h4>
            </div>
            <div class="col">
              <q-btn color="positive" class="float-right" icon="add" label="Neues Event erstellen" @click="newEventPopup = true"/>
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
                              <q-item-section>Event verlassen</q-item-section>
                            </q-item>
                            <q-item clickable>
                              <q-item-section>Freund einladen</q-item-section>
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
                    icon="list"
                    label="Zutaten"
                    :caption="event.ItemsFinished"
                  >
                    <q-card>
                      <q-list>
                        <q-item
                          v-for="item in event.LoadedItems">
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
                        <div class="q-gutter-x-sm">
                          <q-avatar class="q-pa-sm" size="28px"
                                    v-for="user in event.Participants">
                            <img :src="user.profilePhoto">
                          </q-avatar>
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

export default {
  name: 'PageEvents',
  data () {
    return {
      Events: [
      ],
      groups:[
      ],
      newEventPopup: false,
      newEventName: '',
      newEventLocation: '',
      newEventDate:'',
      newEventTime: '',
      newEventGroup:'',
      newItemPopup: false,
      newItemName: '',
      newItemAmount: '',
      newItemIsShopperUser: false,
      newItemEventId: '',
    }
  },
  filters:{
    dateToString(timestamp){
      let timestampInMs = timestamp.seconds * 1000
      return date.formatDate(timestampInMs, "DD.MM.YYYY HH:mm") + " Uhr"
    }
  },
  methods:{
    async loadData() {
      let allGroupsOfUser = await this.getAllGroupsOfUser(this.currentUserId())
      this.loadNameOfGroups(allGroupsOfUser)
      this.loadDataOfEvents(await this.getEventsOfGroups(allGroupsOfUser))
    },

    currentUserId() {
      return this.$fb.auth().currentUser.uid
    },

    async getAllGroupsOfUser(userId) {
      let data = [];
      let userRef = this.$firestore.collection("users").doc(userId);
      await this.$firestore.collection("Groups").where("Users", "array-contains", userRef).get()
        .then(function(querySnapshot){
          querySnapshot.forEach(function(doc) {
            data.push(doc);
          });
        });
      return data;
    },

    async loadNameOfGroups(groups) {
      for (let group of groups)
      {
        this.groups.push(group.data().Name)
      }
    },

    async getEventsOfGroups(groups) {
      let allEvents = []
      for (let group of groups)
      {
        let events = [];
        let groupRef = this.$firestore.collection("Groups").doc(group.id);
        await this.$firestore.collection("Events").where("Group", "==", groupRef).get()
          .then(function(querySnapshot){
            querySnapshot.forEach(function(doc) {
              events.push(doc);
            });
          });
        for (let event of events){
          let data = event.data()
          data.id = event.id
          allEvents.push(data)
        }
      }
      return allEvents.sort(function (a, b){return a.DateTime - b.DateTime})
    },

    async loadDataOfEvents(eventsToLoad) {
      for (let event of eventsToLoad){
        await this.loadEventData(event)
      }
    },

    async loadEventData(event) {
      this.loadAllItemsOfEvent(event)
      await this.loadCreatorOfEvent(event)
      await this.loadAllParticipantsOfEvent(event)
      this.Events.push(event)
    },

    async loadAllParticipantsOfEvent(event) {
      event.Participants = []
      let groupID = event.Group.id
      let groupRef = await this.$firestore.collection("Groups").doc(groupID).get();
      let group = groupRef.data();
      for (let userRefs of group.Users){
        let userRef = await this.getUserRefByUserId(userRefs.id)
        let user = userRef.data()
        event.Participants.push(user)
      }
    },

    async loadAllItemsOfEvent(event) {
      event.LoadedItems = []
      event.ItemsFinished = ""
      let itemsFinised = true
      for (let itemIndex in event.Items)
      {
        try {
          let item = await this.getItemData(event.Items[itemIndex])
          if (item.Shopper === "") {
            itemsFinised = false
          }
          event.LoadedItems.push(await this.getItemData(event.Items[itemIndex]))
        }catch (error){
          console.warn("Could not load item " + event.Items[itemIndex].id + "! \n " +
            "Maybe item got deleted but reference in the event is still pointing on it")
        }
      }
      if (itemsFinised)
      {
        event.ItemsFinished = "Alles wird mitgebracht."
      }else {
        event.ItemsFinished = "Noch nicht alle Zutaten werden mitgebracht!"
      }
    },

    async loadCreatorOfEvent(event) {
      if (event.Creator){
        let creatorRef = await this.getUserRefByUserId(event.Creator.id)
        let creator = creatorRef.data()
        if(creator){
          event.Creator = creator.fullName
        }else{
          event.Creator = ""
        }
      }
    },

    async getItemDataById(itemID) {
      let newItem = await this.getItemByItemId(itemID)
      let creatorRef = await this.getUserRefByUserId(newItem.Creator.id)
      newItem.Creator = creatorRef.data()
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

    async getItemData(item) {
      let newItem = await this.getItemByItemId(item.id)
      let creatorRef = await this.getUserRefByUserId(newItem.Creator.id)
      newItem.Creator = creatorRef.data()
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

    async getAllUsersOfGroup(groupId) {
      let data = [];
      await this.$firestore.collection("Groups").doc(groupId).get().then(function(doc){
        if (doc.exists){
          // doc.data() is never undefined for query doc snapshots
          //console.log("Doc: ", doc.data().Users);
          data.push(doc.data().Users);
        };});
      return data;
    },

    async getGroupByName(groupName) {
      let data = [];
      await this.$firestore.collection("Groups").where("Name", "==", groupName).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log("Doc: ", doc, " Doc.id(): ", doc.id, " Doc.data(): ", doc.data());
          data.push(doc);
        });});
      return data;
    },

    async getItemByItemId(itemId) {
      let docRef = this.$firestore.collection("Items").doc(itemId);
      var returnValue
      await docRef.get().then(function(doc) {
        if (doc.exists) {
          returnValue = doc.data()
        }
      }).catch(function(error) {
        console.log("Error getting item:", error);
      });
      return returnValue;
    },

    async getUserRefByUserId(userId) {
      let docRef = this.$firestore.collection("users").doc(userId);
      var returnValue
      await docRef.get().then(function(doc) {
        if (doc.exists) {
          returnValue = doc
        }
      }).catch(function(error) {
        console.log("Error getting user:", error);
      });
      return returnValue;
    },

    async createNewEvent() {
       try {
        let dateTime = new Date(this.newEventDate + "T" + this.newEventTime);
        let userID = this.$fb.auth().currentUser.uid;
        if(userID == ""){ throw "Empty User ID"}
        let userRef = this.$firestore.collection("users").doc(userID);
        let groups = await this.getGroupByName(this.newEventGroup);
        let groupId = groups[0].id;
        let groupRef = this.$firestore.collection("Groups").doc(groupId);
        if(this.newEventName == ""){ throw "Empty event name"};
        if(this.newEventLocation == ""){ throw "Empty location"};
        this.$firestore.collection("Events").add({
          Name: this.newEventName,
          Location: this.newEventLocation,
          DateTime: dateTime,
          Creator: userRef,
          Group: groupRef
        })
      }catch (error){
        console.log(error);
        alert("Bitte fülle alle Felder aus.")
        return;
      }
      // Close popup if event created successfully
      this.newEventPopup = false;
      this.newEventGroup = ''
      this.newEventDate = ''
      this.newEventTime = ''
      this.newEventLocation = ''
      this.newEventName = ''
    },

    newItem(id) {
      this.newItemPopup = true;
      this.newItemEventId = id;
    },

    async refreshItemsOfEvent(eventID, newItemId) {
      let event = this.Events.find(event => event.id === eventID)
      event.LoadedItems.push(await this.getItemDataById(newItemId))
    },

    async createNewItem() {
        try {
          let itemName = this.newItemName;
          let itemAmount = this.newItemAmount;
          if(itemName === ""){ throw "Error: Empty item name"};
          if(itemAmount === ""){ throw "Error: Empty item amount"};
          let activeUserReference = this.$firestore.collection("users").doc(this.$fb.auth().currentUser.uid);
          let itemEventId = this.newItemEventId;
          let itemShopperIsUser = this.newItemIsShopperUser;
          let itemShopper;
          if (itemShopperIsUser){
            itemShopper = activeUserReference;
          }else{
            itemShopper = "";
          }

          let newItemReference = "";
          let newItemId
          await this.$firestore.collection("Items").add({
            Name: itemName,
            Amount: itemAmount,
            Creator: activeUserReference,
            Shopper: itemShopper
          }).then(function(docRef){
            //console.log("Document written with ID: ", docRef.id);
            newItemReference = docRef;
            newItemId = docRef.id
          });

          let eventReference = this.$firestore.collection("Events").doc(itemEventId);

          eventReference.update({
            Items: firebase.firestore.FieldValue.arrayUnion(newItemReference)
          })
          this.refreshItemsOfEvent(itemEventId, newItemId)
        }catch (error){
          console.log(error);
          alert("Bitte fülle alle Felder aus.");
          return;
        }
      this.newItemName = '';
      this.newItemAmount = '';
      this.newItemEventId = '';
      this.newItemIsShopperUser = false;
    }
  },
  created() {
    this.loadData();
  }
}
</script>
