<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn round to="/">
            <q-avatar round="round" color="white" font-size="35px" size="45px">
              <img src="../assets/racletteicon.png"/>
            </q-avatar>
          </q-btn>
          RaclettOrg
          <q-btn round color="secondary float-right" to="/auth/login" icon="login" v-if="!$store.state.auth.isAuthenticated"/>
          <q-btn round color="secondary float-right" @click="logout" icon="logout" v-if="$store.state.auth.isAuthenticated" />
          <div class="float-right q-mr-sm" v-if="$store.state.auth.isAuthenticated && currentUser">
            <div class="default-user-image " v-if="currentUser.profilePhoto === '' ">
              <q-avatar round="round" color="blue-grey-10" icon="person" font-size="35px" @click="editProfile" size="45px" text-color="white"></q-avatar>
            </div>
            <div class="user-image" v-else="v-else">
              <q-avatar class="q-mb-sm shadow-5  bg-negative" @click="editProfile" size="45px">
                <q-img :src="currentUser.profilePhoto"></q-img>
              </q-avatar>
            </div>
          </div>

        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left" v-if="$store.state.auth.isAuthenticated">
        <q-route-tab to="/Home" label="Home"/>
        <q-route-tab to="/Events" label="Deine Events"/>
        <q-route-tab to="/Groups" label="Deine Gruppen"/>
      </q-tabs>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {
    }
  },
  created () {

  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    meta () {
      return {
        id: this.currentUser.id,
        photoType: this.photoType
      }
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
        this.$router.push({ path: '/Start' })
      } catch (err) {
        this.$q.notify({
          type: 'negative',
          message: `${err}`,
        })
      }
    },
    editProfile()
    {
      this.$router.push({ path: '/user/profile' })
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
