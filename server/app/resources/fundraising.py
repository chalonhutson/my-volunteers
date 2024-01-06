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

ns = Namespace("api/fundraising", authorizations=authorizations)


""" Create new user. """
@ns.route("/donors")
class Donors(Resource):

    def post(self):
        print("triggered")
        email = ns.payload["email"]
        password = ns.payload["password"]

        if User.query.filter_by(email=email).first():
            return {"res": "User already exists"}, 409

        return {"res": "User created successfully"}, 201