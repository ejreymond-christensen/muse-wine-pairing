//Init firebase
var config = {
  apiKey: "AIzaSyAGEuO9L4cgTyBGEpagy8PTucvFKCqSfYc",
  authDomain: "ut-project1-muse.firebaseapp.com",
  databaseURL: "https://ut-project1-muse.firebaseio.com",
  projectId: "ut-project1-muse",
  storageBucket: "",
  messagingSenderId: "580025468102"
};
firebase.initializeApp(config);

var database = firebase.database();

// Event Listener for Feedback button
$('#text1').on("click", function(event) {
  event.preventDefault();
  var textArea = $("#textarea1").val().trim();
  var name = $("#feedbackName").val().trim();
  var info = {
    "message": textArea,
    "name": name
  };
  firebase.database().ref().push(info);
  $("#textarea1").val("");
  $("#feedbackName").val("");
});

// Feedback push to Firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var textArea = childSnapshot.val().textArea;
  var name = childSnapshot.val().name;
});


// const auth =firebase.auth();
// auth.signInWithEmailAndPassword(email, pass);
// auth.createUserWithEmailAndPassword(email, pass);
// auth.onAuthStateChanged(firebaseUser => {});

const txtEmail = $('#txtEmail');
const txtPassword = $('#txtPassword');
const btnLogin = $('#btnLogin');
const btnSignUp = $('#btnSignUp');
const btnLogOut = $('#btnLogOut');

// Feedback push to Firebase
$("#btnLogin").on('click', e => {
  const email = $("#txtEmail").val();
  const pass = $('#txtPassword').val();
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
  $("#txtEmail").val("");
  $('#txtPassword').val("");
});

//Eventlistener Signup
$('#btnSignUp').on('click', e => {
  const email = $('#txtEmail').val();
  const pass = $('#txtPassword').val();
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
});

//Eventlistener logout
$('#btnLogOut').on('click', e => {
  firebase.auth().signOut();
});

//Firebase authentication
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    $('#btnLogOut').removeClass('hide');
    $('#btnLogin').addClass('hide');
  } else {
    console.log('not logged in');
    $('#btnLogOut').addClass('hide');
    $('#btnLogin').removeClass('hide');
  }

});
