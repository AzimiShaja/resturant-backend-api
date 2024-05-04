export const menu = `<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
<h1 style="text-align: center; color: #333;">Restaurant Menu API</h1>
<div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
    <h2 style="margin-bottom: 10px; color: #666;">Endpoints:</h2>
    <ul style="list-style-type: none; padding: 0;">
        <li style="margin-bottom: 30px;">
            <h3 style="color: #000;">Listing the Menu</h3>
            <strong style="color: #007bff;">METHOD:</strong> GET<br>
            <strong style="color: #007bff;">URL:</strong>/listMeals<br>
            <strong style="color: #007bff;">QUERY PARAMS:</strong> ?is_vegetarian=true , ?is_vegan=true<br>
            <strong style="color: #007bff;">Request Body:</strong> None<br>
            <strong style="color: #007bff;">Response Body:</strong> List of Meals JSON
        </li>
        <li style="margin-bottom: 30px;">
            <h3 style="color: #000;">Getting an Item from Menu</h3>
            <strong style="color: #007bff;">METHOD:</strong> GET<br>
            <strong style="color: #007bff;">URL:</strong> /getMeal<br>
            <strong style="color: #007bff;">QUERY PARAMS:</strong> ?id=1<br>
            <strong style="color: #007bff;">Request Body:</strong> None<br>
            <strong style="color: #007bff;">Response Body:</strong> Meal JSON
        </li>
        <li style="margin-bottom: 30px;">
            <h3 style="color: #000;">Quality Calculation With Ingredient Qualities</h3>
            <strong style="color: #007bff;">METHOD:</strong> POST<br>
            <strong style="color: #007bff;">URL:</strong> /quality<br>
            <strong style="color: #007bff;">BODY:</strong> { meal_id: 1, chicken: "high", rice: "medium", vegetables: "low" }<br>
            <strong style="color: #007bff;">Request Body:</strong> Ingredient Qualities JSON<br>
            <strong style="color: #007bff;">Response Body:</strong> Quality JSON
        </li>
        <li style="margin-bottom: 30px;">
            <h3 style="color: #000;">Price Calculation With Ingredient Qualities</h3>
            <strong style="color: #007bff;">METHOD:</strong> POST<br>
            <strong style="color: #007bff;">URL:</strong> /price<br>
            <strong style="color: #007bff;">BODY:</strong> { meal_id: 1, chicken: "high", rice: "medium", vegetables: "low" }<br>
            <strong style="color: #007bff;">Request Body:</strong> Ingredient Qualities JSON<br>
            <strong style="color: #007bff;">Response Body:</strong> Price JSON
        </li>
        <li style="margin-bottom: 30px;">
            <h3 style="color: #000;">I'm feeling lucky.</h3>
            <strong style="color: #007bff;">METHOD:</strong> POST<br>
            <strong style="color: #007bff;">URL:</strong> /random<br>
            <strong style="color: #007bff;">BODY:</strong> { budget: 100 }<br>
            <strong style="color: #007bff;">Request Body:</strong> Budget JSON<br>
            <strong style="color: #007bff;">Response Body:</strong> Random Meal JSON
        </li>
        <li style="margin-bottom: 30px;">
            <h3 style="color: #000;">Searching For a Meal</h3>
            <strong style="color: #007bff;">METHOD:</strong> GET<br>
            <strong style="color: #007bff;">URL:</strong> /search<br>
            <strong style="color: #007bff;">PARAMS:</strong> query<br>
            <strong style="color: #007bff;">Request Body:</strong> None<br>
            <strong style="color: #007bff;">Response Body:</strong> Filtered Meals JSON
        </li>
        <li>
            <h3 style="color: #000;">Finding the Highest Quality Meal For Given Budget</h3>
            <strong style="color: #007bff;">METHOD:</strong> POST<br>
            <strong style="color: #007bff;">URL:</strong> /findHighest<br>
            <strong style="color: #007bff;">BODY:</strong> { budget: 100, is_vegetarian: false, is_vegan: false }<br>
            <strong style="color: #007bff;">Request Body:</strong> Budget and Dietary Requirements JSON<br>
            <strong style="color: #007bff;">Response Body:</strong> Highest Quality Meal JSON
        </li>
    </ul>
</div>
</div>
`;
