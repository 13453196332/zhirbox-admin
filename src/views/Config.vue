<template>
  <div>
    <h2 class="page-title">站点配置</h2>
    <el-card shadow="never" class="config-card">
      <el-form :model="config" label-width="120px" label-position="left">
        <el-form-item label="站点名称"><el-input v-model="config.site_name" /></el-form-item>
        <el-form-item label="Hero 徽标"><el-input v-model="config.hero_badge" /></el-form-item>
        <el-form-item label="Hero 标题"><el-input v-model="config.hero_title" type="textarea" :rows="2" /></el-form-item>
        <el-form-item label="Hero 副标题"><el-input v-model="config.hero_subtitle" type="textarea" :rows="2" /></el-form-item>
        <el-form-item label="页脚副文本"><el-input v-model="config.footer_text" /></el-form-item>
        <el-divider content-position="left">联系方式</el-divider>
        <el-form-item label="邮箱"><el-input v-model="config.contact_email" /></el-form-item>
        <el-form-item label="Steam 链接"><el-input v-model="config.contact_steam" /></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save" :loading="saving">保存配置</el-button>
          <el-tag v-if="saved" type="success" style="margin-left:12px">已保存</el-tag>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/index.js'

const config = ref({})
const saving = ref(false)
const saved = ref(false)

onMounted(async () => {
  config.value = await api.get('/config')
})

async function save() {
  saving.value = true
  await api.put('/config', config.value)
  saving.value = false
  saved.value = true
  setTimeout(() => saved.value = false, 2000)
}
</script>

<style scoped>
.page-title {
  color: var(--text-primary);
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: 600;
  transition: color 0.3s;
}

.config-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  max-width: 700px;
  transition: background 0.3s, border-color 0.3s;
}

.config-card :deep(.el-divider__text) {
  color: var(--text-secondary);
}
</style>
