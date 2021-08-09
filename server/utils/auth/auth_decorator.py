# from functools import wraps
# from flask import request, jsonify
# from config import mongo
# from utils.auth.token_generator import token_decoder
#
#
# def auth(func):
#     @wraps(func)
#     def wrapped(*args, **kwargs):
#         token = request.cookies.get('token')
#         if token is None:
#             return jsonify({'success': False, 'msg': 'Please log in'})
#         if not token_decoder(token)['success']:
#             return jsonify({'success': False, 'msg': 'Invalid Token'})
#         user_id = token_decoder(token).get('uid')
#         if user_id is None or mongo.db.users.find_one({'_id': user_id}) is None:
#             return jsonify({'success': False, 'msg': 'Invalid Token'})
#         return func(*args, **kwargs)
#     return wrapped