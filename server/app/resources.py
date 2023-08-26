from flask_restx import Resource, Namespace

from .extensions import db
from .models import Volunteer, Event

ns = Namespace("api")

@ns.route("/volunteers")
class Volunteers(Resource):
    def get(self):
        volunteers = Volunteer.query.all()
        return [volunteer.get_dict() for volunteer in volunteers]

@ns.route("/events")
class Events(Resource):
    def get(self):
        events = Event.query.all()
        return [event.get_dict() for event in events]