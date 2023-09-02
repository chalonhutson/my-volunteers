import random

from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

from .extensions import db
from .api_models import login_model
from .models import User, Volunteer, Event, Phone, Email

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
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def get(self):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        volunteers = Volunteer.query.filter_by(user_id=user.user_id).all()
        if len(volunteers) == 0:
            return {"res": "No volunteers found"}, 404
        return [volunteer.get_dict() for volunteer in volunteers]

    @ns.doc(security="jsonWebToken")
    def post(self):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        volunteer = Volunteer(
            first_name=ns.payload["first_name"],
            last_name=ns.payload["last_name"],
            image_url=f"headshot_{random.randint(1, 24)}.jpg",
            user_id=user.user_id
        )
        db.session.add(volunteer)
        db.session.commit()

        return {"res": "Volunteer added successfully"}

@ns.route("/events")
class Events(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def get(self):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        events = Event.query.filter_by(user_id=user.user_id).all()
        if len(events) == 0:
            return {"res": "No events found"}, 404
        return [event.get_dict() for event in events]

    @ns.doc(security="jsonWebToken")
    def post(self):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        event = Event(
            event_name=ns.payload["event_name"],
            event_location = ns.payload["event_location"],
            event_description=ns.payload["event_description"],
            event_date=ns.payload["event_date"],
            user_id=user.user_id
        )
        db.session.add(event)
        db.session.commit()

        return {"res": "Event added successfully"}

@ns.route("/volunteers/<int:volunteer_id>")
class VolunteerById(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def get(self, volunteer_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        volunteer = Volunteer.query.get(volunteer_id)
        if volunteer.user_id != user.user_id:
            return {"res": "You are not authorized to view this volunteer"}, 401
        volunteer_phones = Phone.query.filter_by(volunteer_id=volunteer_id).all()
        volunteer_emails = Email.query.filter_by(volunteer_id=volunteer_id).all()

        volunteer_dict = volunteer.get_dict()
        volunteer_dict["phones"] = [phone.get_dict() for phone in volunteer_phones]
        volunteer_dict["emails"] = [email.get_dict() for email in volunteer_emails]

        return volunteer_dict

    @ns.doc(security="jsonWebToken")
    def put(self, volunteer_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        volunteer = Volunteer.query.get(volunteer_id)
        if volunteer.user_id != user.user_id:
            return {"res": "You are not authorized to change this volunteer"}, 401
        volunteer.first_name = ns.payload["first_name"]
        volunteer.last_name = ns.payload["last_name"]
        volunteer.image_url = ns.payload["image_url"]
        db.session.commit()

        return {"res": "Volunteer updated successfully"}

    @ns.doc(security="jsonWebToken")
    def delete(self, volunteer_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        volunteer = Volunteer.query.get(volunteer_id)
        if volunteer.user_id != user.user_id:
            return {"res": "You are not authorized to delete this volunteer"}, 401
        db.session.delete(volunteer)
        db.session.commit()

        return {"res": "Volunteer deleted successfully"}


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