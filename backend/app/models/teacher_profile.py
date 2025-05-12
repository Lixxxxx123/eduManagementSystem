from app.models.user import db

class TeacherProfile(db.Model):
    __tablename__ = 'teacher_profiles'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    teacher_id = db.Column(db.String(20), unique=True, nullable=False)  # 工号
    name = db.Column(db.String(50), nullable=False)  # 姓名
    gender = db.Column(db.String(10))  # 性别
    title = db.Column(db.String(50))  # 职称
    department = db.Column(db.String(50))  # 所属院系
    research_area = db.Column(db.Text)  # 研究方向
    max_students = db.Column(db.Integer, default=10)  # 最大指导学生数
    
    def __init__(self, user_id, teacher_id, name, gender=None, title=None, department=None, research_area=None, max_students=10):
        self.user_id = user_id
        self.teacher_id = teacher_id
        self.name = name
        self.gender = gender
        self.title = title
        self.department = department
        self.research_area = research_area
        self.max_students = max_students