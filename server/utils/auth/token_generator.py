from config import JWT_SECRET_KEY
import jwt
import datetime


def token_generator(uid):
    JWT_ACCESS_TOKEN_EXPIRES = datetime.datetime.utcnow() + datetime.timedelta(minutes=360)

    login_payload = {
        "uid": uid,
        "exp": JWT_ACCESS_TOKEN_EXPIRES
    }
    token = jwt.encode(payload=login_payload, key=JWT_SECRET_KEY, algorithm='HS256')
    return token
