from .extensions import db

class Volunteer(db.Model):
    __tablename__ = "volunteers"

    volunteer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)

    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return f"<Volunteer {self.first_name} {self.last_name}>"

    def get_dict(self):
        return {
            "volunteer_id": self.volunteer_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
        }