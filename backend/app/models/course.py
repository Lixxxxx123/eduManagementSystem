from app.models.user import db

class Course(db.Model):
    __tablename__ = 'courses'
    
    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(20), unique=True, nullable=False)  # 课程代码
    name = db.Column(db.String(100), nullable=False)  # 课程名称
    description = db.Column(db.Text)  # 课程描述
    credit = db.Column(db.Float, default=0)  # 学分
    semester = db.Column(db.String(20))  # 学期
    teacher_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # 授课教师
    max_students = db.Column(db.Integer, default=50)  # 最大学生数
    status = db.Column(db.String(20), default='active')  # 课程状态：active, inactive
    
    def __init__(self, code, name, description, credit, semester, teacher_id, max_students=50):
        self.code = code
        self.name = name
        self.description = description
        self.credit = credit
        self.semester = semester
        self.teacher_id = teacher_id
        self.max_students = max_students