<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">技能管理</h2>
      <el-button type="primary" @click="openDialog()">新增技能</el-button>
    </div>
    <el-table :data="list" stripe style="width:100%">
      <el-table-column prop="sort_order" label="排序" width="70" />
      <el-table-column prop="name" label="技能名称" />
      <el-table-column label="熟练度" width="250">
        <template #default="{ row }">
          <div class="skill-progress">
            <el-progress :percentage="row.level" :stroke-width="8" style="flex:1" />
            <span class="skill-percent">{{ row.level }}%</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="分类" width="100" />
      <el-table-column label="操作" width="160">
        <template #default="{ row }">
          <div class="action-group">
            <el-button size="small" @click="openDialog(row)">编辑</el-button>
            <el-popconfirm title="确定删除？" @confirm="del(row.id)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑技能' : '新增技能'" width="450px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="熟练度">
          <el-slider v-model="form.level" :min="0" :max="100" show-input />
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.category">
            <el-option label="前端" value="frontend" />
            <el-option label="AI" value="ai" />
            <el-option label="工具" value="tools" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
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
const form = ref({ name: '', level: 70, category: 'frontend', sort_order: 0 })

async function load() { list.value = await api.get('/skills') }
onMounted(load)

function openDialog(row) {
  if (row) { isEdit.value = true; form.value = { ...row } }
  else { isEdit.value = false; form.value = { name: '', level: 70, category: 'frontend', sort_order: 0 } }
  dialogVisible.value = true
}

async function save() {
  if (isEdit.value) await api.put(`/skills/${form.value.id}`, form.value)
  else await api.post('/skills', form.value)
  dialogVisible.value = false
  load()
}

async function del(id) {
  await api.delete(`/skills/${id}`)
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

.skill-progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.skill-percent {
  color: var(--text-muted);
  font-size: 0.85rem;
  width: 40px;
}

.action-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
