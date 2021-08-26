from flask import jsonify, Blueprint, request
from utils.auth.auth_decorator import auth

room_handler = Blueprint('room_handler', __name__)


@room_handler.route('/rooms', methods=['GET'])
@auth
def get_rooms(uid):
    print(uid)
    rooms = [
        {
            'id': '1001',
            'name': 'General Talk',
        },
        {
            'id': '1002',
            'name': 'Game Talk',
        },
        {
            'id': '1003',
            'name': 'Study Talk',
        },
    ]
    return jsonify({'success': True, 'rooms': rooms}), 200
