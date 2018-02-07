$(document).ready(function() {
  $('.parallax').parallax();
  $('select').material_select();
  $('.modal').modal();
  $('#modal1').on('click', function() {
   });
  $('#modal2').on('click', function() {
  });
});

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

  var mealCard= $('<div class="col s7">');
  var cardContents = $('<div class="card recipePreviewCard">');
  var imageSection = $('<div class="card-image waves-effect waves-block waves-light recipePreviewCardImg">');
  imageSection.append('<img class= "recipeImg activator" src="'+imageURL+'">');
  imageSection.append('<a class="btn-floating waves-effect waves-light nextRecipe black"><i class="material-icons">navigate_next</i></a>');
  var textSection = $('<div class="card-content">');
  textSection.append('<div class="card-title activator grey-text text-darken-4 recipeTitle">'+recipeData.matches[randomNumber].recipeName+'</div>');
  textSection.append('<div class= "yummlyAttr">'+recipeData.attribution.html+'</div>');
  var cardReveal = $('<div class="card-reveal">');
  cardReveal.append('<span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i>'+recipeData.matches[randomNumber].recipeName+'</span>');
  cardContents.append(imageSection);
  cardContents.append(textSection);
  cardContents.append(cardReveal);
  mealCard.append(cardContents);
  $('#cardHolder').empty();
  $('#cardHolder').prepend(mealCard);
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
  $("#tempText").addClass("hide", "display: none;");
  getRecipe(queryURL);
  console.log(queryURL);
});


$(document).on("click", ".nextRecipe", function(){
  console.log("coucou");
  addRecipePreview(recipeData);
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


$(document).on("click", ".recipePreviewCardImg" , function(){
  console.log("hola");
  newRecipe();
});

function newRecipe() {

	var queryURL = "http://api.yummly.com/v1/api/recipe/"+getRecipeId+"?_app_id=78251404&_app_key=ae65a091779f9ce10b68bb9d74e5ebdf";
	$.ajax({
		"url": queryURL,
		"method": "GET"
	}).then(function(response) {
		fullRecipeData = response;
    $(".card-reveal").append('<div><span class="strong recipeSmall left-align">Rating: '+response.rating+'</span><span class="strong right recipeSmall">Total Time: '+response.totalTime+'</span></div>');
    $(".card-reveal").append('<div><span class="strong right recipeSmall">Servings: '+response.numberOfServings+'</span></div>');
    $(".card-reveal").append('<div class="strong left-align">Ingredients</div>');
    var ingredientsList= $('<ul class="ingredientList left-align">');
    for (var i = 0; i < response.ingredientLines.length; i++) {
      ingredientsList.append("<li>"+response.ingredientLines[i]+"</li>");
    }
    $(".card-reveal").append(ingredientsList);
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

//newRecipe();
//getRecipe();
getCocktail();
