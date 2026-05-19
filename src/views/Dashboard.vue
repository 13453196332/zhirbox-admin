<template>
  <div>
    <h2 class="page-title">仪表盘</h2>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in stats" :key="item.label">
        <el-card shadow="never" class="stat-card">
          <p class="stat-label">{{ item.label }}</p>
          <p class="stat-count">{{ item.count }}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/index.js'

const stats = ref([
  { label: '工具卡片', count: 0 },
  { label: '项目经历', count: 0 },
  { label: '工作经历', count: 0 },
  { label: '技能', count: 0 },
])

onMounted(async () => {
  try {
    const [tools, projects, work, skills] = await Promise.all([
      api.get('/tools'), api.get('/projects'), api.get('/work'), api.get('/skills')
    ])
    stats.value = [
      { label: '工具卡片', count: tools.length },
      { label: '项目经历', count: projects.length },
      { label: '工作经历', count: work.length },
      { label: '技能', count: skills.length },
    ]
  } catch (e) {}
})
</script>

<style scoped>
.page-title {
  color: var(--text-primary);
  margin-bottom: 24px;
  font-size: 1.3rem;
  font-weight: 600;
  transition: color 0.3s;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  color: var(--text-primary);
  margin-bottom: 20px;
  transition: background 0.3s, border-color 0.3s, color 0.3s;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 4px;
  transition: color 0.3s;
}

.stat-count {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
  margin: 0;
  transition: color 0.3s;
}
</style>
