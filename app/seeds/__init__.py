from flask.cli import AppGroup
from .users import seed_users, undo_users
from .follows import seed_follows, undo_follows
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes
from .links import seed_links, undo_links


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_links()
    seed_posts()
    seed_follows()
    seed_comments()
    seed_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_links()
    undo_posts()
    undo_follows()
    undo_comments()
    undo_likes()
    # Add other undo functions here
