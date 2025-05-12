from app.models.user import db
from datetime import datetime

class MentorApplication(db.Model):
    __tablename__ = 'mentor_applications'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    teacher_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    application_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    reason = db.Column(db.Text)  # 申请理由
    teacher_comment = db.Column(db.Text)  # 教师评论
    
    # 确保学生不能向同一位教师重复申请
    __table_args__ = (db.UniqueConstraint('student_id', 'teacher_id', name='uix_mentor_application'),)
    
    def __init__(self, student_id, teacher_id, reason):
        self.student_id = student_id
        self.teacher_id = teacher_id
        self.reason = reason