from functools import wraps
from flask import request, jsonify
from config import mongo
from utils.auth.token_decoder import token_decoder
from bson import ObjectId


def auth(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        try:
            token = request.headers.get('Authorization').split()[1]
        except:
            return jsonify({'success': False, 'msg': 'Invalid Token'})
        if token is None:
            return jsonify({'success': False, 'msg': 'Please log in'})
        if not token_decoder(token)['success']:
            return jsonify({'success': False, 'msg': 'Invalid Token'})
        uid = token_decoder(token).get('uid')
        if uid is None or mongo.db.users.find_one({'_id': ObjectId(uid)}) is None:
            return jsonify({'success': False, 'msg': 'Invalid Token'})
        kwargs['uid'] = uid
        return func(*args, **kwargs)
    return wrapped