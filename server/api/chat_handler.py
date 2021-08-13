from flask_socketio import emit, join_room, leave_room, send
from utils.bluprint.blueprint_io import IOBlueprint

chat_handler = IOBlueprint('/chat')


@chat_handler.on('message')
def test_broadcast(message):
    print(message)
    emit('response', {'data': message}, broadcast=True)


@chat_handler.on('join')
def on_join(data):
    print(data)
    username = data['username']
    room = data['room']
    join_room(room)
    # send(username + ' has entered the room.', to=room)
    emit('my response', {'data': username + ' has entered the room.', 'user': username}, to=room)


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
