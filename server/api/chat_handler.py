from flask_socketio import emit, join_room, leave_room
from utils.bluprint.blueprint_io import IOBlueprint
from config import users

chat_handler = IOBlueprint('/chat')


@chat_handler.on('message')
def test_broadcast(data):
    print('message:')
    print(data)
    # todo: add msg to db
    # todo: check if user is in that room
    emit('message', {'msg': data.get('msg'), 'uid': data.get('uid')}, to=data.get('roomId', '1000'))


@chat_handler.on('join')
def on_join(data):
    print('join:')
    print(data)
    uid = data.get('uid')
    name = data.get('username')
    room_id = data.get('roomId')
    join_room(room_id)
    # todo: record db
    emit('join', {'uid': uid, 'name': name, 'room_id': room_id}, to=room_id)


@chat_handler.on('leave')
def on_leave(data):
    print('leave:')
    print(data)
    uid = data.get('uid')
    name = data.get('username')
    room_id = data.get('roomId')
    leave_room(room_id)
    emit('leave', {'uid': uid, 'name': name, 'room_id': room_id}, to=room_id)


@chat_handler.on('connect')
def test_connect():
    print('connected')
    emit('my response', {'data': 'Connected'})


@chat_handler.on('disconnect')
def test_disconnect():
    print('Client disconnected')
