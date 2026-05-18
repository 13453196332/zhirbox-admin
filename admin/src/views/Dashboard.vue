<template>
  <div>
    <h2 style="color:#f1f5f9;margin-bottom:24px">仪表盘</h2>
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in stats" :key="item.label">
        <el-card shadow="never" style="background:rgba(255,255,255,0.04);border:1px solid rgba(0,212,255,0.12);color:#f1f5f9;margin-bottom:20px">
          <p style="color:#94a3b8;font-size:0.85rem;margin-bottom:4px">{{ item.label }}</p>
          <p style="font-size:2rem;font-weight:700;color:#00d4ff">{{ item.count }}</p>
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
