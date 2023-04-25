from ..models import db, Message, environment, SCHEMA
from datetime import datetime

wishlist_items = [
    {
        "user_id":1,
        "game_id":1,
    },
    {
        "user_id":1,
        "game_id":2,
    },
    {
        "user_id":1,
        "game_id":3,
    },
    {
        "user_id":2,
        "game_id":2,
    },
]


def seed_games():
    db.session.add_all([Wishlist_Item(**wishlist_item) for wishlist_item in wishlist_items])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.wishlist_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM wishlist_items")

    db.session.commit()
