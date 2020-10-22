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
          <div class="row">
            <div class="col">
              <q-card class="my-card">
                <q-card-section>
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div class="text-h5">SuperFreundeGruppe</div>
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
                        <q-item clickable v-ripple>
                          <q-item-section avatar>
                            <q-avatar>
                              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>Max Mustermann</q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                          <q-item-section avatar>
                            <q-avatar>
                              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>Toni Einecker</q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                          <q-item-section avatar>
                            <q-avatar>
                              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>Janis Fix</q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                          <q-item-section avatar>
                            <q-avatar>
                              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>Tobias Bühler</q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                    <div class="col col-12 col-md-6 q-pa-sm">
                      <div class="text-h6 q-pa-sm">Events:</div>
                      <q-list bordered separator>
                        <q-item clickable v-ripple>
                          <q-item-section>
                            <q-item-label>Essen bei Tobi</q-item-label>
                            <q-item-label caption>am 42.02.2020 um 13:37 Uhr</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                          <q-item-section>
                            <q-item-label>WG-Essen</q-item-label>
                            <q-item-label caption>am 42.02.2020 um 13:37 Uhr</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col">
              <q-card class="my-card">
                <q-card-section>
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div class="text-h5">SuperFreundeGruppe</div>
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
                        <q-item clickable v-ripple>
                          <q-item-section avatar>
                            <q-avatar>
                              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>Max Mustermann</q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                          <q-item-section avatar>
                            <q-avatar>
                              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>Toni Einecker</q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                          <q-item-section avatar>
                            <q-avatar>
                              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>Janis Fix</q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                          <q-item-section avatar>
                            <q-avatar>
                              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>Tobias Bühler</q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                    <div class="col col-12 col-md-6 q-pa-sm">
                      <div class="text-h6 q-pa-sm">Events:</div>
                      <q-list bordered separator>
                        <q-item clickable v-ripple>
                          <q-item-section>
                            <q-item-label>Essen bei Tobi</q-item-label>
                            <q-item-label caption>am 42.02.2020 um 13:37 Uhr</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                          <q-item-section>
                            <q-item-label>WG-Essen</q-item-label>
                            <q-item-label caption>am 42.02.2020 um 13:37 Uhr</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
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
export default {
  name: 'PageHome'
}
</script>
