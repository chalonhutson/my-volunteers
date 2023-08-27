import os
from flask import Flask
from flask_migrate import Migrate

from .extensions import api, db, jwt
from .resources import ns

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["POSTGRES_URI"]
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET_KEY"]

    api.init_app(app)
    db.init_app(app)
    Migrate(app, db)
    jwt.init_app(app)

    api.add_namespace(ns)



    return app