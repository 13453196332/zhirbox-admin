<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">工具卡片管理</h2>
      <el-button type="primary" @click="openDialog()">新增工具</el-button>
    </div>
    <el-table :data="list" stripe style="width:100%" @row-dblclick="openDialog">
      <el-table-column prop="sort_order" label="排序" width="70" />
      <el-table-column prop="icon" label="图标" width="80">
        <template #default="{ row }"><el-icon><component :is="row.icon" /></el-icon></template>
      </el-table-column>
      <el-table-column prop="title" label="名称" />
      <el-table-column prop="description" label="描述" show-overflow-tooltip />
      <el-table-column prop="url" label="链接" show-overflow-tooltip />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button size="small" @click="openDialog(row)">编辑</el-button>
          <el-popconfirm title="确定删除？" @confirm="del(row.id)"><el-button size="small" type="danger">删除</el-button></el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑工具' : '新增工具'" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description" type="textarea" :rows="3" /></el-form-item>
        <el-form-item label="链接"><el-input v-model="form.url" /></el-form-item>
        <el-form-item label="图标"><el-input v-model="form.icon" placeholder="icon 名称" /></el-form-item>
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
const form = ref({ title: '', description: '', url: '', icon: 'Link', sort_order: 0 })

async function load() { list.value = await api.get('/tools') }
onMounted(load)

function openDialog(row) {
  if (row) { isEdit.value = true; form.value = { ...row } }
  else { isEdit.value = false; form.value = { title: '', description: '', url: '', icon: 'Link', sort_order: 0 } }
  dialogVisible.value = true
}

async function save() {
  if (isEdit.value) await api.put(`/tools/${form.value.id}`, form.value)
  else await api.post('/tools', form.value)
  dialogVisible.value = false
  load()
}

async function del(id) {
  await api.delete(`/tools/${id}`)
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
