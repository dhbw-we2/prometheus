<template>
  <q-page class="flex-center bg-image" padding>
    <div class="q-pa-md">
      <div class="row">
        <div class="col col-12 offset-0 col-md-8 offset-md-2">
          <div class="row flex-center justify-start">
            <div class="col text-white">
              <h4>Meine Gruppen</h4>
            </div>
            <div class="col" v-if="$q.screen.gt.xs">
              <q-btn color="positive" class="float-right" icon="add" label="Neue Gruppe erstellen" @click="newGroupPrompt = true"/>
            </div>
            <div class="col" v-else>
              <q-btn color="positive" class="float-right" icon="add" @click="newGroupPrompt = true"/>
            </div>
            <q-dialog v-model="newGroupPrompt" persistent>
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
                        <q-menu cover>
                          <q-list>
                            <q-item clickable>
                              <q-item-section @click="leaveGroupPopup = true">Gruppe verlassen</q-item-section>
                              <q-dialog v-model="leaveGroupPopup" persistent>
                                <q-card style="min-width: 350px">
                                  <q-card-section>
                                    <div class="text-h6">Willst du die Gruppe <strong>"{{ group.Name }}"</strong> wirklich verlassen?</div>
                                  </q-card-section>
                                  <q-card-section>
                                    <div class="text-body1">Falls du die Gruppe verlässt, verlierst du auch den Zugriff auf alle Events der Gruppe.</div>
                                  </q-card-section>
                                  <q-card-actions align="right" class="text-primary">
                                    <q-btn color="negative" flat label="Abbrechen" @click="leaveGroupPopup = false" />
                                    <q-btn color="positive" flat label="Verlassen" @click="leaveGroup(group); leaveGroupPopup = false"/>
                                  </q-card-actions>
                                </q-card>
                              </q-dialog>
                            </q-item>
                            <q-item v-if="isAdminUser(group.Admins)" clickable>
                              <q-item-section @click="addUserPrompt = true">Freund hinzufügen</q-item-section>
                              <q-dialog v-model="addUserPrompt" persistent>
                                <q-card style="min-width: 350px">
                                  <q-card-section>
                                    <div class="text-h6">Freund hinzufügen</div>
                                  </q-card-section>

                                  <q-card-section class="q-pt-none">
                                    <q-input label="Gib den Nutzername deines Freundes ein" v-model="addUserUsername" autofocus  />
                                  </q-card-section>

                                  <q-card-actions align="right" class="text-primary">
                                    <q-btn flat label="Abbrechen" v-close-popup />
                                    <q-btn flat color="positive" label="Hinzufügen" @click="addUserToGroup(group.id)" />
                                  </q-card-actions>
                                </q-card>
                              </q-dialog>
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
                        v-for="user in group.Users" v-bind:key="user.id">
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
                                <q-item v-if="!isLoggedInUser(user.id)" clickable>
                                  <q-item-section @click="kickUserPopup = true">Aus der Gruppe entfernen</q-item-section>
                                  <q-dialog v-model="kickUserPopup" persistent>
                                    <q-card style="min-width: 350px">
                                      <q-card-section>
                                        <div class="text-h6">Willst du <strong>"{{ user.fullName }}"</strong> wirklich aus der Gruppe</div>
                                        <div class="text-h6"><strong>"{{ group.Name }}"</strong> entfernen?</div>
                                      </q-card-section>
                                      <q-card-section>
                                        <div class="text-body1">Wenn du <strong>{{user.fullName}}</strong> aus der Gruppe entfernst, hat er/sie keinen Zugriff mehr auf die Events der Gruppe</div>
                                      </q-card-section>
                                      <q-card-actions align="right" class="text-primary">
                                        <q-btn color="negative" flat label="Abbrechen" @click="kickUserPopup = false" />
                                        <q-btn color="positive" flat label="Entfernen" @click="leaveGroup(group, user.id); kickUserPopup = false"/>
                                      </q-card-actions>
                                    </q-card>
                                  </q-dialog>
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
                        v-for="event in group.events" v-bind:key="event.vueId">
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
      newGroupPrompt: false,
      newGroupName: "",
      addUserPrompt: false,
      addUserUsername: "",
      leaveGroupPopup: false,
      kickUserPopup: false
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
      this.groups = []
      for (let groupRef of allGroupRefs)
      {
        let group = await this.loadGroupByRef(groupRef)

        this.groups.push(group)
      }
    },
    async loadGroupByRef(groupRef)
    {
      // get group-data
      let group = groupRef.data()
      group.id = groupRef.id

      //get event-data
      this.fillEventData(group)

      //get user-data
      this.fillUserData(group)

      //get admins-data
      this.fillAdminData(group)

      return group
    },
    async fillEventData(group){
      let events = await this.getAllEventsOfGroup(group.id)
      group.events = []
      for (let event of events){
        group.events.push(event.data())
      }
    },
    async fillUserData(group){
      let usersData = []
      for (let userRef of group.Users){
        let user = await this.getUserByUserId(userRef.id)
        usersData.push(user)
      }
      group.Users = usersData
    },
    async fillAdminData(group){
      let adminData = []
      for (let adminRef of group.Admins){
        let admin = await this.getUserByUserId(adminRef.id)
        adminData.push(admin)
      }
      group.Admins = adminData
    },
    async getGroupsWithLoading()
    {
      this.$q.loading.show({
        message:  'Deine Gruppen werden geladen...',
        backgroundColor: 'grey',
        spinner: QSpinnerGears,
        customClass: 'loader'
      })
      try {
        await this.getGroupsData()

      } catch (err) {
        this.$q.notify({
          message: "Ein Fehler ist aufgetreten: ${err}",
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
      }
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
      }).catch(function(error) {});
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
          Users: [userRef],
          Admins: [userRef]
        })
      }catch (error){
        this.$q.notify({
          message: `Bitte gib deiner Gruppe einen Namen.`,
          color: 'negative'
        })
        return;
      }
      this.$q.notify({
        message: "Deine neue Gruppe wurde erfolgreich erstellt.",
        color: 'positive'
      })
      // Close popup if event created successfully
      this.newGroupPrompt = false;
      await this.getGroupsWithLoading()
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
      }).then(function () {})
      await this.getGroupsWithLoading()
    },
    async removeFromAdminList(group, userId)
    {
      let groupData = await this.$firestore.collection("Groups").doc(group.id).get()
      if(groupData.exists){
        groupData = groupData.data()
      }
      groupData.Admins = this.removeUserFromUserArray(userId, groupData.Admins)
      await this.$firestore.collection('Groups').doc(group.id).update({
        Admins: groupData.Admins
      }).then(function () {
        console.log("Updated succesfully")
      })
      await this.getGroupsWithLoading()
    },
    isLoggedInUser(userId){
      return userId == this.$fb.auth().currentUser.uid
    },
    removeUserFromUserArray(userId, UserArray){
      for(let userIndex in UserArray)
      {
        if(UserArray[userIndex].id == userId)
        {
          UserArray.splice(userIndex, 1)
        }
      }
      return UserArray
    },
    async leaveGroup(group, userId) {
      // if no userId has been provided, use the logged in user
      if(!userId){
        userId = this.$fb.auth().currentUser.uid;
      }

      let groupData = await this.$firestore.collection("Groups").doc(group.id).get()
      if(groupData.exists){
        groupData = groupData.data()
      }
      // remove user from usersarray of group
      groupData.Users = this.removeUserFromUserArray(userId, groupData.Users)

      // check if user is an admin, therefore delete him from adminarray aswell
      if(this.isAdminUser(groupData.Admins, userId))
      {
        groupData.Admins = this.removeUserFromUserArray(userId, groupData.Admins)
      }
      await this.$firestore.collection('Groups').doc(group.id).update({
        Users: groupData.Users,
        Admins: groupData.Admins
      }).then(
        this.$q.notify({
          message: "Deine neue Gruppe wurde erfolgreich erstellt.",
          color: 'positive'
        })
      )
      await this.getGroupsWithLoading()
    },
    async getUserByUsername(username){
      let docRef = await this.$firestore.collection("users").where("fullName", "==", username).limit(1).get();
      let user
      if(!docRef.empty)
      {
        // since this reference only points to one user, just "for each" over that one user to get data
        docRef.forEach(doc => {
          user = doc.data()
        })
        let userRef = await this.$firestore.collection("users").doc(user.id)
        return userRef
      }
      return undefined
    },
    // adds the Username stored in data-object ot the group
    async addUserToGroup(groupId) {
      let userToAddRef = await this.getUserByUsername(this.addUserUsername)
      if(!userToAddRef)
      {
        this.$q.notify({
          type: 'negative',
          message: 'Kein Nutzer mit diesem Nutzername gefunden.'
        })
        this.addUserPrompt = false;
        this.addUserUsername = "";
        return;
      }
      let groupData = await this.$firestore.collection("Groups").doc(groupId).get()
      if(groupData.exists){
        groupData = groupData.data()
      }
      groupData.Users.push(userToAddRef)
      await this.$firestore.collection('Groups').doc(groupId).update({
        Users: groupData.Users
      }).then(function () {
        console.log("Updated succesfully")
      })
      this.addUserPrompt = false;
      this.addUserUsername = "";
      await this.getGroupsWithLoading()
    },
  },
  async created() {
    await this.getGroupsWithLoading();
  }
}
</script>
