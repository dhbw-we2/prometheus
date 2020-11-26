import {date} from "quasar";
import firebaseService from '../services/firebase'
import {QSpinnerGears} from 'quasar'

export async function getAllGroupsOfUser(userId) {
  let data = [];
  let userRef = firebaseService.firestore().collection("users").doc(userId);
  await firebaseService.firestore().collection("Groups").where("Users", "array-contains", userRef).get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        data.push(doc);
      });
    });
  return data;
}

export async function getEventsOfGroups(groups) {
  let allEvents = []
  for (let group of groups) {
    let events = [];
    let groupRef = firebaseService.firestore().collection("Groups").doc(group.id);
    await firebaseService.firestore().collection("Events").where("Group", "==", groupRef).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          events.push(doc);
        });
      });
    for (let event of events) {
      let data = event.data()
      data.id = event.id
      allEvents.push(data)
    }
  }
  return allEvents.sort(function (a, b) {
    return a.DateTime - b.DateTime
  })
}




