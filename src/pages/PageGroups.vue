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
                      <div class="text-h5">{{ group.name }}</div>
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
                        v-for="user in group.users">
                          <q-item-section avatar>
                            <q-avatar>
                              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>{{user.username}}</q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                    <div class="col col-12 col-md-6 q-pa-sm">
                      <div class="text-h6 q-pa-sm">Events:</div>
                      <q-list bordered separator>
                        <q-item clickable v-ripple
                        v-for="event in group.events">
                          <q-item-section>
                            <q-item-label>{{ event.name }}</q-item-label>
                            <q-item-label caption>{{ event.datetime | dateToString }}</q-item-label>
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
        {
          id: 1,
          name: "Testgruppe",
          created: 1602674046530,
          users: [
            {
              id: 1,
              username: "DeFix"
            },
            {
              id: 2,
              username: "DeEinecker"
            },
            {
              id: 3,
              username: "DeBühler"
            }
          ],
          events: [
            {
              id: 1,
              datetime: 1602674046530,
              name: "Testevent"
            },
            {
              id: 1,
              datetime: 1602677000000,
              name: "Essen bei Toni im Keller"
            }
          ]
        },
        {
          id: 2,
          name: "Die andere kuhle Gruppe",
          created: 1602674046530,
          users: [
            {
              id: 1,
              username: "DeFix"
            },
            {
              id: 2,
              username: "DeEinecker"
            },
            {
              id: 3,
              username: "DeBühler"
            },
            {
              id: 4,
              username: "DeZipfel"
            }
          ],
          events: [
            {
              id: 1,
              datetime: 1602674046530,
              name: "Testevent"
            },
            {
              id: 1,
              datetime: 1602677000000,
              name: "Essen bei Toni im Keller"
            }
          ]
        }
      ]
    }
  },
  filters:{
    dateToString(timestamp){
      return date.formatDate(timestamp, "DD.MM.YYYY HH:mm") + " Uhr"
    }
  },
  methods: {
    updateQuerry()
    {
      let query = this.$firestore.collection("posts").orderBy("date", "desc")
    }
  }
}
</script>
