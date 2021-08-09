from config import JWT_SECRET_KEY
import jwt


def token_decoder(token):
    try:
        decoded_token = jwt.decode(token, key=JWT_SECRET_KEY, algorithms=['HS256'])
        if decoded_token.get('uid') is not None:
            return {'success': True, 'uid': decoded_token['uid']}
    except:
        return {'success': False}