<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import db from './db'
export default {
  name: 'App',
  async created() {
    const citiesRef = db.collection('Users');
    const snapshot = await citiesRef.get();
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
  }
}
</script>
