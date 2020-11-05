<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/racletteicon.png" height="250" width="250"/>
          </q-avatar>
          RaclettOrg
          <q-btn round color="secondary float-right" to="/auth/login" icon="login" v-if="!$store.state.auth.isAuthenticated"/>
          <q-btn round color="secondary float-right" @click="logout" icon="logout" v-if="$store.state.auth.isAuthenticated" />
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left" v-if="$store.state.auth.isAuthenticated">
        <q-route-tab to="/Events" label="Events"/>
        <q-route-tab to="/Groups" label="Groups"/>
      </q-tabs>
    </q-header>

    <q-drawer v-model="left" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data () {
    return {
      left: false
    }
  },
  methods: {
    ...mapActions('auth', ['logoutUser']),
    async logout() {
      try {
        await this.logoutUser()
        this.$q.notify({
          type: 'info',
          message: "You are now logged out!"
        })
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: `${err}`,
        })
      }
    }
  }

}
</script>

<style lang="sass">
.q-toolbar
  @media (min-width: $breakpoint-sm-min)
    height: 77px
.q-toolbar__title
  font-size: 30px
  @media (max-width: $breakpoint-xs-max)
    text-align: center
.q-footer
  .q-tab__icon
    font-size: 30px
</style>
