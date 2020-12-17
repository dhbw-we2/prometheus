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
        label="EMAIL"
        type="email"
        :rules="[val => !!val || '*Field is required', val => val.includes('@') && val.includes('.') || '*Please Provide a valid email']"
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
        label="PASSWORD"
        :rules="[val => !!val || '*Field is required']"
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
        label="VERIFY PASSWORD"
        v-model="passwordMatch"
        :rules="[val => !!val || '*Field is required', val => val === password || '*Passwords don\'t match']"
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
          <span v-if="isRegistration">Need to login?</span>
          <span v-else>Need to create an account?</span>
        </router-link>
      </p>
      <p class="q-ma-sm text-center">
        <router-link class="text-blue" to="forgotPassword">Forgot Password?</router-link>
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
      return this.isRegistration ? 'Register' : 'Login'
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
              message: this.isRegistration ? 'Registering your account...'
                : 'Authenticating your account...',
              backgroundColor: 'grey',
              spinner: QSpinnerGears,
              customClass: 'loader'
            })
            // create or login user depending on isRegistration state
            try {
              if (this.isRegistration) {
                await this.createNewUser({ email, password })
                this.$router.push({ path: '/user/profile' })
              } else {
                await this.loginUser({ email, password })
                this.$router.push({ path: '/home' })
              }

            } catch (err) {
              // handling errors and notify user
              console.error(err)
              this.$q.notify({
                message: `An error as occured: ${err}`,
                color: 'negative'
              })
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
