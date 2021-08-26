from flask import jsonify, Blueprint, request
from utils.auth.token_decoder import token_decoder
from config import mongo
from bson import ObjectId
import base64


profile_handler = Blueprint('profile_handler', __name__)


@profile_handler.route('/upload', methods=['POST'])
def check_token():
    print(request.form.get('token'))
    # print(request.files['img'])
    token = request.form.get('token')
    # token = json.loads(request.get_data()).get('token')
    if token is None:
        return jsonify({'success': False, 'msg': 'Empty Token'}), 400
    uid = token_decoder(token).get('uid')
    user = mongo.db.users.find_one({'_id': ObjectId(uid)})
    if user is None:
        return jsonify({'success': False, 'msg': 'Invalid Token'}), 400
    # data = json.loads(request.get_data())
    # avatar = data.get('img')
    avatar = request.form.get('img')
    with open("./static/user_img/" + uid + ".png", "wb") as fh:
        fh.write(base64.b64decode(avatar))
    # try:
    #     mongo.db.users.update_one({'_id': ObjectId(uid)}, {'$set': {'avatar': avatar}})
    # except:
    #     return jsonify({'success': False, 'msg': 'fail to insert db'}), 200
    return jsonify({'success': True, 'msg': 'success', 'uid': uid}), 200
