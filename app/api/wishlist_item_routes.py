from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Wishlist_Item, User, db
from datetime import datetime


wishlist_item_routes = Blueprint('wishlist_item', __name__)

## Need to double check urls

##Get all Wishlist Items
@wishlist_item_routes.route('/')
@login_required
def get_all_wishlist_items():
    """
    Query for all games and return them in a list
    """
    wishItems = Wishlist_Item.query.all()
    return jsonify({'Wishlist Items': [wishItem.to_dict() for wishItem in wishItems]})

##Get Game by Id
@game_routes.route('/<int:id>')
@login_required
def game_by_id(id):
    """
    Query for a game by id and returns that game in a dictionary
    """
    game = Game.query.get(id)
    if game is None:
        return jsonify({"error": "Game not found"}), 404
    return game.to_dict()

#Get all Games of Current User
@game_routes.route('/current', methods=["GET"])
@login_required
def get_games_by_current_user():
    games = Game.query.filter(
        Game.user_id == current_user.id,
        ).all()
    return jsonify([game.to_dict() for game in games])

# Edit Game
@game_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_game(id):
    """
    Edit the posting of a Game, should change only price and store
    """
    game = Game.query.get(id)
    if game is None:
        return jsonify({"error": "Game not found"}), 404
    data = request.get_json()
    game.price = data['price']
    game.store = data['store']
    game.updated_at = datetime.utcnow()
    db.session.commit()
    return game.to_dict()

# Delete Game
@game_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_game(id):
    """
    Delete Game Posting
    """
    game = Game.query.get(id)
    if game is None:
        return jsonify({'error': "Game not found"}), 404
    db.session.delete(game)
    db.session.commit()
    return jsonify({"success": "Game posting was deleted"}), 200
