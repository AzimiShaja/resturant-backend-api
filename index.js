import express from "express";
import { data } from "./dataset.js";
const app = express();
const PORT = 3000;

/* list all meals from database
 METHOD: GET
 URL: http://localhost:3000/listmeals
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
        if (is_vegetarian === "true") {
            res.send(vegetarianMeals);
        } else if (is_vegan === "true") {
            res.send(veganMeals);
        } else {
            res.send(data.meals);
        }
    } catch (error) {
        // send error
        res.send(error);
    }
});

// server is running
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
