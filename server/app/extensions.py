from flask_sqlalchemy import SQLAlchemy
from flask_restx import Api
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# api = Api(doc=False)
api = Api()
db = SQLAlchemy()
jwt = JWTManager()
cors = CORS()