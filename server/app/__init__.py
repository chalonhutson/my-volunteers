import os
from flask import Flask
from flask_migrate import Migrate

from .extensions import api, db
from .resources import ns

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["POSTGRES_URI"]

    api.init_app(app)
    db.init_app(app)
    Migrate(app, db)

    api.add_namespace(ns)



    return app