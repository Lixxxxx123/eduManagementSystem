from app.models.user import User, db
from app.models.course import Course
from app.models.enrollment import Enrollment
from app.models.mentor_application import MentorApplication
from app.models.student_profile import StudentProfile
from app.models.teacher_profile import TeacherProfile
from app.models.notification import Notification

# 导出所有模型，方便其他模块导入
__all__ = [
    'db', 
    'User', 
    'Course', 
    'Enrollment', 
    'MentorApplication', 
    'StudentProfile', 
    'TeacherProfile', 
    'Notification'
]