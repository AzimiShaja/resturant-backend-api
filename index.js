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
        res.send(error);
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
// Define endpoint to calculate quality score
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

// server is running
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
