<template>
  <q-page class="flex-center bg-image" padding>
    <div class="q-pa-md">
      <div class="row">
        <div class="col col-12 offset-0 col-md-8 offset-md-2">
          <div class="row flex-center justify-start">
            <div class="col text-white">
              <h4>Deine Gruppen</h4>
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
                            <q-avatar color="blue-grey-10" icon="person" text-color="white" v-if="user.profilePhoto === '' "></q-avatar>
                            <q-avatar v-else>
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

/**
 * Page to view all groups and edit them
 */
export default {
  name: 'PageGroups',
  data () {
    return {
      /** object containing the users groups */
      groups: [
      ],
      /** flag for the add group prompt */
      newGroupPrompt: false,
      /** name of the new group, that should be added */
      newGroupName: "",
      /** flag for the add user to group prompt */
      addUserPrompt: false,
      /** username of the user that should be added to a group */
      addUserUsername: "",
      /** flag for leave group popup */
      leaveGroupPopup: false,
      /** flag for kick user popup */
      kickUserPopup: false
    }
  },
  filters:{
    /**
     * returns a german date string of the given timestamp
     * @param timestamp
     * @returns {string} german date string
     */
    dateToString(timestamp){
      let timestampInMs = timestamp.seconds * 1000
      return date.formatDate(timestampInMs, "DD.MM.YYYY HH:mm") + " Uhr"
    }
  },
  methods:{
    /**
     * Get all groups for logged in user
     */
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
    /**
     * Loads a single group by its reference
     * @param groupRef reference of group
     * @returns {Promise<*>} promise holding the group
     */
    async loadGroupByRef(groupRef)
    {
      // get group-data
      let group = groupRef.data()
      group.id = groupRef.id

      //get event-data
      await this.fillEventData(group)

      //get user-data
      await this.fillUserData(group)

      //get admins-data
      await this.fillAdminData(group)

      return group
    },
    /**
     * Gets all event-data for a specific group
     * @param group group to get events from
     */
    async fillEventData(group){
      let events = await this.getAllEventsOfGroup(group.id)
      // fill events (call by reference)
      group.events = []
      for (let event of events){
        group.events.push(event.data())
      }
    },
    /**
     * Gets all users for the specified group
     * @param group group to get users from
     */
    async fillUserData(group){
      let usersData = []
      for (let userRef of group.Users){
        let user = await this.getUserByUserId(userRef.id)
        usersData.push(user)
      }
      // fill users (call by reference)
      group.Users = usersData
    },
    /**
     * Gets all admins of the specified group
     * @param group group to get admins from
     * @returns {Promise<void>}
     */
    async fillAdminData(group){
      let adminData = []
      for (let adminRef of group.Admins){
        let admin = await this.getUserByUserId(adminRef.id)
        adminData.push(admin)
      }
      // fill admins (call by reference)
      group.Admins = adminData
    },
    /**
     * Gets all groups, but uses a spinner while loading for user communication
     */
    async getGroupsWithLoading()
    {
      // start spinner
      this.$q.loading.show({
        message:  'Deine Gruppen werden geladen...',
        backgroundColor: 'grey',
        spinner: QSpinnerGears,
        customClass: 'loader'
      })
      try {
        await this.getGroupsData()

      } catch (err) {
        // notify user if error happens
        this.$q.notify({
          message: "Ein Fehler ist aufgetreten: ${err}",
          color: 'negative'
        })
      } finally {
        // hide spinner in the end
        this.$q.loading.hide()
      }
    },
    /**
     * Returns all group references of the specified user
     * @param userId
     * @returns {Promise<[]>} array with all group references
     */
    async getGroupsOfUser(userId) {
      let data = [];
      let userRef = this.$firestore.collection("users").doc(userId);
      // filter groups by the userId
      await this.$firestore.collection("Groups").where("Users", "array-contains", userRef).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          data.push(doc);
        });
      });
      return data;
    },
    /**
     * Returns all event references of the specified group
     * @param groupId
     * @returns {Promise<[]>} array with all event references
     */
    async getAllEventsOfGroup(groupId){
      let data = [];
      let groupRef = this.$firestore.collection("Groups").doc(groupId);
      // filter events by groupId
      await this.$firestore.collection("Events").where("Group", "==", groupRef).get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc) {
          data.push(doc);
        });});
      return data;
    },
    /**
     * gets the user for the specified userId
     * @param userId
     * @returns {Promise<*>} Promise of user
     */
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
    /**
     * Creates a new group with the name given in the newGroupName-field
     * @returns {Promise<void>}
     */
    async createNewGroup(){
      let userID = this.$fb.auth().currentUser.uid;
      let userRef = this.$firestore.collection("users").doc(userID);
      let timeCreated = Date.now()

      try {
        // check if groupname is empty first
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
    /**
     * Check whether the given user is part of the admin list
     * @param adminList list of admins
     * @param userId userId
     * @returns {boolean}
     */
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
    /**
     * Adds a user to the adminlist of the specified group
     * @param group
     * @param userId
     */
    async addToAdminList(group, userId) {
      // get the group
      let groupData = await this.$firestore.collection("Groups").doc(group.id).get()
      if(groupData.exists){
        groupData = groupData.data()
      }
      // get the user
      let userRef = await this.$firestore.collection("users").doc(userId)
      // add user to admin list and update group entity
      groupData.Admins.push(userRef)
      await this.$firestore.collection('Groups').doc(group.id).update({
        Admins: groupData.Admins
      }).then(function () {})
      await this.getGroupsWithLoading()
    },
    /**
     * Remove user from the admin list of the given group
     * @param group
     * @param userId
     */
    async removeFromAdminList(group, userId)
    {
      // get group
      let groupData = await this.$firestore.collection("Groups").doc(group.id).get()
      if(groupData.exists){
        groupData = groupData.data()
      }
      // remove user from admin list
      groupData.Admins = this.removeUserFromUserArray(userId, groupData.Admins)
      // update group
      await this.$firestore.collection('Groups').doc(group.id).update({
        Admins: groupData.Admins
      }).then(function () {
        console.log("Updated succesfully")
      })
      // refresh groups
      await this.getGroupsWithLoading()
    },
    /**
     * checks whether the userId is the logged in user
     * @param userId
     * @returns {boolean}
     */
    isLoggedInUser(userId){
      return userId == this.$fb.auth().currentUser.uid
    },
    /**
     * Removes user form the given userArray
     * @param userId
     * @param userArray
     * @returns {*} the updated user array
     */
    removeUserFromUserArray(userId, userArray){
      for(let userIndex in userArray)
      {
        if(userArray[userIndex].id == userId)
        {
          userArray.splice(userIndex, 1)
        }
      }
      return userArray
    },
    /**
     * Removes the user from the given group
     * @param group group to leave from
     * @param userId userId of the user leaving the group, can be null
     */
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

      // check if user is an admin, therefore delete him from adminarray as well
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
	// reload group data


      await this.getGroupsWithLoading()
    },
    /**
     * Gets the user reference for the given username
     * @param username username to get the reference from
     * @returns {Promise<undefined|*>} Promise of userreference or undefined if not found
     */
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
    /**
     * adds the username stored in data-object to the group
     * @param groupId group to add the user to
     */
    async addUserToGroup(groupId) {
      // get user by username
      let userToAddRef = await this.getUserByUsername(this.addUserUsername)
      // react to non existing user
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
      // get group
      let groupData = await this.$firestore.collection("Groups").doc(groupId).get()
      if(groupData.exists){
        groupData = groupData.data()
      }
      // update group
      groupData.Users.push(userToAddRef)
      await this.$firestore.collection('Groups').doc(groupId).update({
        Users: groupData.Users
      }).then(function () {
        console.log("Updated succesfully")
      })
      this.addUserPrompt = false;
      this.addUserUsername = "";
      // reload groups
      await this.getGroupsWithLoading()
    },
  },
  async created() {
    await this.getGroupsWithLoading();
  }
}
</script>
