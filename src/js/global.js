import {date} from "quasar";
import firebaseService from '../services/firebase'
import {QSpinnerGears} from 'quasar'
/**
 * Get all groups of a given user id
 * @param userId The user id
 * @returns Promise of Array of groups
 */
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
/**
 * Get all events of all groups sorted by the date decending.
 * @param groups The groups to get the events from
 * @returns Promise of events sorted by date
 */
export async function getEventsOfGroups(groups) {
  let allEvents = []
  for (let group of groups) {
    let events = [];
    // Get the reference to the group from the database
    let groupRef = firebaseService.firestore().collection("Groups").doc(group.id);
    // Get the events from the group from the database
    await firebaseService.firestore().collection("Events").where("Group", "==", groupRef).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          events.push(doc);
        });
      });
    // Copy events into array of events of all groups
    for (let event of events) {
      let data = event.data()
      data.id = event.id
      allEvents.push(data)
    }
  }
  // Sort the events by their Date
  return allEvents.sort(function (a, b) {
    return a.DateTime - b.DateTime
  })
}




