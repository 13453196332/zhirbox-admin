<template>
  <router-view />
</template>

<style>
/* ===== 亮色主题（默认） ===== */
:root {
  --bg-page: #f0f2f5;
  --bg-card: #ffffff;
  --bg-card-translucent: rgba(255,255,255,0.8);
  --bg-aside: #1e293b;
  --bg-header: #ffffff;
  --bg-login-start: #667eea;
  --bg-login-end: #764ba2;
  --text-primary: #303133;
  --text-secondary: #606266;
  --text-muted: #909399;
  --text-placeholder: #c0c4cc;
  --text-aside: #94a3b8;
  --text-aside-active: #409eff;
  --border-light: #e4e7ed;
  --border-aside: rgba(0,0,0,0.06);
  --accent: #409eff;
  --accent-cyan: #00d4ff;
  --accent-glow: rgba(64,158,255,0.12);
  --shadow-card: 0 1px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --radius: 8px;
}

/* ===== 暗色主题 ===== */
[data-theme="dark"] {
  --bg-page: #060b18;
  --bg-card: rgba(255,255,255,0.04);
  --bg-card-translucent: rgba(10,15,30,0.8);
  --bg-aside: #0a0f1e;
  --bg-header: #0a0f1e;
  --bg-login-start: #0a0f1e;
  --bg-login-end: #1a1a2e;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --text-placeholder: #475569;
  --text-aside: #94a3b8;
  --text-aside-active: #00d4ff;
  --border-light: rgba(0,212,255,0.1);
  --border-aside: rgba(0,212,255,0.08);
  --accent: #00d4ff;
  --accent-cyan: #00d4ff;
  --accent-glow: rgba(0,212,255,0.12);
  --shadow-card: none;
  --radius: 8px;
}

/* ===== 全局基础样式 ===== */
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: var(--bg-page);
  color: var(--text-primary);
  transition: background 0.3s, color 0.3s;
}

#app {
  height: 100%;
}

/* Element Plus 暗色适配 */
/* el-table 统一行背景（不交替） */
.el-table {
  --el-table-bg-color: transparent;
  --el-table-tr-bg-color: transparent;
  --el-table-header-bg-color: transparent;
  --el-table-border-color: var(--border-light);
  --el-table-text-color: var(--text-primary);
  --el-table-header-text-color: var(--text-secondary);
  --el-table-row-hover-bg-color: transparent;
}

.el-table__body tr.el-table__row--striped td {
  background-color: transparent !important;
}

.el-table__inner-wrapper {
  background: var(--bg-card);
  border-radius: var(--radius);
  transition: background 0.3s;
}

[data-theme="dark"] .el-table__inner-wrapper {
  background: rgba(255,255,255,0.03);
}

[data-theme="dark"] .el-dialog {
  --el-dialog-bg-color: #0f1524;
  --el-dialog-border-color: rgba(0,212,255,0.12);
}

[data-theme="dark"] .el-card {
  --el-card-bg-color: var(--bg-card);
  --el-card-border-color: var(--border-light);
}

[data-theme="dark"] .el-input__wrapper {
  background: rgba(255,255,255,0.04);
  border-color: rgba(0,212,255,0.12);
  box-shadow: none;
}

[data-theme="dark"] .el-input__inner {
  color: var(--text-primary);
}

[data-theme="dark"] .el-select__wrapper {
  background: rgba(255,255,255,0.04);
  border-color: rgba(0,212,255,0.12);
}

[data-theme="dark"] .el-form-item__label {
  color: var(--text-secondary);
}

[data-theme="dark"] .el-divider {
  border-color: var(--border-light);
}

/* 移除 el-table 鼠标移入高亮 */
.el-table__body tr:hover > td {
  background-color: transparent !important;
}

.el-table__body tr.current-row > td,
.el-table__body tr.el-table__row--striped.current-row > td {
  background-color: transparent !important;
}
</style>
