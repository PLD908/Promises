// PROMISES
// 3 states of promises
// processing state also pending state
// fulfilled or resolved state
// Reject state

// let myPromise = new Promise(function(resolve, reject) {
//     console.log("myPromise is here");
// });

// const matchWon = true;
// let checkScore = new Promise(function(resolve, reject) {
//     if (matchWon) {
//         resolve("Your team won")
//     } else {
//         reject("Your team lost the match")
//     };
// });
// console.log(checkScore);

// let scoreCheck = new Promise((resolve, reject) => {
//     resolve("We Won");
//     // reject("We lost");
// });

// scoreCheck
// .then(function wonMatch(matchResult) {
//     console.log(matchResult);
// })
// .catch(function wonMatchB(lost) {
//     console.log(lost)
// })
// .finally(function done() {
//     console.log("We are done with promise in practical")
// });

fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("NETWORK RESPONSE ERROR");
        }
    })
    .then((data) => {
        console.log(data);
        displayCocktail(data);
    })
    .catch((error) => console.error("FETCH ERROR:", error));

function displayCocktail(data) {
    const cocktail = data.drinks[0];
    const cocktailDiv = document.getElementById('cocktail');
    const cocktailName = cocktail.strDrink;
    const heading = document.createElement('h1');
    heading.innerHTML = cocktailName;
    cocktailDiv.appendChild(heading);

    // add image of the drink
    const cocktailImg = document.createElement('img');
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailDiv.appendChild(cocktailImg);
    document.body.style.backgroundImage = "url('" + cocktail.strDrinkThumb + "')";

    // ingredient
    const cocktailIngredients = document.createElement('ul');
    cocktailDiv.appendChild(cocktailIngredients);
    const getIngredients = Object.keys(cocktail)
        .filter(function (ingredient) {
            return ingredient.indexOf("strIngredient") == 0;
        }).reduce(function (ingredients, ingredient) {
            if (cocktail[ingredient] != null) {
                ingredients[ingredient] = cocktail[ingredient];
            }
            return ingredients;
        }, {});
        for (let key in getIngredients){
            let value = getIngredients[key];
            listItem = document.createElement('li');
            listItem.innerHTML = value;
            cocktailIngredients.appendChild(listItem);
        }
};