"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
# CORS(api)

@api.route('/user/signup', methods=['POST'])
def sign_up():
    new_email = request.json.get("email", None)
    new_password = request.json.get("password", None)

    user = User(password = new_password, email = new_email)
    db.session.add(user)
    db.session.commit()

@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)

    @api.route("/hello", methods=["GET"])
    @jwt_required()
    def get_hello():

        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)

@api.route('/user/private_page', methods=['GET'])
@jwt_required()
def log_in():

    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.username }), 200