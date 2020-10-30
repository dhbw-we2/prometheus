<template>
  <q-page class="flex-center bg-negative text-white">
    <div class="row justify-center lt-md">
      <div  class="text-white col-12">
        <q-parallax :height="300"
                    src="../assets/Raclette.jpg"
                    style="width: 100%;"
        >
          <h3 class="text-white">RaclettOrg</h3>
          <q-btn
            rounded
            color="info"
            size="25px"
            label="Get Started"
          />
        </q-parallax>
      </div>
    </div>
    <div class="row justify-center gt-md">
      <div  class="text-white col-12">
        <q-parallax :height="800"
          src="../assets/Raclette.jpg"
          style="width: 100%;"
        >
          <h1 class="text-white">RaclettOrg</h1>
          <q-btn
            rounded
            color="info"
            size="30px"
            label="Get Started"
          />
        </q-parallax>
      </div>
    </div>
    <div class="q-pa-md  bg-negative">
      <div class="row justify-center" >

        <div class="col col-auto" style="margin: auto; text-align: center">
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

    <q-separator />

    <div class="row col-md-12 lt-md bg-primary">
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

    <div class="row col-md-12 gt-md bg-primary">
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
    <q-separator />
    <div class="row">
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
    <q-separator />
    <div class="row lt-md bg-primary">
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

    <div class="row gt-md bg-primary">
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
    <q-separator />
    <div class="row xl" style="height: 250px">

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
