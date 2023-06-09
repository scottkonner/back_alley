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

#Create a new Game posting

# The info coming in from the cheap shark API needed for highlighted things
@game_routes.route("/", methods = ["POST"])
@login_required
def createGame():
    '''
    Create a new game posting
    '''
    # form = NewGame()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    data = request.get_json()
    game_post = Game(
        user_id = current_user.id,
        API_id = data['API_id'],
        name = data['name'],
        price = data['price'],
        store = data['store'],
        icon = data['icon'],
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.session.add(game_post)
    db.session.commit()
    return game_post.to_dict()
    # return jsonify({'error': 'This form was not validated'})

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
@game_routes.route('/search')
@login_required
def get_searched_games():
    """
    Query for all games based on search request and return them in a list
    """
    search = request.args.get('q').lower()
    games = Game.query.all()

    return jsonify({'games': [game.to_dict() for game in games if search in game.name.lower()]})
