from .db import db, environment, SCHEMA, add_prefix_for_prod


class Wishlist_Item(db.Model):

    __tablename__ = 'wishlist_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')))


    user = db.relationship('User', back_populates='wishlist_item')
    game = db.relationship('Game', back_populates='wishlist_item')


    def to_dict(self):
        return {
            'id':self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            "User": self.user.to_dict(),
            "Game": self.game.to_dict()
        }
