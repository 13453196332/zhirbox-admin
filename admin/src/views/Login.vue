<template>
  <div class="login-page">
    <div class="login-card">
      <h1>♦ 纸盒人</h1>
      <p class="sub">后台管理系统</p>
      <el-form @submit.prevent="handleLogin">
        <el-input v-model="username" placeholder="用户名" prefix-icon="User" style="margin-bottom:16px" />
        <el-input v-model="password" type="password" placeholder="密码" prefix-icon="Lock" style="margin-bottom:24px" show-password />
        <el-button type="primary" native-type="submit" :loading="loading" style="width:100%">登录</el-button>
      </el-form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/index.js'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const data = await api.post('/auth/login', { username: username.value, password: password.value })
    localStorage.setItem('zhir_admin_token', data.token)
    localStorage.setItem('zhir_admin_user', data.username)
    router.push('/')
  } catch (e) {
    error.value = e.response?.data?.error || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #0a0f1e, #1a1a2e);
}
.login-card {
  background: rgba(255,255,255,0.05); backdrop-filter: blur(20px);
  border: 1px solid rgba(0,212,255,0.15); border-radius: 20px;
  padding: 40px; width: 380px; text-align: center;
}
.login-card h1 { color: #00d4ff; font-size: 1.8rem; margin-bottom: 4px; }
.login-card .sub { color: #94a3b8; margin-bottom: 32px; font-size: 0.9rem; }
.error { color: #ef4444; margin-top: 12px; font-size: 0.85rem; }
</style>
