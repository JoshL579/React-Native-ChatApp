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

profile_handler = Blueprint('profile_handler', __name__)


@profile_handler.route('/profile/upload', methods=['POST'])
def check_token():
    token = json.loads(request.get_data()).get('token')
    if token is None:
        return jsonify({'success': False, 'msg': 'Empty Token'}), 400
    uid = token_decoder(token).get('uid')
    user = mongo.db.users.find_one({'_id': ObjectId(uid)})
    if user is None:
        return jsonify({'success': False, 'msg': 'Invalid Token'}), 400
    data = json.loads(request.get_data())
    avatar = data.get('img')
    try:
        mongo.db.users.update_one({'_id': ObjectId(uid)}, {'$set': {'avatar': avatar}})
    except:
        return jsonify({'success': False, 'msg': 'fail to insert db'}), 200
    return jsonify({'success': True, 'msg': 'success', 'uid': uid}), 200