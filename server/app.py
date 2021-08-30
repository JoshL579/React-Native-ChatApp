from flask import Flask
from flask_cors import CORS
import config
from config import url_prefix, users
from flask_socketio import SocketIO
from api.auth_handler import auth_handler
from api.room_handler import room_handler
from api.chat_handler import chat_handler
from api.profile_handler import profile_handler
from api.static_handler import static_handler
from api.search_handler import search_handler
from api.deploy_handler import deploy_handler
from config import mongo

app = Flask(__name__, static_url_path='/static')
app.debug = True
app.config.from_object(config)
mongo.init_app(app)
CORS(app)
socketio = SocketIO(app, ping_timeout=5)
socketio.init_app(app, cors_allowed_origins="*")

app.register_blueprint(auth_handler, url_prefix=url_prefix)
app.register_blueprint(room_handler, url_prefix=url_prefix)
app.register_blueprint(profile_handler, url_prefix=url_prefix + '/profile')
app.register_blueprint(static_handler, url_prefix=url_prefix + '/static')
app.register_blueprint(search_handler, url_prefix=url_prefix + '/search')
app.register_blueprint(deploy_handler, url_prefix=url_prefix + '/deploy-github')
chat_handler.init_io(socketio)

if __name__ == '__main__':
    socketio.run(app, debug=True,host='0.0.0.0', port=5001)