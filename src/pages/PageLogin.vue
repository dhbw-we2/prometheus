<template>
  <q-page class="row justify-center items-center">
    <div class="column">
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" label="email" />
              <q-input square filled clearable v-model="password" type="password" label="password" />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn size="lg" color="secondary" class="full-width" label="Login" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Not registered?
              <q-btn
                color="accent"
                size="btn_size_sq_xs"
                label="Register"
                to="/Register"
              />
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
name: "PageLogin",
  data () {
    return {
      email: '',
      password: ''
    }
  }
}
</script>

<style scoped>
.q-card {
  width: 360px;
}
</style>
