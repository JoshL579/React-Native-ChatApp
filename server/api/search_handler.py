from flask import jsonify, Blueprint, request
from utils.auth.token_decoder import token_decoder
from config import mongo
from bson import ObjectId
import base64
from utils.auth.auth_decorator import auth


search_handler = Blueprint('search_handler', __name__)


@search_handler.route('/user/<search_id>', methods=['POST'])
@auth
def search_user(search_id):
    user = mongo.db.users.find_one({'_id': ObjectId(search_id)})
    # try:
    #     mongo.db.users.update_one({'_id': ObjectId(uid)}, {'$set': {'avatar': avatar}})
    # except:
    #     return jsonify({'success': False, 'msg': 'fail to insert db'}), 200
    return jsonify({'success': True, 'msg': 'success', 'searchId': search_id}), 200
