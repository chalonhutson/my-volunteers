from flask_restx import Resource, Namespace
from flask_jwt_extended import jwt_required, get_jwt_identity

from .extensions import db
from .models import Volunteer, Event

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
        print(get_jwt_identity())
        volunteers = Volunteer.query.all()
        return [volunteer.get_dict() for volunteer in volunteers]

@ns.route("/events")
class Events(Resource):
    method_decorators = [jwt_required()]

    @ns.doc(security="jsonWebToken")
    def get(self):
        print(get_jwt_identity())
        events = Event.query.all()
        return [event.get_dict() for event in events]