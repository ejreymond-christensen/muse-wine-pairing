var recipeName="";
var recipeURL="";
var wineName="";

$(document).ready(function() {
  //Materialize JS specs
  $('.parallax').parallax();
  $('select').material_select();
  $('.modal').modal();
  $(".button-collapse").sideNav();
  $('.button-collapse').sideNav({
    menuWidth: 250, // Default is 300
    draggable: true, // Choose whether you can drag to open on touch screens,
  });

  //Global Variables
  var recipeData = [];
  var getRecipeId;
  var wineList = [];
  var meat;

  //Event Listener for searching
  $("#searchFood").on("click", function() {
    event.preventDefault();
    //Validation to make sure the user selects a meat.
    if ($("#meat").val() === null) {
      validation();
    } else {
      meat = $("#meat").val();
      $('.wineInfo').empty();
      $('.recipePreviewCard').remove();
      var allergies = $("#allergies").val();
      var cuisine = $("#cuisine").val();
      var ingredients = $("#ingredients").val().join("+");
      var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=78251404&_app_key=ae65a091779f9ce10b68bb9d74e5ebdf&q=" + meat + "+" + ingredients + "&maxResult=50&requirePictures=true";
      //Adds the allergy types to API call
      for (var y = 0; y < allergies.length; y++) {
        if (allergies[y] === "gluten") {
          var glutenAdd = "&allowedAllergy[]=393^Gluten-Free";
          queryURL = queryURL + glutenAdd;
        }
        if (allergies[y] === "lactose") {
          var lactoseAdd = "&allowedAllergy[]=396^Dairy-Free";
          queryURL = queryURL + lactoseAdd;
        }
        if (allergies[y] === "nuts") {
          var nutsAdd = "&allowedAllergy[]=395^Tree+Nut-Free&allowedAllergy[]=394^Peanut-Free";
          queryURL = queryURL + nutsAdd;
        }
        if (allergies[y] === "seafood") {
          var seafoodAdd = "&allowedAllergy[]=398^Seafood-Free";
          queryURL = queryURL + seafoodAdd;
        }
      }
      //Adds the cuisine types to API call
      for (var i = 0; i < cuisine.length; i++) {
        var cuisineAdd = "&allowedCuisine[]=cuisine^cuisine-" + cuisine[i];
        queryURL = queryURL + cuisineAdd;
        console.log(queryURL);
      }

      //Hides the Background text after the search button is clicked.
      $("#tempText").addClass("hide", "display: none;");
      getRecipe(queryURL);
      console.log("Query: " + queryURL);
      getWineList();
    }
  });

  // Validation function to make sure a Meat is chosen
  var validation = function() {
    $('#modal5').modal('open');
  };

  //Eventlistener for Next recipe button
  $(document).on("click", ".nextRecipe", function() {
    $('.recipePreviewCard').remove();
    addRecipePreview(recipeData);
  });


  //Function to Get Recipe Preview from Yummly, this is the first API request.
  function getRecipe(queryURL) {

    $.ajax({"url": queryURL, "method": "GET"}).done(function(recipeDataArray) {
      recipeData = recipeDataArray;
      addRecipePreview(recipeData);
    }).fail(function(msg) {
      $("#errorMessage").html("Sorry! We couldn't reach Yummly at this time. Please try back again later.");
      $('#modal4').modal('open');
    });
  }

  //Function to populate the Recipe preview onto the DOM.
  function addRecipePreview(recipeData) {
    $('.foodCard').empty();
    var randomNumber = Math.floor(Math.random() * recipeData.matches.length);
    var imageURL = (recipeData.matches[randomNumber].smallImageUrls[0]).slice(0, -2) + "500-c";
    getRecipeId = recipeData.matches[randomNumber].id;
    //Constructing the Card
    var cardContents = $('<div class="card recipePreviewCard">');
    var imageSection = $('<div class="card-image waves-effect waves-block waves-light recipePreviewCardImg">');
    imageSection.append('<img class= "recipeImg activator" src="' + imageURL + '">');
    imageSection.append('<a class="btn-floating waves-effect waves-light nextRecipe black"><i class="material-icons">navigate_next</i></a>');
    var textSection = $('<div class="card-content">');
    textSection.append('<div class="card-title activator grey-text text-darken-4 recipeTitle">' + recipeData.matches[randomNumber].recipeName + '</div>');
    textSection.append('<div class="grey-text text-darken-4 recipeSource">' + recipeData.matches[randomNumber].sourceDisplayName.toUpperCase() + '</div>');
    textSection.append('<div class= "yummlyAttr">' + recipeData.attribution.html + '</div>');
    var cardReveal = $('<div class="card-reveal">');
    cardReveal.append('<div class="mainReveal">');
    cardReveal.append('<div class="card-action right-align" id="cardAction">');
    cardContents.append(imageSection);
    cardContents.append(textSection);
    cardContents.append(cardReveal);
    $(".foodCard").prepend(cardContents);
    newRecipe();
  }

  //Function to Get Specific Recipe Info from Yummly, this is the second API request.
  function newRecipe() {

    var queryURL = "https://api.yummly.com/v1/api/recipe/" + getRecipeId + "?_app_id=78251404&_app_key=ae65a091779f9ce10b68bb9d74e5ebdf";
    $.ajax({"url": queryURL, "method": "GET"}).done(function(response) {
      console.log(response.name);
      recipeName= response.name;
      recipeURL= response.source.sourceRecipeUrl;
      $(".mainReveal").empty();
      $(".card-action").empty();
      $(".mainReveal").append('<span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i>' + response.name + '</span>');
      $(".mainReveal").append('<div><span class="strong recipeSmall left-align">Rating: ' + response.rating + '</span><span class="strong right recipeSmall">Total Time: ' + response.totalTime + '</span></div>');
      $(".mainReveal").append('<div><span class="strong right recipeSmall">Servings: ' + response.numberOfServings + '</span></div>');
      $(".mainReveal").append('<div class="strong left-align">Ingredients</div>');
      var ingredientsList = $('<ul class="ingredientList left-align">');
      //Loops through the ingredients to add to the API query
      for (var i = 0; i < response.ingredientLines.length; i++) {
        ingredientsList.append("<li>" + response.ingredientLines[i] + "</li>");
      }
      $(".mainReveal").append(ingredientsList);
      $(".card-action").append('<a class="waves-effect waves-light btn sourceRecipeBtn right-align" href="' + response.source.sourceRecipeUrl + '" target="_blank"><i class="material-icons right">restaurant_menu</i> Read Directions</a>');
      $(".card-action").prepend('<span class="tooltip saveRecipeBtn" active="true"><a class="btn-floating btn-medium waves-effect waves-light red"><i class="material-icons">add</i></a><span class="tooltiptext">Save recipe</span></span>');
      console.log(queryURL);
    }).fail(function(msg) {
      $("#errorMessage").html("Sorry! We couldn't reach Yummly at this time. Please try back again later.");
      $('#modal4').modal('open');
    });
  }

  //Function that populates the Wine info onto the DOM
  function showWineOptions() {
    //generates random number so the same wines aren't shown every time
    var randomNumber = Math.floor(Math.random() * (wineList.wines.length -3));
    var typeWine;
    if (wineList.wines[randomNumber].type === "") {
      typeWine = "Red Wine";
    } else {
      typeWine = wineList.wines[randomNumber].type;
    }
    // generates wine info when you click option one
    $(document).on('click', '#tab1', function() {
      $('.wineInfo').empty();
      $('.wineInfo').append('<span class="tooltip1 saveWineBtn1"><a class="btn-floating btn-medium waves-effect waves-light red"><i class="material-icons">add</i></a><span class="tooltiptext1">Save wine</span></span>');
      $('.wineInfo').append('<p><u><b>Price</b></u>: ' + wineList.wines[randomNumber].price + '</p>');
      $('.wineInfo').append('<p><u><b>Year</b></u>: ' + wineList.wines[randomNumber].vintage + '</p>');
      $('.wineInfo').append('<p><u><b>Type</b></u>: ' + typeWine + '</p>');
      $('.wineInfo').append('<p><u><b>Winery</b></u>: ' + wineList.wines[randomNumber].winery + '</p>');
      $('.wineInfo').append('<p><u><b>varietal</b></u>: ' + wineList.wines[randomNumber].varietal + '</p>');
      $('.wineInfo').append('<p><u><b>Region</b></u>: ' + wineList.wines[randomNumber].region + '</p>');
    });
    // generates wine info when you click option 2
    $(document).on('click', '#tab2', function() {
      $('.wineInfo').empty();
      $('.wineInfo').append('<span class="tooltip1 saveWineBtn2"><a class="btn-floating btn-medium waves-effect waves-light red"><i class="material-icons">add</i></a><span class="tooltiptext1">Save wine</span></span>');
      $('.wineInfo').append('<p><u><b>Price</b></u>: ' + wineList.wines[randomNumber + 1].price + '</p>');
      $('.wineInfo').append('<p><u><b>Year</b></u>: ' + wineList.wines[randomNumber + 1].vintage + '</p>');
      $('.wineInfo').append('<p><u><b>Type</b></u>: ' + typeWine + '</p>');
      $('.wineInfo').append('<p><u><b>Winery</b></u>: ' + wineList.wines[randomNumber + 1].winery + '</p>');
      $('.wineInfo').append('<p><u><b>varietal</b></u>: ' + wineList.wines[randomNumber + 1].varietal + '</p>');
      $('.wineInfo').append('<p><u><b>Region</b></u>: ' + wineList.wines[randomNumber + 1].region + '</p>');
    });
    // generates wine info when you click option 3
    $(document).on('click', '#tab3', function() {
      $('.wineInfo').empty();
      $('.wineInfo').append('<span class="tooltip1 saveWineBtn3"><a class="btn-floating btn-medium waves-effect waves-light red"><i class="material-icons">add</i></a><span class="tooltiptext1">Save wine</span></span>');
      $('.wineInfo').append('<p><u><b>Price</b></u>: ' + wineList.wines[randomNumber + 2].price + '</p>');
      $('.wineInfo').append('<p><u><b>Year</b></u>: ' + wineList.wines[randomNumber + 2].vintage + '</p>');
      $('.wineInfo').append('<p><u><b>Type</b></u>: ' + typeWine + '</p>');
      $('.wineInfo').append('<p><u><b>Winery</b></u>: ' + wineList.wines[randomNumber + 2].winery + '</p>');
      $('.wineInfo').append('<p><u><b>varietal</b></u>: ' + wineList.wines[randomNumber + 2].varietal + '</p>');
      $('.wineInfo').append('<p><u><b>Region</b></u>: ' + wineList.wines[randomNumber + 2].region + '</p>');
    });

    //initial wine info for option 1
    $('.wineInfo').append('<span class="tooltip1 saveWineBtn1"><a class="btn-floating btn-medium waves-effect waves-light red"><i class="material-icons">add</i></a><span class="tooltiptext1">Save wine</span></span>');
    $('.wineInfo').append('<p><u><b>Price</b></u>: ' + wineList.wines[randomNumber].price + '</p>');
    $('.wineInfo').append('<p><u><b>Year</b></u>: ' + wineList.wines[randomNumber].vintage + '</p>');
    $('.wineInfo').append('<p><u><b>Type</b></u>: ' + typeWine + '</p>');
    $('.wineInfo').append('<p><u><b>Winery</b></u>: ' + wineList.wines[randomNumber].winery + '</p>');
    $('.wineInfo').append('<p><u><b>varietal</b></u>: ' + wineList.wines[randomNumber].varietal + '</p>');
    $('.wineInfo').append('<p><u><b>Region</b></u>: ' + wineList.wines[randomNumber].region + '</p>');
    $('#test1').text(wineList.wines[randomNumber].name);
    $('#test2').text(wineList.wines[randomNumber + 1].name);
    $('#test3').text(wineList.wines[randomNumber + 2].name);

    $('.wineCard').removeAttr('hidden');
  }

  //Wine pairing function and Snooth Wine API call
  function getWineList() {
    var wineType = "";
    //Wine pairing function
    if (meat === "beef" || meat === "pork" || meat === "lamb" || meat === "duck") {
      wineType = "red";
    } else {
      wineType = "white";
    }

    //Snooth Wine API Function
    var queryURL = "https://api.snooth.com/wines/?akey=mhf90w0jypw8fx3cukga31eas2yinav1c7w0xalhucisslg6&q=" + wineType + "+wine&n=50&xp=30&c=US";
    $.ajax({"url": queryURL, "dataType": "JSON", "method": "GET"}).done(function(wineData) {
      wineList = wineData;
      showWineOptions();
    }).fail(function(msg) {
      $("#errorMessage").html("Sorry! We couldn't reach Snooth Wines at this time. Please try back again later.");
      $('#modal4').modal('open');
    });
  }

  //Eventlistener for the Recipe Box and to propagate all saved recipes and wine.
  $(".recipes").on("click", function() {
    event.preventDefault();
    uidSet();
    userRef.once("value").then(function(snapshot) {
      $(".savedRecipes").empty();
      snapshot.forEach(function(childSnapshot) {
        $(".savedRecipes").append("<div><a href='"+childSnapshot.val().url+"'  target='_blank'>"+childSnapshot.val().name+"</a></div>");
      });
    });
    userRefwine.once("value").then(function(snapshot) {
      $(".savedWines").empty();
      snapshot.forEach(function(childSnapshot) {
        $(".savedWines").append("<div>"+childSnapshot.val().wine+"</div>");
      });
    });
  });
});
