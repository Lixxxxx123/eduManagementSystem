from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.models.user import User, db

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'message': '请提供用户名和密码'}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'message': '用户名或密码错误'}), 401
    
    # 创建JWT令牌
    access_token = create_access_token(identity={
        'id': user.id,
        'username': user.username,
        'role': user.role
    })
    
    return jsonify({
        'id': user.id,
        'username': user.username,
        'role': user.role,
        'token': access_token
    }), 200

# 添加注册接口
@auth_bp.route('/register', methods=['POST', 'OPTIONS'])
def register():
    # 处理OPTIONS请求（预检请求）
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'OK'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS')
        return response
        
    data = request.get_json()
    
    if not data or not data.get('username') or not data.get('password') or not data.get('role'):
        return jsonify({'message': '请提供用户名、密码和角色'}), 400
    
    # 检查用户名是否已存在
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': '用户名已存在'}), 400
    
    # 验证角色是否有效
    if data['role'] not in ['student', 'teacher']:
        return jsonify({'message': '角色无效，必须是 student 或 teacher'}), 400
    
    # 创建新用户
    user = User(
        username=data['username'],
        password=data['password'],
        role=data['role']
    )
    
    db.session.add(user)
    db.session.commit()
    
    # 创建JWT令牌
    access_token = create_access_token(identity={
        'id': user.id,
        'username': user.username,
        'role': user.role
    })
    
    return jsonify({
        'id': user.id,
        'username': user.username,
        'role': user.role,
        'token': access_token
    }), 201