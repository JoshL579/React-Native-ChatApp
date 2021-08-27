from flask import jsonify, Blueprint, request
from utils.auth.auth_decorator import auth
from config import mongo
from bson import ObjectId
import base64
import json


profile_handler = Blueprint('profile_handler', __name__)


@profile_handler.route('/upload', methods=['POST'])
@auth
def check_token(uid):
    img = json.loads(request.get_data()).get('img')
    if img is None:
        return jsonify({'success': False, 'msg': 'Empty Image'}), 200

    # make img file
    try:
        with open("./static/user_img/" + uid + ".png", "wb") as fh:
            fh.write(base64.b64decode(img))
    except:
        return jsonify({'success': False, 'msg': 'Invalid Image'}), 200

    # update db
    try:
        mongo.db.users.update_one({'_id': ObjectId(uid)}, {'$set': {'avatar': img}})
    except:
        return jsonify({'success': False, 'msg': 'fail to insert db'}), 200

    # success return
    return jsonify({'success': True, 'msg': 'success', 'uid': uid}), 200
