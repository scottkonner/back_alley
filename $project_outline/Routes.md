# `Discord-Clone`

## Database Schema Design

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required",
      "statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

### Get all Users

Returns user_id, username, avatar, and status of all users

* Request
  * Method: "GET"
  * URL: "/api/users
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "username": "JSmith",
      "avatar": "FakeURL.com",
      "status": "Online",
    },
    {
      "user_id": 2,
      "username": "Dkimball",
      "avatar": "coolpicURL.com",
      "status": "offline",
    }
   ```


* Error response:
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "No users found",
      "statusCode": 404,
    }
    ```

  * Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```



### Get the Current User

Returns the information about the current user that is logged in.

* Request
  * Method: "GET"
  * URL: "/api/users/:userId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "username": "JSmith",
      "email": "john.smith@gmail.com",
      "avatar": "FakeURL.com",
      "status": "Online",
      "createdAt": "2021-11-19 20:39:36"
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Request
  * Method: "POST"
  * URL: "/api/login
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "john.smith@gmail.com",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "email": "john.smith@gmail.com",
      "username": "JohnSmith",
      "avatar": "FakeURL.com",
      "status": "Online",
      "token": ""
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials",
      "statusCode": 401
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Request
  * Method: "POST"
  * URL: "/api/signup
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "username": "JSmith",
      "password": "password",
      "email": "john.smith@gmail.com",
      "avatar": "FakeURL.com"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "username": "JSmith",
      "password": "password",
      "email": "john.smith@gmail.com",
      "avatar": "FakeURL.com",
      "token": ""
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "username": "Username is required",
        "password": "Password is required",
        "email": "Invalid email",
        "avatar": "An image URL is required"
      }
    }
    ```

    ### Get user by id

Returns user_id, username, avatar and status of user by id

* Request
  * Method: "GET"
  * URL: "/api/users/:userId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "username": "JSmith",
      "avatar": "FakeURL.com",
      "status": "Online",
    }
    ```

* Error response: user not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "user by id not found",
      "statusCode": 404,

    }
    ```
* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

        ### Get user by username

Returns user_id, username, avatar and status of user by id

* Request
  * Method: "GET"
  * URL: "/api/users/:username
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user_id": 1,
      "username": "JSmith",
      "avatar": "FakeURL.com",
      "status": "Online",
    }
    ```

* Error response: user not found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "user by username not found",
      "statusCode": 404,

    }
    ```
* Request: endpoints that require proper authorization
* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403
    }
    ```

## GAMES

### Get all Games

Returns all the games in the database.

* Request
  * Method: "GET"
  * URL: "/api/games
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Games": {
        {
          "id":1,
          "user_id": 1,
          "name": "Video Game 2: Hi-Def",
          "store": "Steam",
          "price": "9.00",
          "icon": "FakeURL.com",
          "createdAt": "2021-11-19 20:39:36",
        },
        {
          "id":2,
          "user_id": 1,
          "name": "Video Game 3: VR",
          "store": "Steam",
          "price": "4.50",
          "icon": "FakeURL.com",
          "createdAt": "2021-11-19 20:39:36",
        },
        {
          "id":3,
          "user_id": 2,
          "name": "Wardcraft Tree: Rain of K-Mart",
          "store": "Steam",
          "price": "4.50",
          "icon": "FakeURL.com",
          "createdAt": "2021-11-19 20:39:36",
        },
      }
    }
    ```

### Get all Games the Current User posed


Returns all the games the current user has posted.

* Request
  * Method: "GET"
  * URL: "/api/games/current
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Games": {
        {
          "id":1,
          "user_id": 1,
          "name": "Video Game 2: Hi-Def",
          "store": "Steam",
          "price": "9.00",
          "icon": "FakeURL.com",
          "createdAt": "2021-11-19 20:39:36",
        },
        {
          "id":2,
          "user_id": 1,
          "name": "Video Game 3: VR",
          "store": "Steam",
          "price": "4.50",
          "icon": "FakeURL.com",
          "createdAt": "2021-11-19 20:39:36",
        },
      }
    }
    ```

### Get Game from Game Id

Returns a game specified by its id.

* Request
  * Method: "GET"
  * URL: "/api/games/:gameId"
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Games": {
        {
          "id":3,
          "user_id": 2,
          "name": "Wardcraft Tree: Rain of K-Mart",
          "store": "Steam",
          "price": "4.50",
          "icon": "FakeURL.com",
          "createdAt": "2021-11-19 20:39:36",
        },
      }
    }
    ```

* Error response: Couldn't find a Game with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Game couldn't be found or does not exist",
      "statusCode": 404
    }
    ```

### Create a Game

Creates and returns a new Game posting.

* Request
  * Method: "POST"
  * URL: "/api/games"
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
        {
          "name": "Video Game 4: Back to Pixels",
          "store": "Epic Store",
          "price": "0.00",
          "icon": "FakeURL.com",
        },
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
        {
          "id":4,
          "user_id": 1,
          "name": "Video Game 4: Back to Pixels",
          "store": "Epic Store",
          "price": "0.00",
          "icon": "FakeURL.com",
          "createdAt": "2021-11-19 20:39:36",
        },

    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
        "store": "Must be a valid store option",
        "price": "Must be a number",
        "icon": "An image URL is required",
      }
    }
    ```

* Error Response: Unauthorized (Must be logged in)
  * Request: endpoints that require proper authorization
  * Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden",
      "statusCode": 403,
    }
    ```

### Edit a Server

Updates and returns an existing Server.

* Require proper authorization: Server must belong to the current user
* Request
  * Method: "PUT"
  * URL: "/api/games/:gameId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
        {
          "name": "Video Game 4: Back to Pixels",
          "store": "Epic Store",
          "price": "5.00",
          "icon": "FakeURL.com",
        },
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
        {
          "id":4,
          "user_id": 1,
          "name": "Video Game 4: Back to Pixels",
          "store": "Epic Store",
          "price": "5.00",
          "icon": "FakeURL.com",
          "createdAt": "2021-11-19 20:39:36",
        },

    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "name": "Name is required",
        "store": "Must be a valid store option",
        "price": "Must be a number",
        "icon": "An image URL is required",
      }
    }
    ```

* Error response:  Only the User with matching user_Id can edit the Game.
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden: Only the original poster can edit the game posting.",
      "statusCode": 403
    }
    ```

* Error response: Couldn't find a Game with specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Game couldn't be found or does not exist",
      "statusCode": 404
    }
    ```

### Delete a Game

Deletes an existing game posting.

* Require proper authorization: Game must belong to the current user
* Request
  * Method: "DELETE"
  * URL: "/api/games/:gameId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response:  Only the User with matching user_Id can delete the Game
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden: Only the original poster can delete this posting",
      "statusCode": 403
    }
    ```

## REVIEWS

### Get Reviews from Game Id

Returns all reviews for a game.

* Request
  * Method: "GET"
  * URL: "/api/users/:userId/reviews/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        {
          "id": 1,
          "user_id": 1,
          "game_id": 1,
          "content": "The game is good",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
    }
    ```

### Get Review from Review id

Returns the selected review.

* Request
  * Method: "GET"
  * URL: "/api/users/:userId/reviews/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        {
          "id": 1,
          "user_id": 1,
          "game_id": 1,
          "content": "The game is good",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
    }
    ```

### Create a new Review

Creates and returns a new review.

* Request
  * Method: "POST"
  * URL: "/api/game/:gameId
  * Body:
    ```json
    {
        "content": "Needs more butter",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        {
          "id": 1,
          "user_id": 1,
          "game_id": 1,
          "content": "Needs more butter",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "content": "Cannot leave an empty review",
      }
    }
    ```

### Edit a Review

Updates and returns an existing Review.

* Request
  * Method: "PUT"
  * URL: "/api/game/:gameId/review/:reviewId
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        "name": "This is a review",
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
        {
          "id": 1,
          "user_id": 1,
          "game_id": 1,
          "content": "This is a review",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36",
        }
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "content": "Cannot leave an empty review",
      }
    }
    ```

* Error response:  Only the review owner can edit the review.
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden: This review can only be editted by its creator",
      "statusCode": 403
    }
    ```

* Error response:  Could not find the review.
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review not found",
      "statusCode": 404
    }
    ```



### Delete a Review

Deletes an existing review.

* Request
  * Method: "DELETE"
  * URL: "/api/games/:gameId/review/:reviewId
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found",
      "statusCode": 404
    }
    ```

* Error response:  Only the Review poster can delete Review
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden: This review can only be deleted by its creator",
      "statusCode": 403
    }
    ```



## SHOPPING CART

### Get all items in Current User's shopping cart

Return all the Shopping Cart Items for the current User.

* Request
  * Method: "GET"
  * URL: "/api/user/:userId/cart"
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Shopping_Cart_Items": {
            {
            "id": 1,
            "user_id": 1,
            "gamer_id": 4,
            "quantity": 3,
            },
            {
            "id": 2,
            "user_id": 1,
            "gamer_id": 7,
            "quantity": 1,
            },
      }
    }
    ```

### Add a new shopping cart item

Add a new item to the shopping cart

* Request
  * Method: "POST"
  * URL: "/api/games/:gameId/cart"
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "quantity": 1
      }
    ```

  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Shopping_Cart_Items": {
            {
            "id": 3,
            "user_id": 3,
            "gamer_id": 44,
            "quantity": 1,
            },
      }
    }
    ```

### Edit a shopping cart item

Edit an item in the shopping cart

* Request
  * Method: "PUT"
  * URL: "/api/user/:userId/cart/:cartId"
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "quantity": 3
      }
    ```

  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Shopping_Cart_Items": {
            {
            "id": 3,
            "user_id": 3,
            "gamer_id": 44,
            "quantity": 3,
            },
      }
    }
    ```

### Delete a shopping cart item

Remove an item in the shopping cart

* Request
  * Method: "DELETE"
  * URL: "/api/user/:userId/cart/:cartId"
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```



## WISHLIST ITEMS

### Get all Items in current User's wishlist

Get all Items in current User's wishlist.

* Request
  * Method: "GET"
  * URL: "/api/user/:userId/wishlist"
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Wishlist_Items": {
        {
          "id": 1,
          "user_id": 1,
          "game_id": 22,
        }
      }
    }
    ```

### Add a new wishlist item

Add a new item to the wish list

* Request
  * Method: "POST"
  * URL: "/api/games/:gameId/wishlist"
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "wished": true
      }
    ```

  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Wishlist_Items": {
            {
            "id": 3,
            "user_id": 3,
            "gamer_id": 44,
            "wished": true,
            },
      }
    }
    ```

### Edit a wishlist item  (ASK ABOUT WHAT THIS SHOULD BE)

Edit an item on the current user's wish list

* Request
  * Method: "PUT"
  * URL: "/api/user/:userId/wishlist"
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
      {
        "wished": true
      }
    ```

  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Wishlist_Items": {
            {
            "id": 3,
            "user_id": 3,
            "gamer_id": 44,
            "wished": true,
            },
      }
    }
    ```

### Remove a wishlist item

Delete a wishlist item

* Request
  * Method: "DELETE"
  * URL: "/api/user/:userId/wishlist/:wishlistId"
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```
