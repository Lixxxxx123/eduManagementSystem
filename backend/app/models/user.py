from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'student' 或 'teacher'
    
    # 关系定义，明确指定外键
    student_profile = db.relationship('StudentProfile', backref='user', uselist=False, 
                                     foreign_keys='StudentProfile.user_id')
    teacher_profile = db.relationship('TeacherProfile', backref='user', uselist=False,
                                     foreign_keys='TeacherProfile.user_id')
    taught_courses = db.relationship('Course', backref='teacher',
                                    foreign_keys='Course.teacher_id')
    enrollments = db.relationship('Enrollment', backref='student', 
                                 foreign_keys='Enrollment.student_id')
    mentor_applications_sent = db.relationship('MentorApplication', 
                                             foreign_keys='MentorApplication.student_id',
                                             backref=db.backref('student', lazy='joined'))
    mentor_applications_received = db.relationship('MentorApplication', 
                                                 foreign_keys='MentorApplication.teacher_id',
                                                 backref=db.backref('teacher', lazy='joined'))
    notifications = db.relationship('Notification', backref='user',
                                   foreign_keys='Notification.user_id')
    
    def __init__(self, username, password, role):
        self.username = username
        self.set_password(password)
        self.role = role
    
    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))