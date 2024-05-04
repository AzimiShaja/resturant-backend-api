import express from "express";
import { data } from "./dataset.js";
const app = express();
const PORT = 3000;

app.use(express.json());
/* 
Listing the Menu
METHOD: GET
URL: http://localhost:3000/listMeals
QUERY PARAMS: ?is_vegetarian=true , ?is_vegan=true
*/
app.get("/listMeals", (req, res) => {
    try {
        // check if query params exist
        const { is_vegetarian, is_vegan } = req.query;

        // filter data
        const veganMeals = data.meals.filter((meal) =>
            meal.ingredients.every((ingredient) =>
                data.ingredients.some(
                    ({ name, groups }) => ingredient.name === name && groups.includes("vegan")
                )
            )
        );

        // filter data
        const vegetarianMeals = data.meals.filter((meal) =>
            meal.ingredients.every((ingredient) =>
                data.ingredients.some(
                    ({ name, groups }) =>
                        ingredient.name === name &&
                        (groups.includes("vegetarian") || groups.includes("vegan"))
                )
            )
        );
        // send response
        if (is_vegetarian) res.send(vegetarianMeals);
        else if (is_vegan) res.send(veganMeals);
        else res.send(data.meals);
    } catch (error) {
        // send error
        res.sendStatus(505).json({ error: "Internal server error" });
    }
});

/*
Getting an Item from Menu
METHOD: GET
URL: http://localhost:3000/getMeal
QUERY PARAMS: ?id=1
*/
app.get("/getMeal", (req, res) => {
    try {
        // get query params
        const { id } = req.query;
        // filter data
        const meal = data.meals.find((meal) => meal.id == id);

        if (!meal) {
            return res.status(404).json({ error: "Meal not found" });
        }
        // send response
        res.send(meal);
    } catch (error) {
        // send error
        res.sendStatus(505).json({ error: "Internal server error" });
    }
});

/*
Quality Calculation With Ingredient Qualities
METHOD: POST
URL: http://localhost:3000/quality 
BODY: { meal_id: 1, chicken: "high", rice: "medium", vegetables: "low" }
*/
app.post("/quality", (req, res) => {
    try {
        if (!req.body) res.sendStatus(400).json({ error: "Missing request body" });

        // Retrieve meal ID and ingredient qualities from request body
        const { meal_id, ...ingredientQualities } = req.body;

        // Find the meal in the dataset
        const meal = data.meals.find((meal) => meal.id === parseInt(meal_id));

        if (!meal) {
            return res.status(404).json({ error: "Meal not found" });
        }

        // Calculate the total score for the meal
        let totalScore = 0;

        meal.ingredients.forEach((ingredient) => {
            data.ingredients.forEach((dataIngredient) => {
                if (ingredient.name === dataIngredient.name) {
                    totalScore += getQualityScore(ingredientQualities[dataIngredient.name]);
                }
            });
        });
        totalScore /= meal.ingredients.length;
        // Return the overall quality score as JSON response
        res.json({ quality: totalScore });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: "Internal server error" });
    }
});

/*
Price Calculation With Ingredient Qualities
METHOD: POST
URL: http://localhost:3000/price
BODY: { meal_id: 1, chicken: "high", rice: "medium", vegetables: "low" }
*/
app.post("/price", (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ error: "Missing request body" });

        // Retrieve meal ID and ingredient qualities from request body
        const { meal_id, ...ingredientQualities } = req.body;

        // Find the meal in the dataset
        const meal = data.meals.find((meal) => meal.id === parseInt(meal_id));

        // Check if meal exists
        if (!meal) {
            return res.status(404).json({ error: "Meal not found" });
        }

        // Calculate the total price for the meal
        let totalPrice = 0;
        meal.ingredients.forEach((ingredient) => {
            data.ingredients.forEach((dataIngredient) => {
                if (ingredient.name === dataIngredient.name) {
                    dataIngredient.options.forEach((option) => {
                        if (option.quality === ingredientQualities[dataIngredient.name]) {
                            // Calculate cost for the ingredient based on weight and price
                            let cost = (ingredient.quantity / 1000) * option.price;

                            // Add additional cost for quality degradation
                            if (ingredientQualities[dataIngredient.name] === "low") {
                                cost += 0.1; // Add $0.10 for low quality
                            } else if (ingredientQualities[dataIngredient.name] === "medium") {
                                cost += 0.05; // Add $0.05 for medium quality
                            }

                            totalPrice += cost; // Add calculated cost to the total price
                        }
                    });
                }
            });
        });

        // Return the total price as JSON response
        res.json({ price: totalPrice });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: "Internal server error" });
    }
});

/*
I'm feeling lucky.
METHOD: POST
URL: /random
BODY: { budget: 100 }
*/
app.post("/random", (req, res) => {
    try {
        const { budget } = req.body;
        if (budget === undefined) {
            // Generate a random meal
            const randomMeal = data.meals[Math.floor(Math.random() * data.meals.length)];
            return res.json({ meal: randomMeal });
        } else {
            // Generate a random meal below the budget
            const affordableMeals = data.meals.filter((meal) => calculatePriceOfMeal(meal) <= budget);

            if (affordableMeals.length === 0) {
                return res.status(404).json({ error: "No meal found below the budget" });
            } else {
                const randomMeal = affordableMeals[Math.floor(Math.random() * affordableMeals.length)];
                return res.json({
                    id: randomMeal.id,
                    name: randomMeal.name,
                    price: calculatePriceOfMeal(randomMeal),
                    quality_score: getQualityScore(randomMeal),
                    ingredients: randomMeal.ingredients,
                });
            }
        }
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: "Internal server error" });
    }
});

/*
Searching For a Meal
METHOD: GET
URL: /search
PARAMS: query
*/
app.get("/search", (req, res) => {
    try {
        // get query params
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Missing query parameter" });
        }
        // filter data
        const filteredMeals = data.meals.filter((meal) =>
            meal.name.toLowerCase().includes(query.toLowerCase())
        );
        // send response
        res.send(filteredMeals);
    } catch (error) {
        // send error
        res.sendStatus(505).json({ error: "Internal server error" });
    }
});

/*
Finding the Highest Quality Meal For Given Budget
METHOD: POST
URL: /findHighest
BODY: { budget: 100, is_vegetarian: false, is_vegan: false }
*/
app.post("/findHighest", (req, res) => {
    try {
        const { budget, is_vegetarian = false, is_vegan = false } = req.body;

        if (budget === undefined) {
            return res.status(400).json({ error: "Missing budget parameter" });
        }

        const filteredMeals = data.meals.filter((meal) => {
            if (is_vegetarian && !is_vegan) {
                return (
                    calculatePriceOfMeal(meal) <= budget &&
                    meal.ingredients.every((ingredient) =>
                        data.ingredients.some(
                            ({ name, groups }) => ingredient.name === name && groups.includes("vegetarian")
                        )
                    )
                );
            } else if (is_vegan && !is_vegetarian) {
                return (
                    calculatePriceOfMeal(meal) <= budget &&
                    meal.ingredients.every((ingredient) =>
                        data.ingredients.some(
                            ({ name, groups }) => ingredient.name === name && groups.includes("vegan")
                        )
                    )
                );
            } else {
                return calculatePriceOfMeal(meal) <= budget;
            }
        });

        if (filteredMeals.length === 0) {
            return res
                .status(404)
                .json({ error: "No meal found below the budget or with the specified criteria" });
        }

        const highestQualityMeal = filteredMeals.reduce((a, b) => {
            return getQualityScore(a) > getQualityScore(b) ? a : b;
        });

        res.json({
            id: highestQualityMeal.id,
            name: highestQualityMeal.name,
            price: calculatePriceOfMeal(highestQualityMeal),
            quality_score: getQualityScore(highestQualityMeal),
            ingredients: highestQualityMeal.ingredients,
        });
    } catch (error) {
        // Handle errors
        res.status(500).json({ error: "Internal server error" });
    }
});

// server is running
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

// Function to get the score for the quality level
function getQualityScore(qualityLevel) {
    switch (qualityLevel) {
        case "low":
            return 5;
        case "medium":
            return 10;
        case "high":
            return 20;
        default:
            return 20;
    }
}
function calculatePriceOfMeal(meal) {
    let totalPrice = 0;
    meal.ingredients.forEach((ingredient) => {
        data.ingredients.forEach((dataIngredient) => {
            if (ingredient.name === dataIngredient.name) {
                dataIngredient.options.forEach((option) => {
                    totalPrice += option.price;
                });
            }
        });
    });
    return totalPrice;
}
