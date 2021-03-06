from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(250), nullable=False)
    description = db.Column(db.String(125), nullable=True)
    name = db.Column(db.String(40), nullable=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image_url': self.image_url,
            'description': self.description,
            'name': self.name
        }

    follower = db.relationship("Follow", back_populates='follower_user',
                               foreign_keys="Follow.followerId", cascade="all,delete-orphan")
    following = db.relationship("Follow", back_populates='following_user',
                                foreign_keys="Follow.followingId", cascade="all,delete-orphan")
    post = db.relationship("Post", back_populates="user",
                           cascade="all,delete-orphan")
    comment = db.relationship(
        "Comment", back_populates="user", cascade="all,delete-orphan")
    like = db.relationship("Like", back_populates="user",
                           cascade="all,delete-orphan")
    dispatcher = db.relationship("Message", back_populates="dispatcher_user",
                                 foreign_keys="Message.dispatcherId", cascade="all,delete-orphan")
    recipient = db.relationship("Message", back_populates="recipient_user",
                                foreign_keys="Message.recipientId", cascade="all,delete-orphan")
    user1 = db.relationship("DM_Link", back_populates="user1",
                            foreign_keys="DM_Link.userId1", cascade="all,delete-orphan")
    user2 = db.relationship("DM_Link", back_populates="user2",
                            foreign_keys="DM_Link.userId2", cascade="all,delete-orphan")
