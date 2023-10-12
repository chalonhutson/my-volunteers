from flask_restx import fields

from .extensions import api

login_model = api.model("Login", {
    "email": fields.String(required=True),
    "password": fields.String(required=True)
})

volunteer_note_model = api.model("VolunteerNote", {
    "content": fields.String(required=True)
})