from app.models.user import db
from datetime import datetime

class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    enrollment_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='enrolled')  # enrolled, dropped, completed
    grade = db.Column(db.Float)  # 成绩
    
    # 确保学生不能重复选同一门课
    __table_args__ = (db.UniqueConstraint('student_id', 'course_id', name='uix_enrollment'),)
    
    def __init__(self, student_id, course_id):
        self.student_id = student_id
        self.course_id = course_id