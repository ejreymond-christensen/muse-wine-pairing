$(document).ready(function() {
  $('.parallax').parallax();
  $('select').material_select();
});

$('.tap-target').tapTarget('open');
$('.tap-target').tapTarget('close');

function getRecipe() {
	
	var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=78251404&_app_key=ae65a091779f9ce10b68bb9d74e5ebdf&q=carnitas&requirePictures=true&allowedCuisine[]=cuisine^cuisine-mexican&allowedCuisine[]=cuisine^cuisine-american";
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
	1085624

	var queryURL = "http://api.yummly.com/v1/api/recipe/Grilled-Tomato_-Smoked-Turkey_-and-Muenster-Sandwich-1085624?_app_id=78251404&_app_key=ae65a091779f9ce10b68bb9d74e5ebdf";
	$.ajax({
		"url": queryURL,
		"method": "GET"
	}).then(function(response) {
		console.log(response);
	})
}
//newRecipe();
//getRecipe();
getCocktail();