from ..models import db, Shopping_Cart_Item, environment, SCHEMA
from datetime import datetime

shopping_cart_items = [
    {
        "user_id":1,
        "game_id":4,
        "quantity":1
    },
    {
        "user_id":1,
        "game_id":2,
        "quantity":3
    },
    {
        "user_id":1,
        "game_id":3,
        "quantity":1
    },
    {
        "user_id":2,
        "game_id":2,
        "quantity":1
    },
    {
        "user_id":3,
        "game_id":1,
        "quantity":1
    }
]


def seed_shopping_cart_items():
    db.session.add_all([Shopping_Cart_Item(**shopping_cart_item) for shopping_cart_item in shopping_cart_items])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_shopping_cart_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.shopping_cart_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM shopping_cart_items")

    db.session.commit()
