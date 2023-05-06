from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Game(db.Model):

    __tablename__ = 'games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    API_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    store = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float(6), nullable=False)
    icon = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='game')
    review = db.relationship('Review', back_populates='game', cascade='all, delete-orphan')
    wishlist_item = db.relationship('Wishlist_Item', back_populates='game', cascade='all, delete-orphan')
    shopping_cart_item = db.relationship('Shopping_Cart_Item', back_populates='game', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'id':self.id,
            'user_id': self.user_id,
            'API_id': self.API_id,
            "name": self.name,
            'store': self.store,
            'price': self.price,
            "icon": self.icon,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
