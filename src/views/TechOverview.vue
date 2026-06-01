<template>
  <div>
    <div class="page-header">
      <h2 class="page-title">技术介绍管理</h2>
      <el-button type="primary" @click="openDialog()">新增章节</el-button>
    </div>

    <el-table :data="list" stripe style="width:100%" @row-dblclick="openDialog">
      <el-table-column prop="sort_order" label="排序" width="70" />
      <el-table-column prop="section_key" label="标识" width="120" />
      <el-table-column prop="title" label="标题" min-width="180" />
      <el-table-column prop="content" label="内容预览" min-width="300" show-overflow-tooltip>
        <template #default="{ row }">
          <span v-html="stripHtml(row.content).substring(0, 120)"></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
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

    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑章节' : '新增章节'" width="700px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标识 key">
          <el-input v-model="form.section_key" :disabled="isEdit" placeholder="英文标识，如 frontend" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="如：前端页面展示" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort_order" :min="0" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="12"
            placeholder="支持 HTML 格式，如 &lt;p&gt;...&lt;/p&gt; &lt;ul&gt;&lt;li&gt;...&lt;/li&gt;&lt;/ul&gt;"
          />
        </el-form-item>
        <el-form-item label="预览">
          <div class="preview-box" v-html="form.content || '暂无内容'"></div>
        </el-form-item>
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
const form = ref({ section_key: '', title: '', content: '', sort_order: 0 })

async function load() { list.value = await api.get('/tech-overview') }
onMounted(load)

function openDialog(row) {
  if (row) {
    isEdit.value = true
    form.value = { ...row }
  } else {
    isEdit.value = false
    form.value = { section_key: '', title: '', content: '', sort_order: 0 }
  }
  dialogVisible.value = true
}

async function save() {
  if (isEdit.value) {
    await api.put(`/tech-overview/${form.value.id}`, form.value)
  } else {
    await api.post('/tech-overview', form.value)
  }
  dialogVisible.value = false
  load()
}

async function del(id) {
  await api.delete(`/tech-overview/${id}`)
  load()
}

function stripHtml(html) {
  const div = document.createElement('div')
  div.innerHTML = html || ''
  return div.textContent || div.innerText || ''
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

.preview-box {
  background: var(--bg-glass);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  padding: 16px;
  max-height: 300px;
  overflow-y: auto;
  color: var(--text-primary);
  font-size: 0.9rem;
  line-height: 1.7;
}

.preview-box ul {
  padding-left: 20px;
}

.preview-box li {
  margin-bottom: 4px;
}

.preview-box strong {
  color: var(--accent-cyan, #00d4ff);
}

.preview-box code {
  background: rgba(0, 212, 255, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85em;
}

.action-group {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
