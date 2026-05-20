<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside width="220px" class="layout-aside">
      <div class="logo-bar">
        <span class="logo">♦ 纸盒人</span>
        <span class="version">v1.0</span>
      </div>
      <el-menu
        :default-active="route.path"
        router
        class="aside-menu"
      >
        <el-menu-item index="/dashboard"><el-icon><Odometer /></el-icon>仪表盘</el-menu-item>
        <el-menu-item index="/tools"><el-icon><Tools /></el-icon>工具卡片</el-menu-item>
        <el-menu-item index="/projects"><el-icon><Folder /></el-icon>项目经历</el-menu-item>
        <el-menu-item index="/work"><el-icon><Briefcase /></el-icon>工作经历</el-menu-item>
        <el-menu-item index="/skills"><el-icon><TrendCharts /></el-icon>技能管理</el-menu-item>
        <el-menu-item index="/config"><el-icon><Setting /></el-icon>站点配置</el-menu-item>
        <el-menu-item index="/tech-overview"><el-icon><Monitor /></el-icon>技术介绍</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部栏 -->
      <el-header class="layout-header">
        <span class="header-title">后台管理</span>
        <div class="header-right">
          <span class="user-name">{{ username }}</span>
          <el-button
            size="small"
            circle
            class="theme-btn"
            @click="toggleTheme"
            :title="isDark ? '切换到亮色' : '切换到暗色'"
          >
            <el-icon :size="16">
              <Moon v-if="isDark" />
              <Sunny v-else />
            </el-icon>
          </el-button>
          <el-button size="small" class="logout-btn" @click="logout">退出</el-button>
        </div>
      </el-header>

      <!-- 内容区 -->
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { Odometer, Tools, Folder, Briefcase, TrendCharts, Setting, Monitor, Moon, Sunny } from '@element-plus/icons-vue'
import { useTheme } from '../composables/useTheme.js'

const route = useRoute()
const router = useRouter()
const { isDark, toggleTheme } = useTheme()
const username = localStorage.getItem('zhir_admin_user') || 'admin'

function logout() {
  localStorage.removeItem('zhir_admin_token')
  localStorage.removeItem('zhir_admin_user')
  router.push('/login')
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

/* ===== 侧边栏 ===== */
.layout-aside {
  background: var(--bg-aside);
  border-right: 1px solid var(--border-aside);
  transition: background 0.3s, border-color 0.3s;
  overflow: hidden;
}

.logo-bar {
  padding: 20px 20px 12px;
  border-bottom: 1px solid var(--border-aside);
  margin-bottom: 8px;
  transition: border-color 0.3s;
}

.logo {
  color: var(--accent-cyan);
  font-weight: 800;
  font-size: 1.2rem;
  display: block;
  transition: color 0.3s;
}

.version {
  color: var(--text-muted);
  font-size: 0.75rem;
}

.aside-menu {
  border-right: none !important;
  --el-menu-bg-color: var(--bg-aside);
  --el-menu-text-color: var(--text-aside);
  --el-menu-active-color: var(--text-aside-active);
  --el-menu-hover-bg-color: rgba(255,255,255,0.05);
  --el-menu-hover-text-color: var(--text-aside-active);
}

.aside-menu .el-menu-item {
  transition: all 0.2s;
}

.aside-menu .el-menu-item.is-active {
  background: rgba(0,212,255,0.08) !important;
}

/* ===== 顶部栏 ===== */
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 56px;
  background: var(--bg-header);
  border-bottom: 1px solid var(--border-light);
  transition: background 0.3s, border-color 0.3s;
}

.header-title {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.theme-btn {
  border: 1px solid var(--border-light);
  background: var(--bg-card);
  color: var(--text-secondary);
  transition: all 0.3s;
}

.theme-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.logout-btn {
  transition: all 0.3s;
}

/* ===== 内容区 ===== */
.layout-main {
  background: var(--bg-page);
  transition: background 0.3s;
  overflow-y: auto;
}
</style>
