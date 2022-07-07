from flask import Blueprint, Config, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Post, Follow, Comment, User, Like
from datetime import datetime
from app.aws_s3 import *
import boto3
import botocore

post_routes = Blueprint('posts', __name__)


@post_routes.route('/new', methods=["POST"])
@login_required
def new_post():
    if "file" not in request.files:
        return {"errors": "image required"}, 400

    file = request.files['file']

    if file:
        file_url = upload_file_to_s3(file)
        newPost = Post(userId=current_user.id, media_url=file_url, description=request.form.get(
            'description'), createdAt=datetime.now())
        db.session.add(newPost)
        db.session.commit()

    return {'msg': "Succesful Post"}
