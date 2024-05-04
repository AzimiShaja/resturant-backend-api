# Restaurant Menu API
This is an Express.js-based API for managing a restaurant menu. It allows you to retrieve menu items, search for meals, calculate meal quality and price, and more.

# Author
I confirm that this application is wrriten by me ```(Ahmad Shaja AZIMI)``` using JavaScript, Node.js, Express.js.

# Setup Instructions

1. Clone the Repository: Clone this repository to your local machine.
2. install ```node``` from https://nodejs.org/en.
3. Install Dependencies: ```Run npm install``` in the project directory to install all the required dependencies.
4. Start the Server: Run ```node index.js``` to start the Express server.

## or 
* just visit https://restaurant-api-app.vercel.app/ to see all the endpooints.
* You can use live website to test the backend server.
<img width="1679" alt="image" src="https://github.com/AzimiShaja/ahmadshaja-azimi-otsimo-internship-task-2024/assets/110715621/b5cbcbd9-88f4-4460-af5e-12359ccc12d2">


# Endpoints
## 1. Get Restaurant Menu

    Endpoint: GET /
    Description: Retrieve the complete list of api's
    Example: https://restaurant-api-app.vercel.app/

## 2. List Meals

    Endpoint: GET /listMeals
    Description: List meals with optional filtering for vegetarian and vegan options.
    Example: /listMeals?is_vegetarian=true

## 3. Get a Meal

    Endpoint: GET /getMeal
    Description: Get details of a specific meal by its ID.
    Example: /getMeal?id=1

## 4. Calculate Quality

    Endpoint: POST /quality
    Description: Calculate the quality score of a meal based on ingredient qualities.
    Example: /quality

## 5. Calculate Price

    Endpoint: POST /price
    Description: Calculate the price of a meal based on ingredient qualities.
    Example: /price

## 6. Random Meal

    Endpoint: POST /random
    Description: Get a random meal, optionally below a certain budget.
    Example: /random

## 7. Search Meals

    Endpoint: GET /search
    Description: Search for meals by name.
    Example: /search?query=chicken

## 8. Find Highest Quality Meal

    Endpoint: POST /findHighest
    Description: Find the highest quality meal below a specified budget.
    Example: /findHighest

# Additional Notes
 This API utilizes JSON format for request and response bodies. Ensure proper error handling is implemented in client applications to handle server responses effectively. For further details on each endpoint, refer to the respective sections in the codebase.
