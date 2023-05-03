from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Game, User, db
from datetime import datetime


game_routes = Blueprint('game', __name__)

##Get all Games
@game_routes.route('/')
@login_required
def get_all_games():
    """
    Query for all games and return them in a list
    """
    games = Game.query.all()
    return jsonify({'games': [game.to_dict() for game in games]})

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

## Get Games from SearchBar
@game_routes.route('/')
@login_required
def get_searched_games(query):
    """
    Query for all games based on search request and return them in a list
    """
    games = Game.query.filter(Game.name.ilike(f'%{query}%')).all
    return jsonify({'games': [game.to_dict() for game in games]})
