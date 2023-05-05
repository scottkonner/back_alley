from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Review, Game, User, db
from datetime import datetime


review_routes = Blueprint('review', __name__)

## Need to double check urls

##Get all Review
@review_routes.route('/reviews')
@login_required
def get_all_review():
    """
    Query for all review and return them in a list.  Not a lot of use, but may be useful
    """
    reviews = Review.query.all()
    return jsonify({'reviews': [review.to_dict() for review in reviews]})

##Get Review by Id
@review_routes.route('/reviews/<int:id>')
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
@review_routes.route('/reviews/current', methods=["GET"])
@login_required
def get_reviews_by_current_user():
    reviews = Review.query.filter(
        Review.user_id == current_user.id,
        ).all()
    return jsonify([review.to_dict() for review in reviews])

#Get all Reviews of Game
@game_routes.route('/games/<int:id>/reviews', methods=["GET"])
@login_required
def get_review_by_game(id):
    reviews = Review.query.filter(
        Review.game_id == Game.id,
        ).all()
    return jsonify([review.to_dict() for review in reviews])

#Create a new Review

@review_routes.route("/games/<int:game_id>", methods = ["POST"])
@login_required
def createReview(game_id):
    '''
    Create a new review
    '''
    form = NewReview()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review_post = Review(
            user_id = current_user.id,
            game_id = game_id
            content = form.content.data,
            created_at=datetime.utcnow()
            updated_at=datetime.utcnow()
        )
        db.session.add(review_post)
        db.session.commit()
        return review_post.to_dict()
    return jsonify({'error': 'This form was not validated'})

# Edit Review
@review_routes.route('/games/<int:game_id>/reviews/<int:id>', methods=["PUT"])
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
@review_routes.route('/games/<int:game_id>/reviews/<int:id>', methods=["DELETE"])
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
