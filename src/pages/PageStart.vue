<template>
  <q-page class="flex-center">
    <div class="q-pa-md  bg-negative">
      <div class="row" >
        <div class="col" style="text-align: center">
          <q-img
            src="../assets/Raclette.jpg"
            style="width: 65%; margin-top: 30px"
            transition="fade"
          >
          </q-img>
          <br>
          <q-btn
            rounded
            color="info"
            size="40px"
            label="Get Started"
            style="margin-top: 20px"
          />
        </div>
        <div class="col" style="margin: auto; text-align: center">
          <h3>
            RaclettOrg
          </h3>
          <h5>Easy Organizer for Raclette Evenings with your Friends</h5>
          <div>
            <q-chip size="xl" icon="bookmark">
              Connecting with Friends
            </q-chip>
          </div>
          <div>
            <q-chip size="xl" icon="bookmark" style="margin-top: 10px">
              Organize Events together
            </q-chip>
          </div>
          <div>
            <q-chip size="xl" icon="bookmark" style="margin-top: 10px">
              Enjoy the Raclette Evenings
            </q-chip>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-primary">
      <div class="col-6">

      </div>
      <div class="col-6  offset-md-6">
        <q-parallax :height="300" :speed="0.3">
          <template v-slot:media>
            <img src="../assets/friends.jpeg">
          </template>

          <h1 class="text-white">Connect</h1>
        </q-parallax>
      </div>
    </div>
    <div class="row bg-negative">
      <div class="col-6">
        <q-parallax :height="300" :speed="0.5">
          <template v-slot:media>
            <img src="../assets/organize.jpg">
          </template>

          <h1 class="text-white">Organize</h1>
        </q-parallax>
      </div>
      <div class="col-6 offset-md-6">

      </div>
    </div>
    <div class="row bg-primary">
      <div class="col-6">

      </div>
      <div class="col-6 offset-md-6">
        <q-parallax :height="300" :speed="0.5">
          <template v-slot:media>
            <img src="../assets/raclette_nice.jpg">
          </template>

          <h1 class="text-white">Enjoy</h1>
        </q-parallax>
      </div>

    </div>
  </q-page>
</template>

<script>
export default {
name: "page1"
}
</script>

<style scoped>

</style>
