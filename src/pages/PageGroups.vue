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
              <q-btn color="positive" class="float-right" icon="add" label="Neue Gruppe erstellen"/>
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
                            <q-item clickable>
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
                          <q-item-section>{{user.fullName}}</q-item-section>
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
      ]
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
      let userId = this.$fb.auth().currentUser.uid;
      let groups = await this.getGroupsOfUser(userId);

      // get all events promises for each group
      let firebaseData = []
      groups.forEach(doc => {
       // console.log(doc.data())
        let groupWithEvents = doc.data()
        groupWithEvents.events = this.getEventsByGroupId(doc.id)
        firebaseData.push(groupWithEvents)
      })

      // await the event promises and save results in the proper groups
      for (let test in firebaseData){
        let events = await firebaseData[test].events
        firebaseData[test].events = []
        events.forEach(eve => {
          firebaseData[test].events.push(eve.data())
        })

        let userRefs = firebaseData[test].Users
        firebaseData[test].Users = []
        for (let userRef of userRefs) {
          console.log(userRef)
          let user = await this.$firestore.collection("users").doc(userRef.id).get()
          firebaseData[test].Users.push(user.data())
        }
      }

      console.log(firebaseData)
      this.groups = firebaseData
    },
    getGroupsOfUser(userId){
      let userRef = this.$firestore.collection("users").doc(userId);
      let groups = this.$firestore.collection("Groups").where("Users", "array-contains", userRef).get();
      return groups;
    },
    getEventsByGroupId(groupId){
      let groupRef = this.$firestore.collection("Groups").doc(groupId);
      let groupEvents = this.$firestore.collection("Events").where("Group", "==", groupRef).get();
      return groupEvents;
    }
  },
  async created() {
    await this.getGroupsData();
  }
}
</script>
