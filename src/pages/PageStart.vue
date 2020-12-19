<template>
  <q-page class="flex-center bg-negative text-white">
    <div class="row justify-center lt-md">
      <div  class="text-white col-12">
        <q-parallax :height="400"
                    src="../assets/Raclette.jpg"
                    style="width: 100%;"
        >
          <h3 class="text-white">RaclettOrg</h3>
          <q-btn v-if="$store.state.auth.isAuthenticated"
             rounded
             color="info"
             size="25px"
             to="/Home"
             label="Los Geht's"
          />
          <q-btn v-else
             rounded
             color="info"
             size="25px"
             to="/auth/login"
             label="Los Geht's"
          />
        </q-parallax>
      </div>
    </div>
    <div class="row justify-center gt-sm">
      <div  class="text-white col-12">
        <q-parallax :height="800"
          src="../assets/Raclette.jpg"
          style="width: 100%;"
        >
          <h1 class="text-white">RaclettOrg</h1>
          <q-btn v-if="$store.state.auth.isAuthenticated"
            rounded
            color="info"
            size="30px"
            to="/Home"
            label="Los Geht's"
          />
          <q-btn v-else
            rounded
            color="info"
            size="30px"
            to="/auth/login"
            label="Los Geht's"
          />
        </q-parallax>
      </div>
    </div>
    <div class="q-pa-md  bg-negative">
      <div class="row justify-center" >

        <div class="col col-auto text-center">
          <h5>Deine App zum Organisieren von Raclette-Abenden mit deinen Freunden</h5>
          <div>
            <q-chip size="lg" icon="bookmark">
              Lade deine Freunde ein
            </q-chip>
          </div>
          <div class="q-py-sm">
            <q-chip size="lg" icon="bookmark">
              Organisiert euer Event
            </q-chip>
          </div>
          <div>
            <q-chip size="lg" icon="bookmark">
              Genießt euer Raclette
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
        <div class="q-pa-md text-h5 text-center text-weight-medium">
          Lade deine Freunde ein, um gemeinsam ein Raclette-Abend zu planen.
        </div>
        <div class="q-pa-md text-h6 text-weight-regular">
          Dafür kannst du ganz einfach Gruppen erstellen und deine Freune mithilfe ihres Nutzernamens hinzufügen. Dann kann es mit dem Organisieren schon direkt losgehen.
        </div>
      </div>
    </div>

    <div class="row col-md-12 gt-sm bg-primary">
      <div class="col-6 col-md-6 vertical-middle">
        <div class="q-pa-md text-h5 text-center text-weight-medium">
          Lade deine Freunde ein, um gemeinsam ein Raclette-Abend zu planen.
        </div>
        <div class="q-pa-md text-h6 text-weight-regular">
          Dafür kannst du ganz einfach Gruppen erstellen und deine Freune mithilfe ihres Nutzernamens hinzufügen. Dann kann es mit dem Organisieren schon direkt losgehen.
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

    <div class="row lt-md">
      <div class="col-12">
        <q-parallax :height="300" :speed="0.5">
          <template v-slot:media>
            <img src="../assets/organize.jpg">
          </template>

          <h1 class="text-white">Organize</h1>
        </q-parallax>
      </div>
      <div class="col-12">
        <div class="q-pa-md text-h5 text-center text-weight-medium">
          Organisiert euren Raclette-Abend, so dass jeder das hat was er will und braucht!
        </div>
        <div class="q-pa-md text-h6 text-weight-regular">
          Sind wir mal ehrlich, wen hat es noch nie gestört, dass beim Raclette genau das fehlt, das man extra dabei haben wollte. Damit ist jetzt Schluss!
          Jetzt kann jeder angeben, was man gerne essen würde und was man mitbringt. Damit ist auch endlich Schluss mit den ganzen Dopplungen und Überresten.
        </div>
      </div>
    </div>
    <div class="row gt-sm">
      <div class="col-6">
        <q-parallax :height="300" :speed="0.5">
          <template v-slot:media>
            <img src="../assets/organize.jpg">
          </template>

          <h1 class="text-white">Organize</h1>
        </q-parallax>
      </div>
      <div class="col-6">
        <div class="q-pa-md text-h5 text-center text-weight-medium">
          Organisiert euren Raclette-Abend, so dass jeder das hat was er will und braucht!
        </div>
        <div class="q-pa-md text-h6 text-weight-regular">
          Sind wir mal ehrlich, wen hat es noch nie gestört, dass beim Raclette genau das fehlt, das man extra dabei haben wollte. Damit ist jetzt Schluss!
          Jetzt kann jeder angeben, was man gerne essen würde und was man mitbringt. Damit ist auch endlich Schluss mit den ganzen Dopplungen und Überresten.
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
        <div class="q-pa-md text-h5 text-center text-weight-medium">
          Jetzt muss nur noch eingekauft werden und der Raclette-Abend kann beginnen!
        </div>
        <div class="q-pa-md text-h6 text-weight-regular">
          Genießt euer Raclette und habt einen schönen Abend! Den genau das wollen wir mit RaclettOrg erreichen.
          Vielleicht wird ja direkt der nächste Raclette-Abend geplant ;)
        </div>
      </div>
    </div>

    <div class="row gt-sm bg-primary">
      <div class="col-6">
        <div class="q-pa-md text-h5 text-center text-weight-medium">
          Jetzt muss nur noch eingekauft werden und der Raclette-Abend kann beginnen!
        </div>
        <div class="q-pa-md text-h6 text-weight-regular">
          Genießt euer Raclette und habt einen schönen Abend! Den genau das wollen wir mit RaclettOrg erreichen.
          Vielleicht wird ja direkt der nächste Raclette-Abend geplant ;)
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


  </q-page>
</template>

<script>
export default {
name: "PageStart"

}
</script>

<style scoped>

</style>
