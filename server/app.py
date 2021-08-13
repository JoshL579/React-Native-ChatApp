from flask import Flask
from flask_cors import CORS
from config import url_prefix, users
from flask_socketio import SocketIO
from api.auth_handler import auth_handler
from api.room_handler import room_handler
from api.chat_handler import chat_handler


app = Flask(__name__)
app.debug = True
CORS(app)
socketio = SocketIO(app, ping_timeout=5)
socketio.init_app(app, cors_allowed_origins="*")

app.register_blueprint(auth_handler, url_prefix=url_prefix)
app.register_blueprint(room_handler, url_prefix=url_prefix)
chat_handler.init_io(socketio)

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5001)