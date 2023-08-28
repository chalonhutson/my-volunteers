from flask_restx import fields

from .extensions import api

login_model = api.model("Login", {
    "email": fields.String(required=True),
    "password": fields.String(required=True)
})