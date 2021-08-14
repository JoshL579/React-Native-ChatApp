from flask_socketio import emit, join_room, leave_room, send
from utils.bluprint.blueprint_io import IOBlueprint
from config import users

chat_handler = IOBlueprint('/chat')


@chat_handler.on('message')
def test_broadcast(data):
    print('message:')
    print(data)
    # todo: add msg to db
    emit('message', {'msg': data.get('msg'), 'uid': data.get('uid')}, broadcast=True)


@chat_handler.on('join')
def on_join(data):
    print('join:')
    print(data)
    uid = data.get('uid')
    name = data.get('username')
    room_id = data.get('roomId')
    join_room(room_id)
    emit('join', {'uid': uid, 'name': name, 'room_id': room_id}, to=room_id)


@chat_handler.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)


@chat_handler.on('connect')
def test_connect():
    print('connected')
    emit('my response', {'data': 'Connected'})


@chat_handler.on('disconnect')
def test_disconnect():
    print('Client disconnected')
