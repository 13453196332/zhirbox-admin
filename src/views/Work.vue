<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">工作经历管理</h2>
      <el-button type="primary" @click="openDialog()">新增经历</el-button>
    </div>
    <el-table :data="list" stripe style="width:100%">
      <el-table-column prop="sort_order" label="排序" width="70" />
      <el-table-column prop="company" label="公司" min-width="160" />
      <el-table-column prop="role" label="职位" width="140" />
      <el-table-column label="时间" width="200">
        <template #default="{ row }">{{ row.start_date }} ~ {{ row.end_date || '至今' }}</template>
      </el-table-column>
      <el-table-column label="职责标签" min-width="180">
        <template #default="{ row }">
          <el-tag v-for="d in row.duties" :key="d" size="small" style="margin-right:4px">{{ d }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button size="small" @click="openDialog(row)">编辑</el-button>
          <el-popconfirm title="确定删除？" @confirm="del(row.id)"><el-button size="small" type="danger">删除</el-button></el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑经历' : '新增经历'" width="600px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="公司"><el-input v-model="form.company" /></el-form-item>
        <el-form-item label="职位"><el-input v-model="form.role" /></el-form-item>
        <el-row :gutter="16">
          <el-col :span="12"><el-form-item label="开始"><el-input v-model="form.start_date" placeholder="2021.08" /></el-form-item></el-col>
          <el-col :span="12"><el-form-item label="结束"><el-input v-model="form.end_date" placeholder="2023.02 或留空" /></el-form-item></el-col>
        </el-row>
        <el-form-item label="职责标签">
          <el-select v-model="form.duties" multiple filterable allow-create default-first-option style="width:100%">
            <el-option v-for="t in availableDuties" :key="t" :label="t" :value="t" />
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
const availableDuties = ['Vue 技术栈','ElementUI','跨平台开发','兼容性测试','Vue / jQuery','微信小程序','PC + 移动端','性能优化','UI 还原','接口联调']
const form = ref({ company: '', role: '', start_date: '', end_date: '', duties: [], sort_order: 0 })

async function load() { list.value = await api.get('/work') }
onMounted(load)

function openDialog(row) {
  if (row) { isEdit.value = true; form.value = { ...row, duties: row.duties || [] } }
  else { isEdit.value = false; form.value = { company: '', role: '', start_date: '', end_date: '', duties: [], sort_order: 0 } }
  dialogVisible.value = true
}

async function save() {
  if (isEdit.value) await api.put(`/work/${form.value.id}`, form.value)
  else await api.post('/work', form.value)
  dialogVisible.value = false
  load()
}

async function del(id) {
  await api.delete(`/work/${id}`)
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
