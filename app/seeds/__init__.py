from flask.cli import AppGroup
from .users import seed_users, undo_users
from .games import seed_games, undo_games
from .reviews import seed_reviews, undo_reviews
from .shopping_cart_items import seed_shopping_cart_items, undo_shopping_cart_items
from .wishlist_items import seed_wishlist_items, undo_wishlist_items

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_games()
        undo_reviews()
        undo_shopping_cart_items()
        undo_wishlist_items()
    seed_users()
    seed_games()
    seed_reviews()
    seed_shopping_cart_items()
    seed_wishlist_items()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_games()
    undo_reviews()
    undo_shopping_cart_items()
    undo_wishlist_items()
