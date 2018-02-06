$(document).ready(function() {
  $('.parallax').parallax();
  $('select').material_select();
});

var recipeData=[];

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
  var randomNumber= Math.floor(Math.random() * 50);

  var imageURL = (recipeData.matches[randomNumber].smallImageUrls[0]).slice(0,-2)+"500-c";

  var mealCard= $('<div class="col s7">');
  var cardContents = $('<div class="card ">');
  var imageSection = $('<div class="card-image">');
  imageSection.append('<img class= "recipeImg" src="'+imageURL+'">');
  imageSection.append('<span class="card-title">'+recipeData.matches[randomNumber].recipeName+'</span>');
  imageSection.append('<a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>');
  var textSection = $('<div class="card-content">');
  textSection.append('<p>here is some info we bring in from the api</p>');
  textSection.append('<span class= "yummlyAttr">'+recipeData.attribution.html+'</span>');
  cardContents.append(imageSection);
  cardContents.append(textSection);
  mealCard.append(cardContents);
  $('#cardHolder').empty();
  $('#cardHolder').append(mealCard);
}

$("#searchFood").on("click", function(){
  var meat= $("#meat").val();
  var cuisine= $("#cuisine").val();
  var ingredients= $("#ingredients").val().join("+");
  console.log("ingredients"+ $("#ingredients").val());
  var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=78251404&_app_key=ae65a091779f9ce10b68bb9d74e5ebdf&q="+meat+"+"+ingredients+"&maxResult=50&requirePictures=true";

  for (var i = 0; i < cuisine.length; i ++){
   var cuisineAdd = "&allowedCuisine[]=cuisine^cuisine-" + cuisine[i];
   queryURL= queryURL+cuisineAdd;
   console.log(queryURL);

 }

  getRecipe(queryURL);
  console.log(queryURL);
});





function getCocktail() {

	var queryURL = "http://addb.absolutdrinks.com/drinks/whiskey/?apiKey=bd21b634fcff4655b4d00cac83d4af20";
	$.ajax({
		"url": queryURL,
		"method": "GET"
	}).then(function(recipeData) {
		console.log(recipeData);
		console.log(recipeData.matches[0].imageUrlsBySize[90]);
		var imageURL = recipeData.matches[0].smallImageUrls[0];
		console.log(imageURL);
		console.log(imageURL.slice(0,-2)+"500-c");

	});
}
function newRecipe() {

	var queryURL = "http://api.yummly.com/v1/api/recipe/Grilled-Tomato_-Smoked-Turkey_-and-Muenster-Sandwich-1085624?_app_id=78251404&_app_key=ae65a091779f9ce10b68bb9d74e5ebdf";
	$.ajax({
		"url": queryURL,
		"method": "GET"
	}).then(function(response) {
		console.log(response);
	});
}
//newRecipe();
//getRecipe();
getCocktail();
