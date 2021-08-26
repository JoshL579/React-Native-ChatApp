from flask import Blueprint, send_from_directory

static_handler = Blueprint('static_handler', __name__)


@static_handler.route('/<filename>', methods=['GET'])
def send_static(filename):
    print(filename)
    return send_from_directory('static/user_img', filename + '.png')
