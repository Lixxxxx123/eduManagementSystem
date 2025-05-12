# 教学管理系统

一个基于Angular 17和Flask的全栈教学管理系统，支持学生与教师双角色操作，提供课程管理、在线选课、导师双选、数据可视化等功能。

---

## 系统架构

### 技术栈
- **前端框架**: Angular 17 (Standalone组件模式)
- **UI组件库**: Angular Material
- **后端框架**: Flask 3.0
- **ORM工具**: SQLAlchemy 2.0
- **数据库**: MySQL 8.0
- **身份验证**: JWT令牌
- **可视化引擎**: ECharts 5.0

系统采用模块化架构设计，主要功能模块包括身份认证模块、课程管理核心模块、双选系统决策模块、数据可视化分析模块和权限控制中间件。前后端通过RESTful API进行通信，数据库使用MySQL关系型数据库存储结构化数据。

---

## 环境要求

### 开发环境
- **Node.js** ≥18.16 LTS（前端依赖）
- **Python** ≥3.11（后端运行）
- **MySQL** ≥8.0（数据存储）
- **Redis** ≥6.2（会话缓存，可选）

### 开发工具
```bash
# 前端工具链
npm install -g @angular/cli@17

# 后端虚拟环境
python -m venv venv && source venv/bin/activate

# 后端服务部署指南

## 1. 安装依赖
进入项目根目录的 `backend` 文件夹，安装Python依赖包：
```bash
cd backend
pip install -r requirements.txt
```

---

## 2. 数据库配置
### 创建MySQL数据库
执行以下SQL语句创建数据库（确保MySQL服务已启动）：
```sql
CREATE DATABASE edu_system
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

### 修改配置文件
打开 `backend/config.py`，按实际信息修改以下配置项：
```python
# 格式：mysql+pymysql://用户名:密码@数据库地址:端口/数据库名
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:your_password@localhost:3386/edu_system'
JWT_SECRET_KEY = 'your_secure_secret_here'  # 建议使用强随机字符串
```

---

## 3. 初始化数据库并启动服务
### 执行数据迁移
在 `backend` 目录下运行：
```bash
flask db upgrade
```

### 启动后端服务
```bash
flask run --host=0.0.0.0 --port=5000
```

---

## 注意事项
- 确保本地已安装并启动 **MySQL 5.7+** 和 **Python 3.8+**
- 配置中的 `your_password` 需替换为实际数据库密码
- `JWT_SECRET_KEY` 需设置为安全的随机字符串（建议通过环境变量管理敏感信息）
- 生产环境建议使用Gunicorn或uWSGI部署

# 前端应用部署指南

## 1. 安装依赖
进入项目根目录的 `frontend` 文件夹，安装Node.js依赖包：
```bash
cd frontend
npm install
```

---

## 2. 配置API地址
打开 `src/environments/environment.ts` 文件，按后端实际地址修改API配置：
```typescript
export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost:5000/api'  // 确保与后端服务地址一致
};
```

---

## 3. 启动开发服务器
在 `frontend` 目录下运行：
```bash
ng serve --open
```
命令执行后，浏览器会自动打开 `http://localhost:4200` 访问应用。

---

## 注意事项
- 需提前安装 **Node.js 16+** 和 **Angular CLI 12+**
- 生产环境部署时，应使用 `environment.prod.ts` 并设置 `production: true`
- 若后端服务端口非默认值（如5000），需同步修改 `apiBaseUrl` 端口号
- 建议通过 `.env` 文件管理敏感配置（需配合自定义Webpack配置）

# 系统功能概述

## 学生端功能

### 课程管理
- **课程查看**：实时浏览当前学期课程目录，支持按学分/教师/时间多维度筛选  
- **课表同步**：支持导出iCal格式课表，一键同步至日历应用  

### 双选系统
- **三阶段匹配**：志愿填报 → 双向确认 → 最终匹配，流程透明可追溯  
- **状态追踪**：实时查看导师选择进度和志愿匹配结果  

### 数据分析
- **GPA趋势图**：动态展示学期/学年GPA变化曲线  
- **学分进度**：可视化学位要求完成度（核心课/选修课/实践课）  
- **成绩热力图**：按课程类别生成成绩分布矩阵图  

---

## 教师端功能

### 教学管理
- **课程配置**：创建/编辑课程信息（大纲、课时、考核方式）  
- **容量控制**：动态调整课程容量，实时显示选课人数统计  

### 成绩管理
- **批量操作**：支持Excel模板导入/导出成绩，自动校验数据格式  
- **智能分析**：生成课程成绩正态分布图、挂科率统计等分析报告  

### 双选管理
- **名额配置**：设置各阶段接收学生名额上限  
- **志愿洞察**：查看学生志愿热度分布（柱状图/饼图）  
- **结果确认**：一键锁定最终匹配名单，自动发送通知邮件  

---

## 功能依赖说明
- 课程数据同步需确保后端服务运行在 `http://localhost:5000`  
- 热力图渲染依赖浏览器支持 `Canvas` 和 `WebGL`  
- Excel模板文件需符合[系统模板规范](./docs/template_guideline.md)  