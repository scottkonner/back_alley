from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Shopping_Cart_Item, User, db
from datetime import datetime


shopping_cart_item_routes = Blueprint('shopping_cart_item', __name__)

## Need to double check urls

##Get all Shopping Cart Items
@shopping_cart_item_routes.route('/')
@login_required
def get_all_shopping_cart_item():
    """
    Query for all shopping cart items.  Should not be necessary.
    """
    shopItems = Shopping_Cart_Item.query.all()
    return jsonify({'Shopping Cart Items': [shopItems.to_dict() for shopItem in shopItems]})

##Get shopping cart item by Id
@shopping_cart_item_routes.route('/<int:id>')
@login_required
def shopping_cart_item_by_id(id):
    """
    Query for a shopping cart item by id and returns that item
    """
    shopItem = Shopping_Cart_Item.query.get(id)
    if shopItem is None:
        return jsonify({"error": "Item not found"}), 404
    return shopItem.to_dict()

#Get all Shopping Cart Items of Current User
@game_routes.route('/current', methods=["GET"])
@login_required
def get_shopping_cart_item_by_current_user():
    shopItems = Shopping_Cart_Item.query.filter(
        Shopping_Cart_Item.user_id == current_user.id,
        ).all()
    return jsonify([shopItem.to_dict() for shopItem in shopItems])

# Edit Shopping Cart Items
@shopping_cart_item_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_shopping_cart_item(id):
    """
    Edit the quantity of an item
    """
    shopItem = Shopping_Cart_Item.query.get(id)
    if shopItem is None:
        return jsonify({"error": "Item not found"}), 404
    data = request.get_json()
    shopItem.quantity = data['quantity']
    db.session.commit()
    return shopItem.to_dict()

# Delete Shopping Cart Item
@shopping_cart_item_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_shopping_cart_item(id):
    """
    Delete Shopping Cart Item
    """
    shopItem = Shopping_Cart_Item.query.get(id)
    if shopItem is None:
        return jsonify({'error': "Item not found"}), 404
    db.session.delete(shopItem)
    db.session.commit()
    return jsonify({"success": "Item was removed from your shopping cart"}), 200
