from flask import jsonify, Blueprint, request
import uuid
import datetime
import json
import re
from utils.auth.token_generator import token_generator
from utils.auth.token_decoder import token_decoder
import hashlib
from config import users

room_handler = Blueprint('room_handler', __name__)


@room_handler.route('/rooms', methods=['GET'])
def get_rooms():
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
