import os
import random
from datetime import datetime

from .extensions import db

from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(99), nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=False)

    volunteers = db.relationship("Volunteer", back_populates="user", lazy=True)
    events = db.relationship("Event", back_populates="user", lazy=True)

    def __init__(self, email, password):
        self.email = email
        self.password_hash = generate_password_hash(password)

    def __repr__(self):
        return f"<User {self.email}>"
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)



class Volunteer(db.Model):
    __tablename__ = "volunteers"

    volunteer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(500), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)

    user = db.relationship("User", back_populates="volunteers", lazy=True)

    phones = db.relationship("Phone", back_populates="volunteer", lazy=True)
    emails = db.relationship("Email", back_populates="volunteer", lazy=True)

    def __init__(self, first_name, last_name, user_id, image_url=None):
        self.first_name = first_name
        self.last_name = last_name
        self.image_url = image_url
        self.user_id = user_id

    def __repr__(self):
        return f"<Volunteer {self.first_name} {self.last_name}>"

    def get_dict(self):
        return {
            "volunteer_id": self.volunteer_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "image_url": self.image_url,
        }
class Event(db.Model):
    __tablename__ = "events"

    event_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_name = db.Column(db.String(100), nullable=False)
    event_date = db.Column(db.DateTime, nullable=False)
    event_description = db.Column(db.String(500), nullable=False)
    event_location = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)

    user = db.relationship("User", back_populates="events", lazy=True)

    def __init__(self, event_name, event_date, event_description, event_location, user_id):
        self.event_name = event_name
        self.event_date = event_date
        self.event_description = event_description
        self.event_location = event_location
        self.user_id = user_id

    def __repr__(self):
        return f"<Event {self.event_name}>"

    def get_dict(self):
        return {
            "event_id": self.event_id,
            "event_name": self.event_name,
            "event_date": self.event_date.strftime("%Y-%m-%d %H:%M:%S"),
            "event_description": self.event_description,
            "event_location": self.event_location,
        }

class Phone(db.Model):
    __tablename__ = "phones"

    phone_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    phone_number = db.Column(db.String(20), nullable=False)
    volunteer_id = db.Column(db.Integer, db.ForeignKey("volunteers.volunteer_id"), nullable=False)

    volunteer = db.relationship("Volunteer", back_populates="phones", lazy=True)

    def __init__(self, phone_number, volunteer):
        self.phone_number = phone_number
        self.volunteer = volunteer

    def __repr__(self):
        return f"<Phone {self.phone_number}>"

    def get_dict(self):
        return {
            "phone_id": self.phone_id,
            "phone_number": self.phone_number
        }

class Email(db.Model):
    __tablename__ = "emails"

    email_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email_address = db.Column(db.String(99), nullable=False)
    volunteer_id = db.Column(db.Integer, db.ForeignKey("volunteers.volunteer_id"), nullable=False)

    volunteer = db.relationship("Volunteer", back_populates="emails", lazy=True)

    def __init__(self, email_address, volunteer):
        self.email_address = email_address
        self.volunteer = volunteer

    def __repr__(self):
        return f"<Email {self.email_address}>"

    def get_dict(self):
        return {
            "email_id": self.email_id,
            "email_address": self.email_address
        }




# Existing code...

def populate_database():
    """Populate a brand new database with some sample data."""
    
    os.system("dropdb my-volunteers")
    os.system("createdb my-volunteers")

    db.create_all()

    user1 = User("chalon@email.com", "password")
    user2 = User("jackbauer@email.com", "password")
    db.session.add_all([user1, user2])
    db.session.commit()

    volunteers_user1 = [
        Volunteer("Katniss", "Everdeen", user_id=user1.user_id, image_url=f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Peeta", "Mellark", user_id=user1.user_id, image_url=f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Effie", "Trinket", user_id=user1.user_id, image_url=f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Cinna", "Cinna", user_id=user1.user_id, image_url=f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Haymitch", "Abernathy", user_id=user1.user_id, image_url=f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Gale", "Hawthorne", user_id=user1.user_id, image_url=f"headshot_{random.randint(1, 24)}.jpg"),
    ]

    volunteers_user2 = [
        Volunteer("Hank", "Hill", user_id=user2.user_id, image_url=f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Bobby", "Hill", user_id=user2.user_id, image_url=f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Dale", "Gribble", user_id=user2.user_id, image_url=f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Bill", "Dauterive", user_id=user2.user_id, image_url=f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Peggy", "Hill", user_id=user2.user_id, image_url=f"headshot_{random.randint(1, 24)}.jpg"),
    ]

    db.session.add_all(volunteers_user1 + volunteers_user2)
    db.session.commit()

    # Add some phone numbers and emails
    for volunteer in volunteers_user1 + volunteers_user2:
        for _ in range(random.randint(1, 3)):
            phone = Phone(f"{random.randint(100, 999)}-{random.randint(100, 999)}-{random.randint(1000, 9999)}", volunteer)
            db.session.add(phone)

        for _ in range(random.randint(1, 3)):
            rand_site = random.choice(["gmail", "yahoo", "hotmail", "aol"])
            email = Email(f"{volunteer.first_name.lower()}.{volunteer.last_name.lower()}@{rand_site}.com", volunteer)
            db.session.add(email)

    # Events based on "Hunger Games" and "King of the Hill"
    events = [
        Event("Hunger Games Tribute Ceremony", datetime(2023, 8, 30), "Opening ceremony for the Hunger Games.", "Panem", user1.user_id),
        Event("Victory Tour Kickoff", datetime(2023, 9, 5), "Start of the Victory Tour across districts.", "Panem", user1.user_id),
        Event("Strickland Propane Cookout", datetime(2023, 9, 15), "Annual cookout hosted by Strickland Propane.", "Arlen", user2.user_id),
        Event("Propane Sales Conference", datetime(2023, 9, 20), "Conference for propane industry professionals.", "Houston", user2.user_id),
    ]

    db.session.add_all(events)
    db.session.commit()


