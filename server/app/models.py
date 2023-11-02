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
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

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
    preferred_contact = db.Column(db.String(20), nullable=False, default="none")
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates="volunteers", lazy=True)

    phones = db.relationship("Phone", back_populates="volunteer", lazy=True)
    emails = db.relationship("Email", back_populates="volunteer", lazy=True)
    notes = db.relationship("VolunteerNote", back_populates="volunteer", lazy=True)

    event_invites = db.relationship("VolunteerEventInvite", back_populates="volunteer", lazy=True)

    def __init__(self, first_name, last_name, user_id , preferred_contact, image_url=None):
        self.first_name = first_name
        self.last_name = last_name
        self.image_url = image_url
        self.preferred_contact = preferred_contact
        self.user_id = user_id

    def __repr__(self):
        return f"<Volunteer {self.first_name} {self.last_name}>"

    def get_dict(self):
        if self.preferred_contact == "email":
            preferred_contact = Email.query.filter_by(volunteer_id=self.volunteer_id).first()

            if preferred_contact:
                preferred_contact = preferred_contact.email_address
            else:
                preferred_contact = "none"
        elif self.preferred_contact == "phone":
            preferred_contact = Phone.query.filter_by(volunteer_id=self.volunteer_id).first()

            if preferred_contact:
                preferred_contact = preferred_contact.phone_number
            else:
                preferred_contact = "none"
        else:
            preferred_contact = "none"

        return {
            "volunteer_id": self.volunteer_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "image_url": self.image_url,
            "preferred_contact": {
                "method": self.preferred_contact,
                "contact": preferred_contact
            },
            "events": [invite.event.get_dict() for invite in self.event_invites]
        }

class Event(db.Model):
    __tablename__ = "events"

    event_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    event_name = db.Column(db.String(100), nullable=False)
    event_date = db.Column(db.DateTime, nullable=False)
    event_description = db.Column(db.String(500), nullable=False)
    event_location = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", back_populates="events", lazy=True)

    volunteer_invites = db.relationship("VolunteerEventInvite", back_populates="event", lazy=True)

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
            "event_datetime": self.event_date.strftime("%Y-%m-%d %H:%M:%S"),
            "event_date": self.event_date.strftime("%Y-%m-%d"),
            "event_description": self.event_description,
            "event_location": self.event_location,
        }

class Phone(db.Model):
    __tablename__ = "phones"

    phone_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    phone_number = db.Column(db.String(20), nullable=False)
    volunteer_id = db.Column(db.Integer, db.ForeignKey("volunteers.volunteer_id"), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

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
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

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

class VolunteerNote(db.Model):
    __tablename__ = "volunteer_notes"

    note_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.String(9999), nullable=False)
    volunteer_id = db.Column(db.Integer, db.ForeignKey("volunteers.volunteer_id"), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    volunteer = db.relationship("Volunteer", back_populates="notes", lazy=True)

    def __init__(self, content, volunteer):
        self.content = content
        self.volunteer = volunteer

    def __repr__(self):
        return f"<VolunteerNote {self.note_id}>"

    def get_dict(self):
        return {
            "note_id": self.note_id,
            "content": self.content
        }


class VolunteerEventInvite(db.Model):
    __tablename__ = "volunteer_event_invites"

    invite_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    volunteer_id = db.Column(db.Integer, db.ForeignKey("volunteers.volunteer_id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("events.event_id"), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    volunteer = db.relationship("Volunteer", back_populates="event_invites", lazy=True)
    event = db.relationship("Event", back_populates="volunteer_invites", lazy=True)

    def __init__(self, volunteer_id, event_id):
        self.volunteer_id = volunteer_id
        self.event_id = event_id

    def __repr__(self):
        return f"<VolunteerEventInvite {self.invite_id}>"

    def get_dict(self):
        return {
            "invite_id": self.invite_id,
            "volunteer": self.volunteer.get_dict(),
            "event": self.event.get_dict()
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
        Volunteer("Katniss", "Everdeen", user1.user_id, "none", f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Peeta", "Mellark", user1.user_id, "phone", f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Effie", "Trinket", user1.user_id, "email", f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Cinna", "Cinna", user1.user_id, "none", f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Haymitch", "Abernathy", user1.user_id, "phone", f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Gale", "Hawthorne", user1.user_id, "email", f"headshot_{random.randint(1, 24)}.jpg"),
    ]

    volunteers_user2 = [
        Volunteer("Hank", "Hill", user2.user_id, "none", f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Bobby", "Hill", user2.user_id, "phone", f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Dale", "Gribble", user2.user_id, "email", f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Bill", "Dauterive", user2.user_id, "none", f"headshot_{random.randint(1, 24)}.jpg"),
        Volunteer("Peggy", "Hill", user2.user_id, "phone", f"headshot_{random.randint(1, 24)}.jpg"),
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

    # Add some notes
    volunteers_user1_notes = [
        VolunteerNote("Won the Hunger Games", volunteers_user1[0]),
        VolunteerNote("Won the Hunger Games", volunteers_user1[1]),
        VolunteerNote("Mentor for Katniss", volunteers_user1[2]),
        VolunteerNote("Stylist for Katniss", volunteers_user1[3]),
        VolunteerNote("Mentor for Katniss", volunteers_user1[4]),
        VolunteerNote("Won the Hunger Games way way back when.", volunteers_user1[4]),
        VolunteerNote("Hunts with Katniss", volunteers_user1[5]),
    ]

    volunteers_user2_notes = [
        VolunteerNote("Propane salesman", volunteers_user2[0]),
        VolunteerNote("Son of Hank", volunteers_user2[1]),
        VolunteerNote("Conspiracy theorist", volunteers_user2[2]),
        VolunteerNote("Army barber", volunteers_user2[3]),
        VolunteerNote("Substitute teacher", volunteers_user2[4]),
    ]

    db.session.add_all(volunteers_user1_notes + volunteers_user2_notes)
    db.session.commit()


