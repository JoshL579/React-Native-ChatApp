from flask import jsonify, Blueprint, request
import json
from deploy.deploy import deploy
from config import base_dir

deploy_handler = Blueprint('deploy_handler', __name__)


@deploy_handler.route('/', methods=['GET'])
def get_rooms():
    print(json.loads(request.get_data()))
    deploy(base_dir)
    return jsonify({}), 200
