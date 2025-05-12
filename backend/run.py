from app import create_app, db
from app.models.user import User

app = create_app()

# 移除 @app.before_first_request 装饰器
# 使用 with app.app_context() 替代
with app.app_context():
    db.create_all()
    
    # 添加测试用户（如果不存在）
    if User.query.filter_by(username='student1').first() is None:
        student = User('student1', 'password123', 'student')
        db.session.add(student)
    
    if User.query.filter_by(username='teacher1').first() is None:
        teacher = User('teacher1', 'password123', 'teacher')
        db.session.add(teacher)
    
    db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)