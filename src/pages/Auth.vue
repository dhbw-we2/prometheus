<template>
  <q-page padding>
    <h5 class="text-center">{{ getAuthType }}</h5>
    <q-form class="authentication q-gutter-y-md" ref="emailAuthenticationForm" @submit="onSubmit">
      <q-input
        v-model="email"
        outlined
        autocomplete="email"
        color="primary"
        data-cy="email"
        for="email"
        lazy-rules="lazy-rules"
        name="email"
        label="EMAIL ADRESSE"
        type="email"
        :rules="[val => !!val || '*Feld wird benötigt', val => val.includes('@') && val.includes('.') || '*Bitte trage eine gültige Email Adresse ein']"
      />
      <q-input
        v-model="password"
        for="password"
        name="password"
        lazy-rules="lazy-rules"
        outlined
        autocomplete="current-password"
        color="primary"
        data-cy="password"
        label="PASSWORT"
        :rules="[val => !!val || '*Feld wird benötigt']"
        :type="isPwd ? 'password' : 'text'"
        @keyup.enter="onSubmit();"
      >
        <template v-slot:append>
          <q-icon class="cursor-pointer" :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-input
        v-if="isRegistration"
        lazy-rules="lazy-rules"
        outlined
        autocomplete="new-password"
        color="primary"
        data-cy="verifyPassword"
        label="PASSWORT BESTÄTIGEN"
        v-model="passwordMatch"
        :rules="[val => !!val || '*Feld wird benötigt', val => val === password || '*Passwörter stimmen nicht überein']"
        :type="isPwd ? 'password' : 'text'"
        @keyup.enter="onSubmit();"
      >
        <template v-slot:append>
          <q-icon class="cursor-pointer" :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-btn
        class="full-width q-mt-md"
        color="primary"
        data-cy="submit"
        type="submit"
        :label="getAuthType"
      >
      </q-btn>

      <p class="q-mt-md q-mb-none text-center">
        <router-link class="text-blue" :to="routeAuthentication">
          <span v-if="isRegistration">Jetzt einloggen</span>
          <span v-else>Einen neuen Account erstellen</span>
        </router-link>
      </p>
      <p class="q-ma-sm text-center">
        <router-link class="text-blue" to="forgotPassword">Passwort vergessen?</router-link>
      </p>
    </q-form>
  </q-page>
</template>

<script>

// importing actions from store/auth
import { mapActions } from 'vuex'
//importing spinner gears
import { QSpinnerGears } from 'quasar'

export default {
  // page name Auth
  name: 'Auth',
  computed: {
    // return whether the page state is register or login
    getAuthType () {
      return this.isRegistration ? 'Registrieren' : 'Einloggen'
    },
    // change route to register
    isRegistration () {
      return this.$route.name === 'Register'
    },
    // return route depending on registration or login
    routeAuthentication () {
      return this.isRegistration ? '/auth/login' : '/auth/register'
    }
  },
  data () {
    return {
      // vars for the input fields
      email: null,
      isPwd: true,
      password: null,
      passwordMatch: null
    }
  },
  methods: {
    /*
    * mapping user actions to the onSubmit function
    *
    * validate inputs
    *
    * starting the qspinner gear while processing inputs
    * calling createNewUser or loginUser in the auth actions
    *
    * handle errors and disable the spinning gear after success
    * */
    ...mapActions('auth', ['createNewUser', 'loginUser']),
    onSubmit () {
      const { email, password } = this
      // validate input
      this.$refs.emailAuthenticationForm.validate()
        .then(async success => {
          // starting spinning gear after input is validated
          if (success) {
            this.$q.loading.show({
              message: this.isRegistration ? 'Dein Account wird registriert...'
                : 'Du wirst eingeloggt...',
              backgroundColor: 'grey',
              spinner: QSpinnerGears,
              customClass: 'loader'
            })
            // create or login user depending on isRegistration state
            let registerMessage = true
            try {
              if (this.isRegistration) {
                await this.createNewUser({ email, password })
                this.$router.push({ path: '/user/profile' })
              } else {
                registerMessage = false
                await this.loginUser({ email, password })
                this.$router.push({ path: '/home' })
              }

            } catch (err) {
              // handling errors and notify user
              if (registerMessage){
                this.$q.notify({
                  message: `Bei der Registrierung ist ein Fehler aufgetreten: ` + err,
                  color: 'negative'
                })
              }else{
                this.$q.notify({
                  message: `Email Adresse und Passwort stimmen nicht überein.`,
                  color: 'negative'
                })
              }

            } finally {
              // disabling the spinning gear
              this.$q.loading.hide()
            }
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.authentication
  margin auto
  max-width 30em
  width 100%
</style>
