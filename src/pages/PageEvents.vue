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
          <div class="row">
            <div class="col">
              <q-card class="my-card">
                <q-card-section>
                  <div class="row items-center no-wrap">
                    <div class="col">
                      <div class="text-h5">Silvester Raclette</div>
                      <div class="text-subtitle2 q-pa-sm">erstellt von: Janis Fix</div>
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
                        <q-item-label caption>Bei Janis im Keller</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="dark" name="today"/>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Wann</q-item-label>
                        <q-item-label caption>31.12.2020, ab 19 Uhr</q-item-label>
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
                        <q-item>
                          <q-item-section avatar>
                            <q-avatar size="28px">
                              <img src="https://cdn.pixabay.com/photo/2018/01/13/19/39/fashion-3080644__480.jpg">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Tomaten</q-item-label>
                            <q-item-label caption>17 frisch gepflückt</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section avatar>
                            <q-avatar size="28px">
                              <img src="https://cdn.pixabay.com/photo/2015/04/27/22/53/man-742766__480.jpg">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Mais</q-item-label>
                            <q-item-label caption>2 Dosen</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section avatar>
                            <q-avatar size="28px">
                              <img src="https://cdn.pixabay.com/photo/2018/01/13/19/39/fashion-3080644__480.jpg">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Äpfel</q-item-label>
                            <q-item-label caption>Keine! Ich mein, wer macht Äpfel auf sein Raclette?</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section avatar>
                            <q-avatar size="28px">
                              <img src="https://cdn.pixabay.com/photo/2015/01/27/09/58/human-613601__480.jpg">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Pilze</q-item-label>
                            <q-item-label caption>2 Kilo</q-item-label>
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
                          <q-avatar class="q-pa-sm" size="28px">
                            <img src="https://cdn.pixabay.com/photo/2018/01/13/19/39/fashion-3080644__480.jpg">
                          </q-avatar>
                          <q-avatar class="q-pa-sm" size="28px">
                            <img src="https://cdn.pixabay.com/photo/2015/01/27/09/58/human-613601__480.jpg">
                          </q-avatar>
                          <q-avatar class="q-pa-sm" size="28px">
                            <img src="https://cdn.pixabay.com/photo/2015/04/27/22/53/man-742766__480.jpg">
                          </q-avatar>
                        </div>
                      </div>
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
                      <div class="text-h5">Abschieds Essen</div>
                      <div class="text-subtitle2 q-pa-sm">erstellt von: Tobias Bühler</div>
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
                        <q-item-label caption>In der Wohnung in Karlsruhe</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section avatar>
                        <q-icon color="dark" name="today"/>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>Wann</q-item-label>
                        <q-item-label caption>30.11.2020, ab 19 Uhr</q-item-label>
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
                        <q-item>
                          <q-item-section avatar>
                            <q-avatar size="28px">
                              <img src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__480.jpg">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Tomaten</q-item-label>
                            <q-item-label caption>17 frisch gepflückt</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section avatar>
                            <q-avatar size="28px">
                              <img src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__480.jpg">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Mais</q-item-label>
                            <q-item-label caption>2 Dosen</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section avatar>
                            <q-avatar size="28px">
                              <img src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__480.jpg">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Äpfel</q-item-label>
                            <q-item-label caption>Keine! Ich mein, wer macht Äpfel auf sein Raclette?</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section avatar>
                            <q-avatar size="28px">
                              <img src="https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869__480.jpg">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Pilze</q-item-label>
                            <q-item-label caption>2 Kilo</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section avatar>
                            <q-avatar size="28px">
                              <img src="https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869__480.jpg">
                            </q-avatar>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>Annanas</q-item-label>
                            <q-item-label caption>2 Stück</q-item-label>
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
                          <q-avatar class="q-pa-sm" size="28px">
                            <img src="https://cdn.pixabay.com/photo/2017/08/30/12/45/girl-2696947__480.jpg">
                          </q-avatar>
                          <q-avatar class="q-pa-sm" size="28px">
                            <img src="https://cdn.pixabay.com/photo/2015/03/03/20/42/man-657869__480.jpg">
                          </q-avatar>
                          <q-avatar class="q-pa-sm" size="28px">
                            <img src="https://cdn.pixabay.com/photo/2015/09/18/11/46/man-945482__480.jpg">
                          </q-avatar>
                          <q-avatar class="q-pa-sm" size="28px">
                            <img src="https://cdn.pixabay.com/photo/2015/07/15/06/42/homeless-845709__480.jpg">
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
export default {
  name: 'PageCamera'
}
</script>
