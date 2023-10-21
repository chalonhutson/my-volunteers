import random

from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token

from .extensions import db
from .api_models import login_model, volunteer_note_model
from .models import User, Volunteer, Event, Phone, Email, VolunteerNote

authorizations = {
    "jsonWebToken": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
    }
}

ns = Namespace("api", authorizations=authorizations)

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

        return {"access_token": create_access_token(identity=user.email), "email": email}


""" Get all volunteers for a user and add new volunteers. """
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
            ns.payload["first_name"],
            ns.payload["last_name"],
            user.user_id,
            ns.payload["preferred_contact"],
            image_url=f"headshot_{random.randint(1, 24)}.jpg",
        )
        db.session.add(volunteer)
        db.session.commit()

        return {"res": "Volunteer added successfully"}


""" Get, update, and delete a volunteer by id """
@ns.route("/volunteers/<int:volunteer_id>")
class VolunteerById(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def get(self, volunteer_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        volunteer = Volunteer.query.get(volunteer_id)
        if volunteer.user_id != user.user_id:
            return {"res": "You are not authorized to view this volunteer"}, 401
        # volunteer_phones = Phone.query.filter_by(volunteer_id=volunteer_id).all()
        # volunteer_emails = Email.query.filter_by(volunteer_id=volunteer_id).all()

        volunteer_dict = volunteer.get_dict()
        volunteer_dict["phones"] = [phone.get_dict() for phone in volunteer.phones]
        volunteer_dict["emails"] = [email.get_dict() for email in volunteer.emails]
        volunteer_dict["notes"] = [note.get_dict() for note in volunteer.notes]

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


""" Get all events for a user and add new events. """
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

""" Get, update, and delete an event by id """
@ns.route("/events/<int:event_id>")
class EventById(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def get(self, event_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        event = Event.query.get(event_id)
        if event.user_id != user.user_id:
            return {"res": "You are not authorized to view this event"}, 401

        return event.get_dict()

    @ns.doc(security="jsonWebToken")
    def put(self, event_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        event = Event.query.get(event_id)
        if event.user_id != user.user_id:
            return {"res": "You are not authorized to change this event"}, 401
        event.event_name = ns.payload["event_name"]
        event.event_location = ns.payload["event_location"]
        event.event_description = ns.payload["event_description"]
        event.event_date = ns.payload["event_date"]
        db.session.commit()

        return {"res": "Event updated successfully"}

    @ns.doc(security="jsonWebToken")
    def delete(self, event_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        event = Event.query.get(event_id)
        if event.user_id != user.user_id:
            return {"res": "You are not authorized to delete this event"}, 401
        db.session.delete(event)
        db.session.commit()

        return {"res": "Event deleted successfully"}

@ns.route("/volunteers/notes/<int:volunteer_id>")
class VolunteerNotes(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    @ns.expect(volunteer_note_model)
    def post(self, volunteer_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        volunteer = Volunteer.query.get(volunteer_id)
        if volunteer.user_id != user.user_id:
            return {"res": "You are not authorized to add notes to this volunteer"}, 401

        note = VolunteerNote(ns.payload["content"], volunteer)
        volunteer.notes.append(note)
        db.session.commit()

        return {"res": "Note added successfully"}

@ns.route("/volunteers/<int:volunteer_id>/phones")
class VolunteerPhones(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def post(self, volunteer_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        volunteer = Volunteer.query.get(volunteer_id)
        if volunteer.user_id != user.user_id:
            return {"res": "You are not authorized to add phones to this volunteer"}, 401

        phone = Phone(ns.payload["phone_number"], volunteer)
        volunteer.phones.append(phone)
        db.session.commit()

        return {"res": "Phone number added successfully"}

@ns.route("/volunteers/phones/<int:phone_id>")
class VolunteerPhoneById(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def put(self, phone_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        phone = Phone.query.get(phone_id)
        if phone.volunteer.user_id != user.user_id:
            return {"res": "You are not authorized to change this phone number"}, 401
        phone.phone_number = ns.payload["phone_number"]
        db.session.commit()

        return {"res": "Phone number updated successfully"}

    @ns.doc(security="jsonWebToken")
    def delete(self, phone_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        phone = Phone.query.get(phone_id)
        if phone.volunteer.user_id != user.user_id:
            return {"res": "You are not authorized to delete this phone number"}, 401
        db.session.delete(phone)
        db.session.commit()

        return {"res": "Phone number deleted successfully"}

@ns.route("/volunteers/<int:volunteer_id>/emails")
class VolunteerEmails(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def post(self, volunteer_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        volunteer = Volunteer.query.get(volunteer_id)
        if volunteer.user_id != user.user_id:
            return {"res": "You are not authorized to add emails to this volunteer"}, 401

        email = Email(ns.payload["email_address"], volunteer)
        print(email)
        volunteer.emails.append(email)
        db.session.commit()

        return {"res": "Email added successfully"}

@ns.route("/volunteers/emails/<int:email_id>")
class VolunteerEmailById(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def put(self, email_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        email = Email.query.get(email_id)
        if email.volunteer.user_id != user.user_id:
            return {"res": "You are not authorized to change this email"}, 401
        email.email_address = ns.payload["email_address"]
        db.session.commit()

        return {"res": "Email updated successfully"}

    @ns.doc(security="jsonWebToken")
    def delete(self, email_id):
        user = User.query.filter_by(email=get_jwt_identity()).first()
        email = Email.query.get(email_id)
        if email.volunteer.user_id != user.user_id:
            return {"res": "You are not authorized to delete this email"}, 401
        db.session.delete(email)
        db.session.commit()

        return {"res": "Email deleted successfully"}