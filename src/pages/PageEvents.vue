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
              <q-btn color="positive" class="float-right" icon="add" label="Neues Event erstellen"/>
            </div>
          </div>
          <div class="row"
               v-for="event in events">
            <div class="col">
              <q-card class="my-card">
                <q-card-section>
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div class="text-h5">{{ event.Description }}</div>
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
                        <q-item-label caption>{{ event.Timestamp }}</q-item-label>
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
                              <img src="https://cdn.pixabay.com/photo/2018/01/13/19/39/fashion-3080644__480.jpg">
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
                                    v-for="user in event.Group">
                            <img src="https://cdn.pixabay.com/photo/2018/01/13/19/39/fashion-3080644__480.jpg">
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
export default {
  name: 'PageEvents',
  data () {
    return {
      events: [
      ]
    }
  },
  methods:{
    async getGroupsData()
    {
      let userId = this.$fb.auth().currentUser.uid;
      let groups = await this.getGroupsByUserId(userId);

      // get all events promises for each group
      let firebaseGroups = []
      groups.forEach(doc => {
        // console.log(doc.data())
        let groupWithEvents = doc.data()
        groupWithEvents.events = this.getEventsByGroupId(doc.id)
        firebaseGroups.push(groupWithEvents)
      })

      // await the event promises and save all event Data
      let firebaseEvents = []
      for (let groupIndex in firebaseGroups){
        let events = await firebaseGroups[groupIndex].events
        events.forEach(event => {
          firebaseEvents.push(event.data())
        })
      }
      for (let eventIndex in firebaseEvents){
        let items = firebaseEvents[eventIndex].Items
        for (let itemIndex in items)
        {
          items[itemIndex] = await this.getItemByItemId(items[itemIndex].id)
          items[itemIndex].Creator = await this.getUserByUserId(items[itemIndex].Creator.id)
          items[itemIndex].Shopper = await this.getUserByUserId(items[itemIndex].Shopper.id)
        }
      }
      console.log(firebaseEvents)
      this.events = firebaseEvents
    },
    getGroupsByUserId(userId){
      let userRef = this.$firestore.collection("users").doc(userId);
      let groups = this.$firestore.collection("Groups").where("Users", "array-contains", userRef).get();
      return groups;
    },
    getEventsByGroupId(groupId){
      let groupRef = this.$firestore.collection("Groups").doc(groupId);
      let groupEvents = this.$firestore.collection("Events").where("Group", "==", groupRef).get();
      return groupEvents;
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
      let docRef = this.$firestore.collection("user").doc(userId);
      var returnValue
      await docRef.get().then(function(doc) {
        if (doc.exists) {
          returnValue = doc.data()
        }
      }).catch(function(error) {
        console.log("Error getting user:", error);
      });
      return returnValue;
    }
  },
  async created() {
    await this.getGroupsData();
  }
}
</script>
