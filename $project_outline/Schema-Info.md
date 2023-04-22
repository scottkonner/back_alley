# Schema data

## This the schema for back_alley.  This can be copied directly into dbdiagram.io to view more easily.

Table user {
  id integer
  username string
  password string
  email string
  createdAt date
  updatedAt date
  }

Table game {
  id integer
  user_id integer [ref: > user.id]
  API_id integer
  name string
  store string
  price dec
  icon url
  createdAt date
  updatedAt date
}

Table review {
  id integer
  user_id integer [ref: > user.id]
  game_id integer [ref: > game.id]
  content string
  createdAt date
  updatedAt date
}

Table shopping_cart_item {
  id integer
  user_id integer [ref: > user.id]
  game_id integer [ref: > game.id]
  quantity integer
}

Table wishlist_item {
  id integer
  user_id integer [ref: > user.id]
  game_id integer [ref: > game.id]
}
