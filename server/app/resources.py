from flask_restx import Resource, Namespace

from .extensions import db
from .models import Volunteer

ns = Namespace("api")

@ns.route("/volunteers")
class Volunteers(Resource):
    def get(self):
        volunteers = Volunteer.query.all()
        return [volunteer.get_dict() for volunteer in volunteers]