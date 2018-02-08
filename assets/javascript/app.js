$(document).ready(function() {
  $('.parallax').parallax();
  $('select').material_select();
  $('.modal').modal();
  $(".button-collapse").sideNav();
  $('#modal1').on('click', function() {
   });
  $('#modal2').on('click', function() {
  });
});

$('.button-collapse').sideNav({
     menuWidth: 255, // Default is 300
     draggable: true, // Choose whether you can drag to open on touch screens,
   }
 );

var recipeData=[];
var getRecipeId;



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
  var randomNumber= Math.floor(Math.random() * recipeData.matches.length);

  var imageURL = (recipeData.matches[randomNumber].smallImageUrls[0]).slice(0,-2)+"500-c";
  getRecipeId = recipeData.matches[randomNumber].id;

  var mealCard= $('<div class="col s12 m5 l5 offset-m3 offset-l3">');
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
  mealCard.append(cardContents);
  $('#cardHolder').empty();
  $('#cardHolder').prepend(mealCard);
  newRecipe();
}


$("#searchFood").on("click", function(){
  event.preventDefault();
  var meat;
  var allergies=$("#allergies").val();
  if ($("#meat").val() === null) {
    meat= "beef, lamb, pork";
  }else{
    meat= $("#meat").val();}


  var cuisine= $("#cuisine").val();
  var ingredients= $("#ingredients").val().join("+");
  console.log("ingredients"+ $("#ingredients").val());
  var queryURL = "https://api.yummly.com/v1/api/recipes?_app_id=78251404&_app_key=ae65a091779f9ce10b68bb9d74e5ebdf&q="+meat+"+"+ingredients+"&maxResult=50&requirePictures=true";

  for (var i = 0; i < cuisine.length; i ++){
   var cuisineAdd = "&allowedCuisine[]=cuisine^cuisine-" + cuisine[i];
   queryURL= queryURL+cuisineAdd;
   console.log(queryURL);

   }
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

 //Hides the Background text after the search button is clicked.
  $("#tempText").addClass("hide", "display: none;");
  getRecipe(queryURL);
  console.log("Query: "+queryURL);
});


$(document).on("click", ".nextRecipe", function(){
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




//  $(".cardReveal").append('<p><span class="strong">Source:</span> '+fullRecipeData.rating+'</p>');

  // textSection.append('<p><span class="strong">Rating:</span> '+recipeData.matches[randomNumber].rating+'</p>');
  // var ingredientsList= $('<ul class="previewList">');
  // for (var i = 0; i < 4; i++) {
  //   if (recipeData.matches[randomNumber].ingredients[i] != undefined) {
  //     ingredientsList.append("<li>"+recipeData.matches[randomNumber].ingredients[i]+"</li>");
  //   }
  // }
  // ingredientsList.append("<li>click recipe image to see full recipe...</li>");
  // textSection.append('<p class="strong" >Ingredients:</p>');
  // textSection.append(ingredientsList);

function getWineList() {
  var apiKey = "mhf90w0jypw8fx3cukga31eas2yinav1c7w0xalhucisslg6";
  //var wineSearch = ;

  var queryURL = "http://api.snooth.com/wines/?akey=mhf90w0jypw8fx3cukga31eas2yinav1c7w0xalhucisslg6&q=red+wines";
  $.ajax({
    "url": queryURL,
    "dataType": "JSON",
    "method": "GET"
  }).then(function(wineList) {
    console.log(wineList);


  });
}

function getWine() {
  var apiKey = "mhf90w0jypw8fx3cukga31eas2yinav1c7w0xalhucisslg6";
  //var wineId = ;

  var queryURL = "http://api.snooth.com/wine/?akey=mhf90w0jypw8fx3cukga31eas2yinav1c7w0xalhucisslg6&id=the-little-penguin-chardonnay-premier-2010&food=1";
  $.ajax({
    "url": queryURL,
    "dataType": "JSON",
    "method": "GET"
  }).then(function(wineList) {
    console.log(wineList);


  });
}

getWineList();
getWine();


//newRecipe();
//getRecipe();
