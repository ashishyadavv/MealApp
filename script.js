    const search = document.getElementById('search_meal');
    var submit = document.getElementById('submit');
    var  random = document.getElementById('random');
    var  mealsEl = document.getElementById('meals');
    var  resultHeading = document.getElementById('result-heading');
    var  single_mealEl = document.getElementById('single-meal');

     
    

// Search meal and fetch from API
function searchMeal(e) {
    e.preventDefault();

    // Clear single meal
    single_mealEl.innerHTML = '';

    //Get search searchBox_value
    const searchBox_value = search.value;
    //console.log(searchBox_value);
    

    

    //check for empty
    if(searchBox_value.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBox_value}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                resultHeading.innerHTML = `<h2>Search results for '${searchBox_value}':</h2>`;

                if(data.meals === null) {
                    resultHeading.innerHTML = `<p>Sorry we can't find your search results. Try something else!<p>`;
                }else {
                    mealsEl.innerHTML = data.meals.map(
                        meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            
                            <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                        `
                    )
                    .join('');
                }
            });

            //Clear search text
            search.value = '';

    }else {
        alert('Please enter a search text');
    }

}

//Fetch meal by ID
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDom(meal);
    });
}

//Fetch random meal from API
function getRandomMeal() {
    //Clear meals and heading
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];

        addMealToDom(meal)
    });
}

// Add meal to DOM
function addMealToDom(meal) {
    const ingredients = [];

    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    single_mealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="heart.png" class="favourtie_img"/>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function getfacourite(e){
    console.log(e)
}

// Event listeners
submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);
document.addEventListener('click',getfacourite);
mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        }else{
            false;
        }
    });

    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
});