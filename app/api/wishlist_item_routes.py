from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Wishlist_Item, User, db
from datetime import datetime


wishlist_item_routes = Blueprint('wishlist_item', __name__)

## Need to double check urls

##Get all Wishlist Items
@wishlist_item_routes.route('/wishlist')
@login_required
def get_all_wishlist_items():
    """
    Query for all games and return them in a list
    """
    wishItems = Wishlist_Item.query.all()
    return jsonify({'Wishlist Items': [wishItem.to_dict() for wishItem in wishItems]})

##Get Wishlist Item by Id
@wishlist_item_routes.route('/wishlist/<int:id>')
@login_required
def wishlist_item_by_id(id):
    """
    Query for a wishlist item by id and returns that game in a dictionary
    """
    wishItem = Wishlist_Item.query.get(id)
    if wishItem is None:
        return jsonify({"error": "Item not found"}), 404
    return wishItem.to_dict()

#Get all Wishlist Items of Current User
@wishlist_item_routes.route('/users/current/wishlist', methods=["GET"])
@login_required
def get_wishlist_items_by_current_user():
    wishItems = Wishlist_Item.query.filter(
        Wishlist_Item.user_id == current_user.id,
        ).all()
    return jsonify([wishItem.to_dict() for wishItem in wishItems])

# Create Wishlist Item
@wishlist_item_routes.route("/games/<int:gameId>/wishlist", methods = ["POST"])
@login_required
def createWishItem(gameId):
    '''
    Add a new game posting to the wishlist
    '''
    # form = NewWishItem()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    wishItem_post = Wishlist_Item(
        user_id = current_user.id,
        game_id = gameId,
        )
    db.session.add(wishItem_post)
    db.session.commit()
    return wishItem_post.to_dict()
    # return jsonify({'error': 'This form was not validated'})

# Edit Wishlist Item
@wishlist_item_routes.route('/users/current/wishlist/<int:id>', methods=["PUT"])
@login_required
def edit_wishlist_item(id):
    """
    Edit a wishlist item, not entirely sure of purpose just yet
    """
    wishItem = Wishlist_Item.query.get(id)
    if wishItem is None:
        return jsonify({"error": "Item not found"}), 404
    data = request.get_json()
    # game.price = data['price']
    # game.store = data['store']
    # game.updated_at = datetime.utcnow()
    db.session.commit()
    return wishItem.to_dict()

# Delete Game
@wishlist_item_routes.route('/users/current/wishlist/<int:id>', methods=["DELETE"])
@login_required
def delete_wishlist_item(id):
    """
    Delete Wishlist Item
    """
    wishItem = Wishlist_Item.query.get(id)
    if wishItem is None:
        return jsonify({'error': "Item not found"}), 404
    db.session.delete(wishItem)
    db.session.commit()
    return jsonify({"success": "The item was removed from your wishlist"}), 200
