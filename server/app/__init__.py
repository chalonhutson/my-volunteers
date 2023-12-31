from datetime import timedelta
import os
from flask import Flask, send_from_directory, render_template
from flask_migrate import Migrate

from .extensions import api, db, jwt, cors
from .resources import ns

from .models import User

def create_app():
    app = Flask(__name__, static_folder="static", static_url_path="", template_folder="static")


    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ["POSTGRES_URI"]
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET_KEY"]
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

    @app.route("/", defaults={'path':''})
    @app.route("/<path:path>")
    def serve(path):
        return send_from_directory(app.static_folder,'index.html')
    
    @app.route("/volunteers")
    @app.route("/events")
    @app.route("/fundraising")
    @app.route("/fundraising/donations")
    @app.route("/fundraising/add-donation")
    @app.route("/fundraising/donors")
    @app.route("/fundraising/add-donor")
    @app.route("/settings")
    def serve_2():
        return send_from_directory(app.static_folder,'index.html')

    @app.route("/volunteers/<id>")
    @app.route("/events/<id>")
    @app.route("/fundraising/donations/<id>")
    @app.route("/fundraising/donors/<id>")
    def server_3(id):
        return send_from_directory(app.static_folder,'index.html')

    api.init_app(app)
    db.init_app(app)
    Migrate(app, db)
    jwt.init_app(app)
    cors.init_app(app)



    api.add_namespace(ns)

    @jwt.user_identity_loader
    def user_identity_lookup(user):
        return user.user_id

    @jwt.user_lookup_loader
    def user_lookup_callback(_jwt_header, jwt_data):
        identity = jwt_data["sub"]
        return User.query.filter_by(user_id=identity).first()



    return app