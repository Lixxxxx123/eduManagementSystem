from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from app.models.user import db

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # 初始化扩展
    CORS(app)
    db.init_app(app)
    jwt = JWTManager(app)
    
    # 注册蓝图
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp)
    
    return app