<template>
  <q-page class="flex-center text-white">
    <div class="q-pa-md  bg-negative">
      <div class="row justify-center" >
        <div class="col col-sm-6 col-xs-12">
          <div  style="text-align: center">
            <div class="xs">
              <q-img
                src="../assets/Raclette.jpg"
                style="width: 70%; margin-top: 15px"
              >
              </q-img>
            </div>
            <div class="sm">
              <q-img
                src="../assets/Raclette.jpg"
                style="width: 70%; margin-top: 15px"
              >
              </q-img>
            </div>
            <div class="md">
              <q-img
                src="../assets/Raclette.jpg"
                style="width: 70%; margin-top: 15px"
              >
              </q-img>
            </div>
            <div class="lg">
              <q-img
                src="../assets/Raclette.jpg"
                style="width: 60%; margin-top: 15px"
              >
              </q-img>
            </div>
            <div class="xl">
              <q-img
                src="../assets/Raclette.jpg"
                style="width: 40%; margin-top: 15px"
              >
              </q-img>
            </div>

            <br>
            <q-btn
              rounded
              color="info"
              size="30px"
              label="Get Started"
              style="margin-top: 20px"
            />
          </div>

        </div>
        <div class="col col-auto" style="margin: auto; text-align: center">
          <h3>
            <q-avatar>
              <img src="../assets/racletteicon.png" height="250" width="250"/>
            </q-avatar>
            RaclettOrg
          </h3>
          <h5>Easy Organizer for Raclette Evenings with your Friends</h5>
          <div>
            <q-chip size="lg" icon="bookmark">
              Connecting with Friends
            </q-chip>
          </div>
          <div>
            <q-chip size="lg" icon="bookmark" style="margin-top: 10px">
              Organize Events together
            </q-chip>
          </div>
          <div>
            <q-chip size="lg" icon="bookmark" style="margin-top: 10px">
              Enjoy the Raclette Evenings
            </q-chip>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-primary col-md-12 lt-md">
      <div class="col-12">
        <q-parallax :height="300" :speed="0.5" style="text-align: right">
          <template v-slot:media>
            <img src="../assets/friends_pic.jpg">
          </template>

          <h1 class="text-white">Connect</h1>
        </q-parallax>
      </div>
      <div class="col-12">
        <div style="margin: 15px;">
          Text for Mobile
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
      </div>
    </div>

    <div class="row bg-primary col-md-12 gt-md">
      <div class="col-6 col-md-6">
        <div style="margin: 15px;">
          Text for desktop
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
      </div>
      <div class="col-6 col-sm-6 col-xs-12">
        <q-parallax :height="300" :speed="0.5" style="text-align: right">
          <template v-slot:media>
            <img src="../assets/friends_pic.jpg">
          </template>

          <h1 class="text-white">Connect</h1>
        </q-parallax>
      </div>
    </div>
    <div class="row bg-negative">
      <div class="col-6 col-sm-6 col-xs-12">
        <q-parallax :height="300" :speed="0.5">
          <template v-slot:media>
            <img src="../assets/organize.jpg">
          </template>

          <h1 class="text-white">Organize</h1>
        </q-parallax>
      </div>
      <div class="col-6 col-sm-6 col-xs-12">
        <div style="margin: 15px;">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
      </div>
    </div>
    <div class="row bg-primary lt-md">
      <div class="col-12">
        <q-parallax :height="300" :speed="0.5">
          <template v-slot:media>
            <img src="../assets/raclette_nice.jpg">
          </template>

          <h1 class="text-white">Enjoy</h1>
        </q-parallax>
      </div>
      <div class="col-12">
        <div style="margin: 15px;">
          Text for Mobile
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
      </div>
    </div>

    <div class="row bg-primary gt-md">
      <div class="col-6">
        <div style="margin: 15px;">
          Text for desktop
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </div>
      </div>
      <div class="col-6">
        <q-parallax :height="300" :speed="0.5">
          <template v-slot:media>
            <img src="../assets/raclette_nice.jpg">
          </template>

          <h1 class="text-white">Enjoy</h1>
        </q-parallax>
      </div>
    </div>

    <div class="row xl bg-negative" style="height: 250px">

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
