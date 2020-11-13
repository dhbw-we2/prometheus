<template>
  <q-page class="flex-center bg-negative " padding>
    <div class="q-pa-md">
      <div class="row">
        <div class="col col-12 offset-0 col-md-8 offset-md-2">
          <div class="row flex-center justify-start">
            <div class="col text-white">
              <h4>Meine Gruppen</h4>
            </div>
            <div class="col">
              <q-btn color="positive" class="float-right" icon="add" label="Neue Gruppe erstellen" @click="prompt = true"/>
              <q-dialog v-model="prompt" persistent>
                <q-card style="min-width: 350px">
                  <q-card-section>
                    <div class="text-h6">Neue Gruppe erstellen</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-input label="Gib deiner Gruppe einen Namen" v-model="newGroupName" autofocus  />
                  </q-card-section>

                  <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Abbrechen" v-close-popup />
                    <q-btn flat color="positive" label="Erstellen" @click="createNewGroup" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </div>
          <div class="row"
               v-for="group in groups"
               :key="group.id">
            <div class="col">
              <q-card class="my-card">
                <q-card-section>
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div class="text-h5">{{ group.Name }}</div>
                    </div>
                    <div class="col-auto">
                      <q-btn color="grey-7" round flat icon="more_vert">
                        <q-menu cover auto-close>
                          <q-list>
                            <q-item clickable>
                              <q-item-section>Gruppe verlassen</q-item-section>
                            </q-item>
                            <q-item v-if="isAdminUser(group.Admins)" clickable>
                              <q-item-section>Freund hinzufügen</q-item-section>
                            </q-item>
                          </q-list>
                        </q-menu>
                      </q-btn>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="row">
                    <div class="col col-12 col-md-6 q-pa-sm">
                      <div class="text-h6 q-pa-sm">Teilnehmer:</div>
                      <q-list bordered separator>
                        <q-item clickable v-ripple
                        v-for="user in group.Users">
                          <q-item-section avatar>
                            <q-avatar>
                              <img :src="user.profilePhoto">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{user.fullName}}</q-item-label>
                            <q-item-label v-if="isAdminUser(group.Admins, user.id)" caption lines="1">Admin</q-item-label>
                            <q-menu v-if="isAdminUser(group.Admins)" touch-position>
                              <q-list>
                                <q-item v-if="!isAdminUser(group.Admins, user.id)" clickable v-close-popup>
                                  <q-item-section @click="addToAdminList(group, user.id)">Zu Admin befördern</q-item-section>
                                </q-item>
                                <q-item v-if="!isLoggedInUser(user.id) && isAdminUser(group.Admins, user.id)" clickable v-close-popup>
                                  <q-item-section @click="removeFromAdminList(group, user.id)">Admin-Rolle entfernen</q-item-section>
                                </q-item>
                                <q-item v-if="!isLoggedInUser(user.id)" clickable v-close-popup>
                                  <q-item-section color="primary">Aus der Gruppe entfernen</q-item-section>
                                </q-item>
                              </q-list>
                            </q-menu>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                    <div class="col col-12 col-md-6 q-pa-sm">
                      <div class="text-h6 q-pa-sm">Events:</div>
                      <q-list bordered separator>
                        <q-item clickable v-ripple
                        v-for="event in group.events">
                          <q-item-section>
                            <q-item-label>{{ event.Name }}</q-item-label>
                            <q-item-label caption>{{ event.DateTime | dateToString }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import { mapActions } from 'vuex'
import { QSpinnerGears } from 'quasar'
export default {
  name: 'PageGroups',
  data () {
    return {
      groups: [
      ],
      prompt: false,
      newGroupName: ""
    }
  },
  filters:{
    dateToString(timestamp){
      let timestampInMs = timestamp.seconds * 1000
      return date.formatDate(timestampInMs, "DD.MM.YYYY HH:mm") + " Uhr"
    }
  },
  methods:{
    async getGroupsData() {
      // get user and his groups
      let userId = this.$fb.auth().currentUser.uid;
      let allGroupRefs = await this.getGroupsOfUser(userId);

      // get all data related to the group
      let viewData = []
      for (let groupRef of allGroupRefs)
      {
        // get group-data
        let group = groupRef.data()
        group.id = groupRef.id
        //get event-data
        let events = await this.getAllEventsOfGroup(groupRef.id)
        group.events = []
        for (let event of events){
          group.events.push(event.data())
        }

        //get user-data
        let usersData = []
        for (let userRef of group.Users){
          let user = await this.getUserByUserId(userRef.id)
          usersData.push(user)
        }
        group.Users = usersData

        //get admins-data
        let adminData = []
        for (let adminRef of group.Admins){
          let admin = await this.getUserByUserId(adminRef.id)
          adminData.push(admin)
        }
        group.Admins = adminData

        viewData.push(group)
      }

      this.groups = viewData
    },
    async getGroupsOfUser(userId) {
      let data = [];
      let userRef = this.$firestore.collection("users").doc(userId);
      await this.$firestore.collection("Groups").where("Users", "array-contains", userRef).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data.push(doc);
        });
      });
      return data;
    },
    async getAllEventsOfGroup(groupId){
      let data = [];
      let groupRef = this.$firestore.collection("Groups").doc(groupId);
      await this.$firestore.collection("Events").where("Group", "==", groupRef).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
          data.push(doc);
        });});
      return data;
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
    async createNewGroup(){
      let userID = this.$fb.auth().currentUser.uid;
      let userRef = this.$firestore.collection("users").doc(userID);
      let timeCreated = Date.now()

      try {
        if(this.newGroupName == "") { throw "Bitte Gruppenname vergeben"}
        this.$firestore.collection("Groups").add({
          Name: this.newGroupName,
          Created: timeCreated,
          Creator: userRef,
          Users: [userRef],
          Admins: [userRef]
        })
      }catch (error){
        console.log(error);
        alert("Bitte fülle alle Felder aus");
        return;
      }
      // Close popup if event created successfully
      this.prompt = false;
      await this.getGroupsData()
    },
    isAdminUser(adminList, userId){
      // if no userId has been provided, use the logged in user
      if(!userId){
        userId = this.$fb.auth().currentUser.uid;
      }

      for(let admin of adminList){
        if(admin.id == userId) return true
      }
      return false
    },
    async addToAdminList(group, userId) {
      let groupData = await this.$firestore.collection("Groups").doc(group.id).get()
      if(groupData.exists){
        groupData = groupData.data()
      }
      let userRef = await this.$firestore.collection("users").doc(userId)
      groupData.Admins.push(userRef)
      await this.$firestore.collection('Groups').doc(group.id).update({
        Admins: groupData.Admins
      }).then(function () {
        console.log("Updated succesfully")
      })
      await this.getGroupsData()
    },
    async removeFromAdminList(group, userId)
    {
      let userRef = await this.getUserByUserId(userId)
      let groupData = await this.$firestore.collection("Groups").doc(group.id).get()
      if(groupData.exists){
        groupData = groupData.data()
      }
      for(let userIndex in groupData.Admins)
      {
        if(groupData.Admins[userIndex].id == userRef.id)
        {
          groupData.Admins.splice(userIndex, 1)
        }
      }
      await this.$firestore.collection('Groups').doc(group.id).update({
        Admins: groupData.Admins
      }).then(function () {
        console.log("Updated succesfully")
      })
      await this.getGroupsData()
    },
    isLoggedInUser(userId){
      return userId == this.$fb.auth().currentUser.uid
    }
  },
  async created() {
    await this.getGroupsData();
  }
}
</script>
