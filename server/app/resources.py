import random

from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

from .extensions import db
from .api_models import login_model
from .models import User, Volunteer, Event

authorizations = {
    "jsonWebToken": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
    }
}

ns = Namespace("api", authorizations=authorizations)

@ns.route("/volunteers")
class Volunteers(Resource):
    # method_decorators = [jwt_required()]

    # @ns.doc(security="jsonWebToken")
    def get(self):
        # print(get_jwt_identity())
        volunteers = Volunteer.query.all()
        return [volunteer.get_dict() for volunteer in volunteers]

    def post(self):
        volunteer = Volunteer(
            first_name=ns.payload["first_name"],
            last_name=ns.payload["last_name"],
            image_url=f"headshot_{random.randint(1, 24)}.jpg",
            user_id=1
        )
        print(volunteer)
        db.session.add(volunteer)
        db.session.commit()

        return {"res": "Volunteer added successfully"}

@ns.route("/events")
class Events(Resource):
    # method_decorators = [jwt_required()]

    # @ns.doc(security="jsonWebToken")
    def get(self):
        # print(get_jwt_identity())
        events = Event.query.all()
        return [event.get_dict() for event in events]

    def post(self):
        event = Event(
            event_name=ns.payload["event_name"],
            event_location = ns.payload["event_location"],
            event_description=ns.payload["event_description"],
            event_date=ns.payload["event_date"],
            user_id=1
        )
        # print(event)
        db.session.add(event)
        db.session.commit()

        return {"res": "Event added successfully"}

@ns.route("/login")
class Login(Resource):

    @ns.expect(login_model)
    def post(self):
        email = ns.payload["email"]
        password = ns.payload["password"]

        user = User.query.filter_by(email=email).first()

        if user is None or not user.check_password(password):
            return {"res": "Invalid username or password"}, 401

        return {"access_token": create_access_token(identity=user.email)}