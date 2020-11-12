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
              <q-btn color="positive" class="float-right" icon="add" label="Neues Event erstellen" @click="prompt = true"/>

              <q-dialog v-model="prompt" persistent>
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

            </div>
          </div>
          <div class="row"
               v-for="event in events">
            <div class="col">
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
                    caption="noch nicht vollständig"
                  >
                    <q-card>
                      <q-list>
                        <q-item
                          v-for="item in event.Items">
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
            <br>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {date} from "quasar";

export default {
  name: 'PageEvents',
  data () {
    return {
      events: [
      ],
      groups:[
      ],
      prompt: false,
      newEventName: '',
      newEventLocation: '',
      newEventDate:'',
      newEventTime: '',
      newEventGroup:''
    }
  },
  filters:{
    dateToString(timestamp){
      let timestampInMs = timestamp.seconds * 1000
      return date.formatDate(timestampInMs, "DD.MM.YYYY HH:mm") + " Uhr"
    }
  },
  methods:{
    async getGroupsData()
    {
      // Get User and his groups
      let userId = this.$fb.auth().currentUser.uid;
      let allGroups = await this.getAllGroupsOfUser(userId);

      // Get all events of all groups of the user
      let allEvents = []
      for (let group of allGroups)
      {
        let events = await this.getAllEventsOfGroup(group.id)
        for (let event of events){
          allEvents.push(event.data());
        }
      }

      // Replace references with data
      for (let event of allEvents)
      {
        // Replace item references
        let items = event.Items
        for (let itemIndex in items)
        {
          items[itemIndex]         = await this.getItemByItemId(items[itemIndex].id)
          items[itemIndex].Creator = await this.getUserByUserId(items[itemIndex].Creator.id)
          items[itemIndex].Shopper = await this.getUserByUserId(items[itemIndex].Shopper.id)
        }
        // Replace creator reference with name
        if (event.Creator){
          let creator = await this.getUserByUserId(event.Creator.id)
          if(creator){
            event.Creator = creator.fullName
          }else{
            event.Creator = ""
          }
        }
        // Add all participant to the events
        // let users = await this.getAllUsersOfGroup(event.Group.id)
        // console.log(users)
        // for(let userRef of users)
        // {
        //   let user = await this.getUserByUserId(userRef.data().id)
        //   console.log(user)
        // }
        event.Participants = []
        let groupID = event.Group.id
        let groupRef = await this.$firestore.collection("Groups").doc(groupID).get();
        let group = groupRef.data();
        for (let userRef of group.Users){
          let user = await this.getUserByUserId(userRef.id)
          event.Participants.push(user)
        }
      }



      // Add all group names to the drop down list
      for (let group of allGroups)
      {
        this.groups.push(group.data().Name)
      }

      this.events = allEvents
    },

    async getAllGroupsOfUser(userId){
      let data = [];
      let userRef = this.$firestore.collection("users").doc(userId);
      await this.$firestore.collection("Groups").where("Users", "array-contains", userRef).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log("Doc: ", doc, " Doc.id(): ", doc.id, " Doc.data(): ", doc.data());
          data.push(doc);
        });});
      return data;
    },

    async getAllUsersOfGroup(groupId){
      let data = [];
      await this.$firestore.collection("Groups").doc(groupId).get().then(function(doc){
        if (doc.exists){
          // doc.data() is never undefined for query doc snapshots
          //console.log("Doc: ", doc.data().Users);
          data.push(doc.data().Users);
        };});
      return data;
    },

    async getAllEventsOfGroup(groupId){
      let data = [];
      let groupRef = this.$firestore.collection("Groups").doc(groupId);
      await this.$firestore.collection("Events").where("Group", "==", groupRef).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log("Doc: ", doc, " Doc.id(): ", doc.id, " Doc.data(): ", doc.data());
          data.push(doc);
        });});
      return data;
    },

    async getGroupByName(groupName){
      let data = [];
      await this.$firestore.collection("Groups").where("Name", "==", groupName).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          //console.log("Doc: ", doc, " Doc.id(): ", doc.id, " Doc.data(): ", doc.data());
          data.push(doc);
        });});
      return data;
    },

    async getItemByItemId(itemId){
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

    async getUserByUserId(userId){
      let docRef = this.$firestore.collection("users").doc(userId);
      var returnValue
      await docRef.get().then(function(doc) {
        if (doc.exists) {
          returnValue = doc.data()
        }
      }).catch(function(error) {
        console.log("Error getting user:", error);
      });
      return returnValue;
    },

    async createNewEvent(){
       try {
        let dateTime = new Date(this.newEventDate + "T" + this.newEventTime);
        let userID = this.$fb.auth().currentUser.uid;
        if(userID == ""){ throw "Empty User ID"}
        let userRef = this.$firestore.collection("users").doc(userID);
        let groups = await this.getGroupByName(this.newEventGroup);
        let groupId = groups[0].id;
        let groupRef = this.$firestore.collection("Groups").doc(groupId);
        if(this.newEventName == ""){ throw "Empty Event Name"};
        if(this.newEventLocation == ""){ throw "Empty Location"};
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
      this.prompt = false;
      this.newEventGroup = ''
      this.newEventDate = ''
      this.newEventTime = ''
      this.newEventLocation = ''
      this.newEventName = ''
    }
  },
  async created() {
    await this.getGroupsData();
  }
}
</script>
