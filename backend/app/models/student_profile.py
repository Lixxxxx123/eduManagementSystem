from app.models.user import db

class StudentProfile(db.Model):
    __tablename__ = 'student_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    student_id = db.Column(db.String(20), unique=True, nullable=False)  # 学号
    name = db.Column(db.String(50), nullable=False)  # 姓名
    gender = db.Column(db.String(10))  # 性别
    major = db.Column(db.String(50))  # 专业
    class_name = db.Column(db.String(50))  # 班级
    admission_year = db.Column(db.Integer)  # 入学年份
    mentor_id = db.Column(db.Integer, db.ForeignKey('users.id'))  # 导师ID
    
    def __init__(self, user_id, student_id, name, gender=None, major=None, class_name=None, admission_year=None):
        self.user_id = user_id
        self.student_id = student_id
        self.name = name
        self.gender = gender
        self.major = major
        self.class_name = class_name
        self.admission_year = admission_year