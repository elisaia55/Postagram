from .db import db

class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'postId': self.postId
        }

    user = db.relationship("User", back_populates="like")
    post = db.relationship("Post", back_populates="like")
