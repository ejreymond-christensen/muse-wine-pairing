// //Init firebase
// var config = {
//   apiKey: "AIzaSyC_-2NpiT74E5gHbr_Z_DUJdb6DAF0o4Mg",
//   authDomain: "project1-muse.firebaseapp.com",
//   databaseURL: "https://project1-muse.firebaseio.com",
//   projectId: "project1-muse",
//   storageBucket: "",
//   messagingSenderId: "956691925412"
// };
// firebase.initializeApp(config);
// Initialize Alex Firebase
  var config = {
    apiKey: "AIzaSyA1KzEa4kELGKIu_12yooVZezTKQoCQwrg",
    authDomain: "muse-b52c7.firebaseapp.com",
    databaseURL: "https://muse-b52c7.firebaseio.com",
    projectId: "muse-b52c7",
    storageBucket: "muse-b52c7.appspot.com",
    messagingSenderId: "100496649714"
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
  $(".savedWines").empty();
  $(".savedRecipes").empty();
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
  //TODO Add userlogin
});

// ***** RECIPE BOX FUNCTIONALITY *****

//Global variables to store the unique user ids and firebase node structure
var uid="";
var userRef="";
var userRefwine="";

// This function captures the UID from firebase, needs to be delayed from onload for callback time from google.
var uidSet = function(){
  uid= firebase.auth().currentUser.uid;
  userRef = database.ref("users/" +uid+"/recipes/");
  userRefwine = database.ref("users/" +uid+"/wines/");
};

//Event Listener for recipe add, pushes to firebase.
$(document).on("click", ".saveRecipeBtn", function(){
  event.preventDefault();
  // checks to see if user has saved current recipe
  if ($(this).attr("active") ==="true") {
    uidSet();
    userRef.push({
      name: recipeName,
      url: recipeURL
    });
    //Firebase listener to add the recipe to the DOM
    userRef.once("value").then(function(snapshot) {
      $(".savedRecipes").empty();
      snapshot.forEach(function(childSnapshot) {
        $(".savedRecipes").append("<div><a href='"+childSnapshot.val().url+"' target='_blank'>"+childSnapshot.val().name+"</a></div>");
      });
    });
    $(this).attr("active", "false");
  }
  // lets user know they have already saved current recipe 
  else {
    // Materialize.toast(message, displayLength, className, completeCallback);
    Materialize.toast('Recipe already saved!', 3000) // 4000 is the duration of the toast
  }


});

// Added thre unique wine listeners due to materialize tab structure
//Event Listener for wine add, pushes to firebase.
// keeps track to see if user has saved the wine options 
var savedWine1 = false;
var savedWine2 = false;
var savedWine3 = false;
$(document).on("click", ".saveWineBtn1", function(){
  // checks to see if user has saved current wine option 1
  if (savedWine1 === false) {
    event.preventDefault();
    wineName= $("#test1").text();
    uidSet();
    userRefwine.push({
      wine: wineName,
    });
    //Firebase listener to add the wineList to the DOM
    userRefwine.once("value").then(function(snapshot) {
      $(".savedWines").empty();
      snapshot.forEach(function(childSnapshot) {
        $(".savedWines").append("<div>"+childSnapshot.val().wine+"</div>");
      });
    });
    savedWine1 = true;
  }
  // lets user know they have already saved current wine option
  else {
    // Materialize.toast(message, displayLength, className, completeCallback);
    Materialize.toast('Wine option 1 already saved!', 3000) // 4000 is the duration of the toast
  }
});

//Event Listener for wine add, pushes to firebase.
$(document).on("click", ".saveWineBtn2", function(){
  // checks to see if user has saved current wine option 2
  if (savedWine2 === false) {
    event.preventDefault();
    wineName= $("#test2").text();
    uidSet();
    userRefwine.push({
      wine: wineName,
    });
    //Firebase listener to add the wineList to the DOM
    userRefwine.once("value").then(function(snapshot) {
      $(".savedWines").empty();
      snapshot.forEach(function(childSnapshot) {
        $(".savedWines").append("<div>"+childSnapshot.val().wine+"</div>");
      });
    });
    savedWine2 = true;
  }
  // lets user know they have already saved current wine option
  else {
    // Materialize.toast(message, displayLength, className, completeCallback);
  Materialize.toast('Wine option 2 already saved!', 3000) // 4000 is the duration of the toast
  }
});

//Event Listener for wine add, pushes to firebase.
$(document).on("click", ".saveWineBtn3", function(){
  // checks to see if user has saved current wine option 3
  if (savedWine3 === false) {
    event.preventDefault();
    wineName= $("#test3").text();
    uidSet();
    userRefwine.push({
      wine: wineName,
    });
    //Firebase listener to add the wineList to the DOM
    userRefwine.once("value").then(function(snapshot) {
      $(".savedWines").empty();
      snapshot.forEach(function(childSnapshot) {
        $(".savedWines").append("<div>"+childSnapshot.val().wine+"</div>");
      });
    });
    savedWine3 = true;
  }
  // lets user know they have already saved current wine option
  else {
    // Materialize.toast(message, displayLength, className, completeCallback);
  Materialize.toast('Wine option 3 already saved!', 3000) // 4000 is the duration of the toast
  }
});
// when user gets new wine options they can save new wine options 
$(document).on("click", "#searchFood", function() {
  savedWine1 = false;
  savedWine2 = false;
  savedWine3 = false;
});
