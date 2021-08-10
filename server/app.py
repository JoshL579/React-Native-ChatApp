from flask import Flask
from flask_cors import CORS
from config import url_prefix
from api.auth_handler import auth_handler
from api.room_handler import room_handler


app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_handler, url_prefix=url_prefix)
app.register_blueprint(room_handler, url_prefix=url_prefix)
