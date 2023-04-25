from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):

    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')))
    content = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='review')
    game = db.relationship('Game', back_populates='review')


    def to_dict(self):
        return {
            'id':self.id,
            'user_id': self.user_id,
            'game_id': self.game_id,
            "content": self.content,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
