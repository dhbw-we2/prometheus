<template>
  <q-page padding="padding">
    <q-form class="authentication q-gutter-y-md" ref="forgotPasswordForm" @submit="onSubmit">
      <router-link to="/">
        <q-img alt="Scori Logo" src="/fp-logo.png"></q-img>
      </router-link>
      <h4 class="q-mb-none">Passwort vergessen</h4>
      <div class="inst q-mb-lg">Bitte trage deine Email Adresse ein und wir senden dir einen Link zum zurücksetzen deines Passworts zu.</div>
      <q-input
        v-model="email"
        outlined
        autocomplete="email"
        color="primary"
        data-cy="email"
        for="email"
        label="EMAIL ADRESSE"
        lazy-rules="lazy-rules"
        name="email"
        type="email"
        :rules="[val => !!val || '*Field is required', val => val.includes('@') && val.includes('.') || '*Bitte trage eine gültige Email Adresse ein']"
      ></q-input>
      <q-btn class="full-width q-mt-md" color="primary" data-cy="submit" label="PASSWORT ZURÜCKSETZEN" :loading="loading" @click="onSubmit">
        <template v-slot:loading>
          <q-spinner-gears></q-spinner-gears>
        </template>
      </q-btn>
    </q-form>
  </q-page>
</template>

<script>
import { QSpinnerGears } from 'quasar'
export default {
  name: 'ForgotPassword',
  data () {
    // input variable for email field
    return {
      email: '',
      loading: false
    }
  },
  methods: {
    /*
    * validate the input of email field
    *
    * starting spinning gear
    *
    * calling firebase function to send password reset mail
    *
    * */
    onSubmit () {
      this.$refs.forgotPasswordForm.validate()
        .then(async success => {
          this.$q.loading.show({
            message: 'Versuche dein Passwort zurückzusetzen.',
            backgroundColor: 'grey',
            spinner: QSpinnerGears,
            customClass: 'loader'
          })
          if (success) {
            try {
              await this.$fb.auth().sendPasswordResetEmail(this.email)
            } catch (err) {/*Ignore the error to not reveal any informations about user accounts*/}
            this.$q.notify({
              color: 'positive',
              message: 'Eine Email zum zurücksetzen deines Passworts wurde an die von dir angegebene Email Adresse gesendet.'
            })
          }
          this.$q.loading.hide()
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.authentication
  margin auto
  max-width 30em
  width 100%
  .q-img
    height 190px
.q-page >>> .q-img__image
  height 184px
  background-size 35% !important
  background-position 50% 100% !important
</style>
