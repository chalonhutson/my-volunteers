import os
import random

from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token, current_user

from ..extensions import db
from ..api_models import login_model, volunteer_note_model
from ..models import User, Volunteer, Event, Phone, Email, VolunteerNote, VolunteerEventInvite

from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request

import cloudinary
import cloudinary.uploader
import cloudinary.api

from uuid import uuid4

cloudinary.config(
    cloud_name=os.environ["CLOUDINARY_NAME"],
    api_key=os.environ["CLOUDINARY_API_KEY"],
    api_secret=os.environ["CLOUDINARY_API_SECRET"]
)

authorizations = {
    "jsonWebToken": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
    }
}

ns = Namespace("api", authorizations=authorizations)


""" Create new user. """
@ns.route("/users")
class Users(Resource):

    def post(self):
        print("triggered")
        email = ns.payload["email"]
        password = ns.payload["password"]

        if User.query.filter_by(email=email).first():
            return {"res": "User already exists"}, 409

        user = User(email, password)
        db.session.add(user)
        db.session.commit()

        return {"res": "User created successfully"}, 201


""" Authenticate a user and return an access token. """
@ns.route("/login")
class Login(Resource):

    @ns.expect(login_model)
    def post(self):
        email = ns.payload["email"]
        password = ns.payload["password"]

        user = User.query.filter_by(email=email).first()

        if user is None or not user.check_password(password):
            return {"res": "Invalid username or password"}, 401

        # return {"access_token": create_access_token(identity=user.email), "email": email}
        return {"access_token": create_access_token(user)}

@ns.route("/users/change-password")
class ChangePassword(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def put(self):
        # user = User.query.filter_by(email=get_jwt_identity()).first()

        current_password = ns.payload["current_password"]
        new_password = ns.payload["new_password"]

        if not current_user.check_password(current_password):
            return {"res": "Invalid current password"}, 401

        current_user.password_hash = generate_password_hash(ns.payload["new_password"])
        db.session.commit()

        print("Password changed.")

        return {"res": "Password changed successfully"}, 200

@ns.route("/users/change-email")
class ChangeEmail(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def put(self):
        # user = User.query.filter_by(email=get_jwt_identity()).first()
        current_user.email = ns.payload["new_email"]
        db.session.commit()

        return {"res": "Email changed successfully"}