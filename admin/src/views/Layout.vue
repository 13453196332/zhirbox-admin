<template>
  <el-container style="height:100vh">
    <!-- 侧边栏 -->
    <el-aside width="220px" style="background:#0a0f1e;border-right:1px solid rgba(0,212,255,0.1)">
      <div class="logo-bar">
        <span class="logo">♦ 纸盒人</span>
        <span class="version">v1.0</span>
      </div>
      <el-menu
        :default-active="route.path"
        router
        background-color="#0a0f1e"
        text-color="#94a3b8"
        active-text-color="#00d4ff"
      >
        <el-menu-item index="/dashboard"><el-icon><Odometer /></el-icon>仪表盘</el-menu-item>
        <el-menu-item index="/tools"><el-icon><Tools /></el-icon>工具卡片</el-menu-item>
        <el-menu-item index="/projects"><el-icon><Folder /></el-icon>项目经历</el-menu-item>
        <el-menu-item index="/work"><el-icon><Briefcase /></el-icon>工作经历</el-menu-item>
        <el-menu-item index="/skills"><el-icon><TrendCharts /></el-icon>技能管理</el-menu-item>
        <el-menu-item index="/config"><el-icon><Setting /></el-icon>站点配置</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部栏 -->
      <el-header style="background:#0a0f1e;border-bottom:1px solid rgba(0,212,255,0.1);display:flex;align-items:center;justify-content:flex-end;padding:0 24px;height:56px">
        <span style="color:#94a3b8;margin-right:16px;font-size:0.9rem">{{ username }}</span>
        <el-button size="small" @click="logout">退出</el-button>
      </el-header>

      <!-- 内容区 -->
      <el-main style="background:#060b18;padding:24px">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Odometer, Tools, Folder, Briefcase, TrendCharts, Setting } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const username = ref(localStorage.getItem('zhir_admin_user') || 'admin')

function logout() {
  localStorage.removeItem('zhir_admin_token')
  localStorage.removeItem('zhir_admin_user')
  router.push('/login')
}
</script>

<style scoped>
.logo-bar { padding: 20px 20px 12px; border-bottom: 1px solid rgba(0,212,255,0.08); margin-bottom: 8px; }
.logo { color: #00d4ff; font-weight: 800; font-size: 1.2rem; display: block; }
.version { color: #64748b; font-size: 0.75rem; }
.el-menu { border-right: none; }
.el-main { overflow-y: auto; }
</style>
