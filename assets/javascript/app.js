$(document).ready(function() {
  $('.parallax').parallax();
  $('select').material_select();
  $('.modal').modal();
  $(".button-collapse").sideNav();
  $('#modal1').on('click', function() {
   });
  $('#modal2').on('click', function() {
  });
  $('#modal3').on('click', function() {
   });
  $('#modal4').on('click', function() {
  });
  $('#modal5').on('click', function() {
  });
});

$('.button-collapse').sideNav({
     menuWidth: 230, // Default is 300
     draggable: true, // Choose whether you can drag to open on touch screens,
   }
 );

var recipeData=[];
var getRecipeId;
var wineList=[];
var meat;
var savedRecipes = ["Chicken Shawarma", "Chick Fil A", "Beef Bugolgi", "Scrambled Eggs"];
var savedWines = ["Slow Press", "Darkhorse", "Casillero del diablo", "barefoot"];



function getRecipe(queryURL) {

	$.ajax({
		"url": queryURL,
		"method": "GET"
	}).then(function(recipeDataArray) {
    recipeData=recipeDataArray;
    addRecipePreview(recipeData);
	});
}
function addRecipePreview(recipeData){
  $('.foodCard').empty();
  var randomNumber= Math.floor(Math.random() * recipeData.matches.length);

  var imageURL = (recipeData.matches[randomNumber].smallImageUrls[0]).slice(0,-2)+"500-c";
  getRecipeId = recipeData.matches[randomNumber].id;

  var cardContents = $('<div class="card recipePreviewCard">');
  var imageSection = $('<div class="card-image waves-effect waves-block waves-light recipePreviewCardImg">');
  imageSection.append('<img class= "recipeImg activator" src="'+imageURL+'">');
  imageSection.append('<a class="btn-floating waves-effect waves-light nextRecipe black"><i class="material-icons">navigate_next</i></a>');
  var textSection = $('<div class="card-content">');
  textSection.append('<div class="card-title activator grey-text text-darken-4 recipeTitle">'+recipeData.matches[randomNumber].recipeName+'</div>');
  textSection.append('<div class="grey-text text-darken-4 recipeSource">'+recipeData.matches[randomNumber].sourceDisplayName.toUpperCase()+'</div>');
  textSection.append('<div class= "yummlyAttr">'+recipeData.attribution.html+'</div>');
  var cardReveal = $('<div class="card-reveal">');
  cardReveal.append('<div class="mainReveal">');
  cardReveal.append('<div class="card-action right-align" id="cardAction">');
  cardContents.append(imageSection);
  cardContents.append(textSection);
  cardContents.append(cardReveal);
  $(".foodCard").prepend(cardContents);
  newRecipe();
}

function showWineOptions() {

  //generates random number so the same wines aren't shown every time
  var randomNumber= Math.floor(Math.random() * wineList.wines.length);
  var typeWine;
  if (wineList.wines[randomNumber].type === "") {
    typeWine = "Red Wine";
  }
  else {
    typeWine = wineList.wines[randomNumber].type;
  }
  // generates wine info when you click option one
  $(document).on('click', '#tab1', function() {
    $('.wineInfo').empty();
    $('.wineInfo').append('<p><u><b>Price</b></u>: '+wineList.wines[randomNumber].price+'</p>');
    $('.wineInfo').append('<p><u><b>Year</b></u>: '+wineList.wines[randomNumber].vintage+'</p>');
    $('.wineInfo').append('<p><u><b>Type</b></u>: '+typeWine+'</p>');
    $('.wineInfo').append('<p><u><b>Winery</b></u>: '+wineList.wines[randomNumber].winery+'</p>');
    $('.wineInfo').append('<p><u><b>varietal</b></u>: '+wineList.wines[randomNumber].varietal+'</p>');
    $('.wineInfo').append('<p><u><b>Region</b></u>: '+wineList.wines[randomNumber].region+'</p>');
  });
  // generates wine info when you clikc option 2
  $(document).on('click', '#tab2', function() {
    $('.wineInfo').empty();
    $('.wineInfo').append('<p><u><b>Price</b></u>: '+wineList.wines[randomNumber+1].price+'</p>');
    $('.wineInfo').append('<p><u><b>Year</b></u>: '+wineList.wines[randomNumber+1].vintage+'</p>');
    $('.wineInfo').append('<p><u><b>Type</b></u>: '+typeWine+'</p>');
    $('.wineInfo').append('<p><u><b>Winery</b></u>: '+wineList.wines[randomNumber+1].winery+'</p>');
    $('.wineInfo').append('<p><u><b>varietal</b></u>: '+wineList.wines[randomNumber+1].varietal+'</p>');
    $('.wineInfo').append('<p><u><b>Region</b></u>: '+wineList.wines[randomNumber+1].region+'</p>');
  });
  // generates wine info when you click option 3
  $(document).on('click', '#tab3', function() {
    $('.wineInfo').empty();
    $('.wineInfo').append('<p><u><b>Price</b></u>: '+wineList.wines[randomNumber+2].price+'</p>');
    $('.wineInfo').append('<p><u><b>Year</b></u>: '+wineList.wines[randomNumber+2].vintage+'</p>');
    $('.wineInfo').append('<p><u><b>Type</b></u>: '+typeWine+'</p>');
    $('.wineInfo').append('<p><u><b>Winery</b></u>: '+wineList.wines[randomNumber+2].winery+'</p>');
    $('.wineInfo').append('<p><u><b>varietal</b></u>: '+wineList.wines[randomNumber+2].varietal+'</p>');
    $('.wineInfo').append('<p><u><b>Region</b></u>: '+wineList.wines[randomNumber+2].region+'</p>');
  });

  //initial wine info for option 1
  $('.wineInfo').append('<p><u><b>Price</b></u>: '+wineList.wines[randomNumber].price+'</p>');
  $('.wineInfo').append('<p><u><b>Year</b></u>: '+wineList.wines[randomNumber].vintage+'</p>');
  $('.wineInfo').append('<p><u><b>Type</b></u>: '+typeWine+'</p>');
  $('.wineInfo').append('<p><u><b>Winery</b></u>: '+wineList.wines[randomNumber].winery+'</p>');
  $('.wineInfo').append('<p><u><b>varietal</b></u>: '+wineList.wines[randomNumber].varietal+'</p>');
  $('.wineInfo').append('<p><u><b>Region</b></u>: '+wineList.wines[randomNumber].region+'</p>');
  $('#test1').text(wineList.wines[randomNumber].name);
  $('#test2').text(wineList.wines[randomNumber+1].name);
  $('#test3').text(wineList.wines[randomNumber+2].name);


  $('.wineCard').removeAttr('hidden');
}

$(".modalStyle6").on("click", function() {
  showSavedRecipes();
  showSavedWines();
});


function showSavedRecipes() {
  $(".savedRecipes").empty();
  for (var i = 0; i < savedRecipes.length; i++) {
    $(".savedRecipes").append("<tr><td>"+savedRecipes[i]+"</td></tr>");
  }
}
function showSavedWines() {
  $(".savedWines").empty();
  for (var i = 0; i < savedWines.length; i++) {
    $(".savedWines").append("<tr><td>"+savedWines[i]+"</td></tr>");
  }
}


$("#searchFood").on("click", function(){
  event.preventDefault();

  $('.wineInfo').empty();
  $('.recipePreviewCard').remove();
// <<<<<<< Updated upstream
  var allergies=$("#allergies").val();
  var cuisine= $("#cuisine").val();
  var ingredients= $("#ingredients").val().join("+");
  var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=78251404&_app_key=ae65a091779f9ce10b68bb9d74e5ebdf&q="+meat+"+"+ingredients+"&maxResult=50&requirePictures=true";

// =======
//   if ($("#meat").val() === null) {
// //<<<<<<< Updated upstream
//     meat= "beef+pork";
// // =======
// //     meat= "beef+lamb+pork";
// // >>>>>>> Stashed changes
//   }else{
//     meat= $("#meat").val();}


//   var cuisine= $("#cuisine").val();
//   var ingredients= $("#ingredients").val().join("+");
//   console.log("ingredients"+ $("#ingredients").val());
//   var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=78251404&_app_key=ae65a091779f9ce10b68bb9d74e5ebdf&q="+meat+"&"+ingredients+"&maxResult=50&requirePictures=true";

//   for (var i = 0; i < cuisine.length; i ++){
//    var cuisineAdd = "&allowedCuisine[]=cuisine^cuisine-" + cuisine[i];
//    queryURL= queryURL+cuisineAdd;
//    console.log("hi "+queryURL);
// >>>>>>> Stashed changes

   for (var y = 0; y < allergies.length; y++) {
     if(allergies[y] === "gluten"){
       var glutenAdd = "&allowedAllergy[]=393^Gluten-Free";
       queryURL= queryURL+glutenAdd;
     }
     if(allergies[y] === "lactose"){
       var lactoseAdd = "&allowedAllergy[]=396^Dairy-Free";
       queryURL= queryURL+lactoseAdd;
     }
     if(allergies[y] === "nuts"){
       var nutsAdd = "&allowedAllergy[]=395^Tree+Nut-Free&allowedAllergy[]=394^Peanut-Free";
       queryURL= queryURL+nutsAdd;
     }
     if(allergies[y] === "seafood"){
       var seafoodAdd = "&allowedAllergy[]=398^Seafood-Free";
       queryURL= queryURL+seafoodAdd;
     }
  }

  if ($("#meat").val() === null) {
    validation();
  }else{
    meat= $("#meat").val();}

  for (var i = 0; i < cuisine.length; i ++){
    var cuisineAdd = "&allowedCuisine[]=cuisine^cuisine-" + cuisine[i];
    queryURL= queryURL+cuisineAdd;
    console.log(queryURL);
   }

   //Hides the Background text after the search button is clicked.
    $("#tempText").addClass("hide", "display: none;");
    getRecipe(queryURL);
    console.log("Query: "+queryURL);

    getWineList();

});

var validation = function(){
  $('#modal5').modal('open');
};

$(document).on("click", ".nextRecipe", function(){
//<<<<<<< Updated upstream
  $('.recipePreviewCard').remove();
  addRecipePreview(recipeData);

});


function newRecipe() {

	var queryURL = "https://api.yummly.com/v1/api/recipe/"+getRecipeId+"?_app_id=78251404&_app_key=ae65a091779f9ce10b68bb9d74e5ebdf";
	$.ajax({
		"url": queryURL,
		"method": "GET"
	}).then(function(response) {
    $(".mainReveal").empty();
    $(".card-action").empty();
    $(".mainReveal").append('<span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i>'+response.name+'</span>');
    $(".mainReveal").append('<div><span class="strong recipeSmall left-align">Rating: '+response.rating+'</span><span class="strong right recipeSmall">Total Time: '+response.totalTime+'</span></div>');
    $(".mainReveal").append('<div><span class="strong right recipeSmall">Servings: '+response.numberOfServings+'</span></div>');
    $(".mainReveal").append('<div class="strong left-align">Ingredients</div>');
    var ingredientsList= $('<ul class="ingredientList left-align">');
    for (var i = 0; i < response.ingredientLines.length; i++) {
      ingredientsList.append("<li>"+response.ingredientLines[i]+"</li>");
    }
    $(".mainReveal").append(ingredientsList);
    $(".card-action").append('<a class="waves-effect waves-light btn sourceRecipeBtn right-align" href="'+response.source.sourceRecipeUrl+'" target="_blank"><i class="material-icons right">restaurant_menu</i> Read Directions</a>');
    console.log(queryURL);
	});
}



function getWineList() {
  console.log(meat);
  var wineType = "";
  if (meat === "beef" || meat === "pork" || meat === "lamb" || meat === "duck" || meat ==="beef+pork") {
    wineType = "red";
  }
  else {
    wineType = "white";
  }
  console.log(wineType);

  var apiKey = "mhf90w0jypw8fx3cukga31eas2yinav1c7w0xalhucisslg6";
  //var wineSearch = ;

  var queryURL = "http://api.snooth.com/wines/?akey=mhf90w0jypw8fx3cukga31eas2yinav1c7w0xalhucisslg6&q="+wineType+"+wine&n=50&xp=30&c=US";
  console.log(queryURL);
  $.ajax({
    "url": queryURL,
    "dataType": "JSON",
    "method": "GET"
  }).then(function(wineData) {
    console.log(wineData);
    wineList = wineData;
    showWineOptions();


  });
}
