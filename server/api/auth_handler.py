from flask import jsonify, Blueprint, request
import uuid
import datetime
import json
import re
from utils.auth.token_generator import token_generator
from utils.auth.token_decoder import token_decoder
import hashlib
from config import users

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

    # # search db & ignore case
    # user = mongo.db.users.find_one({'email': re.compile('^' + re.escape(email) + '$', re.IGNORECASE)})
    #
    # # user not exist
    # if user is None:
    #     return jsonify({'success': False, 'msg': 'Please Sign Up'}), 200
    #
    # # password wrong
    # hash_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
    # if user['password'] != hash_password:
    #     return jsonify({'success': False, 'msg': 'Invalid Username or Password'}), 200
    #

    for user in users:
        if user.get('email') == email and user.get('password') == password:
            uid = user.get('id')
            token = token_generator(uid)
            return jsonify({'success': True, 'msg': 'success', 'uid': uid, 'token': token})
            # res.set_cookie('token', token, httponly=True)
            # return res, 200
    return jsonify({'success': False, 'msg': 'Invalid Email or Password'}), 400
