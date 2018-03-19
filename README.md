# Muse Recipe and Wine pairing App
Muse - Recipe and Drink app

## Muse of Meals

This is an app that helps users when they need inspiration in the kitchen. The user choose a few specfications and the app will provide a random meal, `via yummly api`, and will pair three wines, `via snooth api`. The user can also save a recipe that looks interesting or that they enjoyed cooking.

## Why Muse?

This app was created to encourage people to cook and enjoy the basic pleasures of life, food and wine. Even the best cooks can have moments where they lack inspiration. This is where Muse stands out, it doesn't bombard you with hundreds of recipes, only one. If you like it, cook it! If not, press the next arrow to try a new recipe.

## How to use Muse

From the landing page click the `Get Started` button. Now you will be taken to the main apps page. In the upper right hand corner, you will find a hamburger icon. This will give you the option to find more info on the app, provide feedback to the developers, log in to your account (or sign out), and view your recipe box.

![buttons image](https://github.com/ejreymond-christensen/muse-wine-pairing/blob/master/assets/imgs/readme/buttons.png)

##### Search Bar

To the left of the screen there is the search panel. The user can fill out fields in whatever way they would like to refine their results. The only required field is the protien section, as it is needed to better refine the wine pairing. When ready click the `Lets Cook` button. On mobile, the side nav will be hidden, just click the search icon to reveal the sidebar.

![sidebar image](https://github.com/ejreymond-christensen/muse-wine-pairing/blob/master/assets/imgs/readme/sidebar.png)

##### Results 

Next, your search results will appear. You will be presented with 1 meal and 3 wine pairings.

![meta image](https://github.com/ejreymond-christensen/muse-wine-pairing/blob/master/assets/imgs/readme/meta.png)

You can get more info on the meal by click the image. This will expand the card contents to show the ingredients and a link to the recipe. If you click on the red addition icon, it will save the recipe into your recipe box, if you are logged in.

![recipe image](https://github.com/ejreymond-christensen/muse-wine-pairing/blob/master/assets/imgs/readme/recipe.png)

If you want to pass on the recipe and get a new suggestion, just click the arrow button on the image of the card:

![next recipe image](https://github.com/ejreymond-christensen/muse-wine-pairing/blob/master/assets/imgs/readme/next.png)

The wine card works the same way, except you are presented three options, which you can navagate through the tabs.
Wines can be added to you recipe box.

##### Recipe Box
If you are logged in and save a recipe or wine it will be saved into your recipe box. To view your recipes you can access it through the menu icon. If you click on the recipe name, it will take you to the recipe page:

![recipe box image](https://github.com/ejreymond-christensen/muse-wine-pairing/blob/master/assets/imgs/readme/recipebox.png)

## How Muse works

Muse works by calling the Yummly and Snooth APIs. Yummly is through two API calls, one to pull a selection of recipes and then another to target the specific recipe details via a recipe ID. Both of these calls are running on the search event. Snooth is run via the protien selection set by the user and a function that determines which type of wines would pair best.

## How to run the program

You can simply go to https://ejreymond-christensen.github.io/muse-wine-pairing/ to go to the landing page. Or you can go to muse-wine-pairing repo and download the repo. Simply open `index.html` in your favorite browser and start cooking.


**Bon Appétit**
