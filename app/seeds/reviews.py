from ..models import db, Message, environment, SCHEMA
from datetime import datetime

reviews = [
    {
        "user_id":1,
        "game_id":2,
        "content": "This sure is a game of some kind.  How neat!",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "user_id":2,
        "game_id":3,
        "content": "Test review, don't mind me",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "user_id":3,
        "game_id":2,
        "content": "My name is Pepto-Bismol",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]


def seed_games():
    db.session.add_all([Review(**review) for review in reviews])
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
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
