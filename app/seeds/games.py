from ..models import db, Message, environment, SCHEMA
from datetime import datetime

games = [
    {
        "user_id":1,
        "API_id":128,
        "name": "BioShock",
        "store": "Target",
        "price": 5.50,
        "icon": "https://www.gamersgate.com/media/products/profile/107751/180_259.jpg/w90/",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "user_id":1,
        "API_id":129,
        "name": "Red Orchestra 2: Heroes of Stalingrad",
        "store": "Target",
        "price": 5.50,
        "icon": "https://www.gamersgate.com/media/products/profile/89364/180_259.jpg/w90/",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "user_id":2,
        "API_id":130,
        "name": "Renegade Ops",
        "store": "Target",
        "price": 5.50,
        "icon": "https://steamcdn-a.akamaihd.net/steam/apps/99300/capsule_sm_120.jpg?t=1522061011",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "user_id":3,
        "API_id":180,
        "name": "Just Cause 2",
        "store": "Target",
        "price": 5.50,
        "icon": "https://cdn.cloudflare.steamstatic.com/steam/apps/8190/capsule_sm_120.jpg?t=1593180404",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]


def seed_games():
    db.session.add_all([Game(**game) for game in games])
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
            f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM games")

    db.session.commit()
