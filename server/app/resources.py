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