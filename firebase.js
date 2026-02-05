// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCABbtqMIj24faW1KxJ8M15NhKGIGBod84",
    authDomain: "todoapp-26fef.firebaseapp.com",
    databaseURL: "https://todoapp-26fef-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "todoapp-26fef",
    storageBucket: "todoapp-26fef.firebasestorage.app",
    messagingSenderId: "184621322721",
    appId: "1:184621322721:web:195a8556b87092863242a0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to 'todos' path in Realtime Database
var todosRef = firebase.database().ref("todos");
