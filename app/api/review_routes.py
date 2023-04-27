from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Review, Game, User, db
from datetime import datetime


review_routes = Blueprint('review', __name__)

## Need to double check urls

##Get all Review
@review_routes.route('/')
@login_required
def get_all_review():
    """
    Query for all review and return them in a list.  Not a lot of use, but may be useful
    """
    reviews = Review.query.all()
    return jsonify({'reviews': [review.to_dict() for review in reviews]})

##Get Review by Id
@review_routes.route('/<int:id>')
@login_required
def review_by_id(id):
    """
    Query for a review by id and returns that review
    """
    review = Review.query.get(id)
    if review is None:
        return jsonify({"error": "Review not found"}), 404
    return review.to_dict()

#Get all Reviews of Current User
@review_routes.route('/current', methods=["GET"])
@login_required
def get_reviews_by_current_user():
    reviews = Review.query.filter(
        Review.user_id == current_user.id,
        ).all()
    return jsonify([review.to_dict() for review in reviews])

#Get all Reviews of Game
@game_routes.route('/current', methods=["GET"])
@login_required
def get_review_by_game(id):
    reviews = Review.query.filter(
        Review.game_id == Game.id,
        ).all()
    return jsonify([review.to_dict() for review in reviews])

# Edit Review
@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_review(id):
    """
    Edit the posting of a Review, should change content
    """
    review = Review.query.get(id)
    if review is None:
        return jsonify({"error": "Review not found"}), 404
    data = request.get_json()
    review.content = data['content']
    review.updated_at = datetime.utcnow()
    db.session.commit()
    return review.to_dict()

# Delete Review
@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):
    """
    Delete Review Posting
    """
    review = Review.query.get(id)
    if review is None:
        return jsonify({'error': "Review not found"}), 404
    db.session.delete(review)
    db.session.commit()
    return jsonify({"success": "Review was deleted"}), 200
