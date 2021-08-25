from flask import jsonify, Blueprint, request
import uuid
import datetime
import json
import re
from utils.auth.token_generator import token_generator
from utils.auth.token_decoder import token_decoder
import hashlib
from config import mongo
from bson import ObjectId

auth_handler = Blueprint('auth_handler', __name__)


@auth_handler.route('/login', methods=['POST'])
def login():
    data = json.loads(request.get_data())
    email = data.get('email')
    password = data.get('password')

    # missing params
    if email is None or password is None:
        return jsonify({'success': False, 'msg': 'Missing Field(s)'}), 400
    if email == '' or password == '':
        return jsonify({'success': False, 'msg': 'Missing Field(s)'}), 400

    # email validation check
    regex = """^(\w|\.|\_|\-)+[@](\w|\_|\-|\.)+[.]\w{2,3}$"""
    if not re.search(regex, email):
        return jsonify({'success': False, 'msg': 'Invalid email'}), 400

    # search db & ignore case
    user = mongo.db.users.find_one({'email': re.compile('^' + re.escape(email) + '$', re.IGNORECASE)})

    # user not exist
    if user is None:
        return jsonify({'success': False, 'msg': 'Please Sign Up'}), 200

    # password wrong
    hash_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
    if user['password'] != hash_password:
        return jsonify({'success': False, 'msg': 'Invalid Username or Password'}), 200

    # login user
    uid = str(user.get('_id'))
    token = token_generator(uid)
    full_name = user.get('first_name') + ' ' + user.get('last_name')
    return jsonify({'success': True, 'msg': 'success', 'uid': uid, 'token': token, 'name': full_name})


@auth_handler.route('/auth', methods=['POST'])
def check_token():
    token = json.loads(request.get_data()).get('token')
    if token is None:
        return jsonify({'success': False, 'msg': 'Empty Token'}), 400
    uid = token_decoder(token).get('uid')
    user = mongo.db.users.find_one({'_id': ObjectId(uid)})
    if user is not None:
        full_name = user.get('first_name') + ' ' + user.get('last_name')
        return jsonify({'success': True, 'msg': 'success', 'uid': uid, 'name': full_name, 'img': True}), 200
    return jsonify({'success': False, 'msg': 'Invalid Token'}), 400
