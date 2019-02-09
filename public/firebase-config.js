export class FirebaseConfig {
  constructor() {
    const config = {
      apiKey: "AIzaSyCeYMn9nSf46vC9etTB7nQtKzVfNiahxQ0",
      authDomain: "math-fun-604af.firebaseapp.com",
      databaseURL: "https://math-fun-604af.firebaseio.com",
      projectId: "math-fun-604af",
      storageBucket: "math-fun-604af.appspot.com",
      messagingSenderId: "954428885793"
    };
    firebase.initializeApp(config);
  }
}
