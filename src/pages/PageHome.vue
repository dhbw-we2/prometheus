<template>
  <q-page class="flex-center bg-negative">
    <div class="row">
      <div class="col col-8 offset-0 col-md-5 offset-md-1">
        <div class="row flex-center justify-start">
          <div class="col text-white">
            <h4>Meine Anstehenden Events</h4>
          </div>
        </div>
        <q-card class="my-card">
          <div style="max-width: 800px; width: 100%;">
            <div class="row justify-center items-center">
              <q-btn flat label="Prev" @click="calendarPrev" />
              <q-separator vertical />
              <q-btn flat label="Next" @click="calendarNext" />
            </div>
            <q-separator />
            <div style="overflow: hidden">
              <q-calendar
                ref="calendar"
                v-model="selectedDate"
                view="week-agenda"
                animated
                transition-prev="slide-right"
                transition-next="slide-left"
                locale="en-us"
                style="height: 400px;"
              >
                <template #day-body="{ timestamp }">
                  <template v-for="(agenda) in getAgenda(timestamp)">
                    <div
                      :key="timestamp.date + agenda.time"
                      :label="agenda.time"
                      class="justify-start q-ma-sm shadow-5 bg-grey-6"
                    >
                      <div v-if="agenda.avatar" class="row justify-center" style="margin-top: 30px; width: 100%;">
                        <q-avatar style="margin-top: -25px; margin-bottom: 10px; font-size: 60px; max-height: 50px;">
                          <img :src="agenda.avatar" style="border: #9e9e9e solid 5px;">
                        </q-avatar>
                      </div>
                      <div class="col-12 q-px-sm">
                        <strong>{{ agenda.time }}</strong>
                      </div>
                      <div v-if="agenda.desc" class="col-12 q-px-sm" style="font-size: 10px;">
                        {{ agenda.desc }}
                      </div>
                    </div>
                  </template>
                </template>
              </q-calendar>
            </div>
          </div>
        </q-card>
      </div>

      <div class="col col-3 offset-1">
        <div class="row flex-center justify-start">
          <div class="col text-white">
            <h4>Einladungen</h4>
          </div>

          <q-list bordered class="rounded-borders" style="max-width: 600px; background-color: white">
            <q-item-label header>Ausstehende Einladungen</q-item-label>

            <q-item>
              <q-item-section avatar top>
                <q-icon name="people" color="black" size="34px" />
              </q-item-section>

              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">Party bei Janis</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-grey-8">Party bei Janis</span>
                </q-item-label>
                <q-item-label caption lines="1">
                    @rstoenescu in #1: > The build system
                </q-item-label>
                <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                  <span class="cursor-pointer">Einladung öffnen</span>
                </q-item-label>
              </q-item-section>

              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
                  <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                </div>
              </q-item-section>
            </q-item>

            <q-separator spaced />

            <q-item>
              <q-item-section avatar top>
                <q-icon name="people" color="black" size="34px" />
              </q-item-section>

              <q-item-section top class="col-2 gt-sm">
                <q-item-label class="q-mt-sm">GitHub</q-item-label>
              </q-item-section>

              <q-item-section top>
                <q-item-label lines="1">
                  <span class="text-grey-8">Raclette bei Toni</span>
                </q-item-label>
                <q-item-label caption lines="1">
                  @rstoenescu in #1: > The build system
                </q-item-label>
                <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
                  <span class="cursor-pointer">Einladung öffnen</span>
                </q-item-label>
              </q-item-section>

              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
                  <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

      </div>
    </div>


  </q-page>
</template>

<script>
export default {
  data () {
    return {
      selectedDate: '',
      agenda: {
        // value represents day of the week
        1: [
          {
            time: '08:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
            desc: 'Meeting with CEO'
          },
          {
            time: '08:30',
            avatar: 'https://cdn.quasar.dev/img/avatar.png',
            desc: 'Meeting with HR'
          },
          {
            time: '10:00',
            avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
            desc: 'Meeting with Karen'
          }
        ],
        2: [
          {
            time: '11:30',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
            desc: 'Meeting with Alisha'
          },
          {
            time: '17:00',
            avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
            desc: 'Meeting with Sarah'
          }
        ],
        3: [
          {
            time: '08:00',
            desc: 'Stand-up SCRUM',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          },
          {
            time: '09:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
          },
          {
            time: '10:00',
            desc: 'Sprint planning',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          },
          {
            time: '13:00',
            avatar: 'https://cdn.quasar.dev/img/avatar1.jpg'
          }
        ],
        4: [
          {
            time: '09:00',
            avatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
          },
          {
            time: '10:00',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
          },
          {
            time: '13:00',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          }
        ],
        5: [
          {
            time: '08:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
          },
          {
            time: '09:00',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
          },
          {
            time: '09:30',
            avatar: 'https://cdn.quasar.dev/img/avatar4.jpg'
          },
          {
            time: '10:00',
            avatar: 'https://cdn.quasar.dev/img/avatar5.jpg'
          },
          {
            time: '11:30',
            avatar: 'https://cdn.quasar.dev/img/material.png'
          },
          {
            time: '13:00',
            avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
          },
          {
            time: '13:30',
            avatar: 'https://cdn.quasar.dev/img/avatar3.jpg'
          },
          {
            time: '14:00',
            avatar: 'https://cdn.quasar.dev/img/linux-avatar.png'
          },
          {
            time: '14:30',
            avatar: 'https://cdn.quasar.dev/img/avatar.png'
          },
          {
            time: '15:00',
            avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
          },
          {
            time: '15:30',
            avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
          },
          {
            time: '16:00',
            avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
          }
        ]
      }
    }
  },

  methods: {
    getAgenda (day) {
      return this.agenda[parseInt(day.weekday, 10)]
    },
    calendarNext () {
      this.$refs.calendar.next()
    },
    calendarPrev () {
      this.$refs.calendar.prev()
    }
  }
}
</script>




