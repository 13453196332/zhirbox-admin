<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">项目经历管理</h2>
      <el-button type="primary" @click="openDialog()">新增项目</el-button>
    </div>
    <el-table :data="list" stripe style="width:100%">
      <el-table-column prop="sort_order" label="排序" width="70" />
      <el-table-column prop="title" label="项目名称" min-width="180" />
      <el-table-column prop="role" label="角色" width="100" />
      <el-table-column prop="description" label="描述" show-overflow-tooltip />
      <el-table-column label="技术栈" min-width="180">
        <template #default="{ row }">
          <el-tag v-for="t in row.tech_tags" :key="t" size="small" style="margin-right:4px">{{ t }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button size="small" @click="openDialog(row)">编辑</el-button>
          <el-popconfirm title="确定删除？" @confirm="del(row.id)"><el-button size="small" type="danger">删除</el-button></el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑项目' : '新增项目'" width="600px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="项目名称"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="角色"><el-input v-model="form.role" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description" type="textarea" :rows="3" /></el-form-item>
        <el-form-item label="技术栈">
          <el-select v-model="form.tech_tags" multiple filterable allow-create default-first-option style="width:100%">
            <el-option v-for="t in availableTags" :key="t" :label="t" :value="t" />
          </el-select>
        </el-form-item>
        <el-form-item label="图标"><el-input v-model="form.icon" /></el-form-item>
        <el-form-item label="排序"><el-input-number v-model="form.sort_order" :min="0" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api/index.js'

const list = ref([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const availableTags = ['Vue.js','ElementUI','Axios','Vue Router','Vue2','Pinia','ECharts','UniApp','React','TypeScript']
const form = ref({ title: '', role: '', description: '', tech_tags: [], icon: 'code', sort_order: 0 })

async function load() { list.value = await api.get('/projects') }
onMounted(load)

function openDialog(row) {
  if (row) { isEdit.value = true; form.value = { ...row, tech_tags: row.tech_tags || [] } }
  else { isEdit.value = false; form.value = { title: '', role: '', description: '', tech_tags: [], icon: 'code', sort_order: 0 } }
  dialogVisible.value = true
}

async function save() {
  if (isEdit.value) await api.put(`/projects/${form.value.id}`, form.value)
  else await api.post('/projects', form.value)
  dialogVisible.value = false
  load()
}

async function del(id) {
  await api.delete(`/projects/${id}`)
  load()
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.page-title {
  color: var(--text-primary);
  font-size: 1.3rem;
  font-weight: 600;
  transition: color 0.3s;
  margin: 0;
}
</style>
