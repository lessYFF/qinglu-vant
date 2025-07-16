# FaceTaskDate

任务日期组件，用于显示和管理任务的日期信息。

## 基础用法

```vue
<template>
  <FaceTaskDate
    :task-date="taskDate"
    :task-type="taskType"
    @date-change="handleDateChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceTaskDate } from 'qinglu-vant'

const taskDate = ref(new Date())
const taskType = ref('pickup')

const handleDateChange = (date) => {
  console.log('日期变化:', date)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| taskDate | 任务日期 | Date \| String | - |
| taskType | 任务类型 | String | - |
| editable | 是否可编辑 | Boolean | true |
| format | 日期格式 | String | 'YYYY-MM-DD HH:mm' |

#### taskType 可选值

| 值 | 说明 |
|---|------|
| pickup | 取车任务 |
| return | 还车任务 |
| inspection | 检查任务 |
| maintenance | 维护任务 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| date-change | 日期变化时触发 | date: 新日期 |
| task-complete | 任务完成时触发 | taskInfo: 任务信息 |

## 示例

### 基础任务日期

```vue
<template>
  <div class="task-date-demo">
    <van-cell-group>
      <van-cell title="任务类型">
        <template #value>
          <van-radio-group v-model="currentTaskType" direction="horizontal">
            <van-radio name="pickup">取车</van-radio>
            <van-radio name="return">还车</van-radio>
            <van-radio name="inspection">检查</van-radio>
          </van-radio-group>
        </template>
      </van-cell>
    </van-cell-group>

    <FaceTaskDate
      :task-date="currentTaskDate"
      :task-type="currentTaskType"
      :editable="isEditable"
      @date-change="handleDateChange"
      @task-complete="handleTaskComplete"
    />

    <div class="task-info">
      <p><strong>任务类型:</strong> {{ getTaskTypeText(currentTaskType) }}</p>
      <p><strong>任务日期:</strong> {{ formatDate(currentTaskDate) }}</p>
      <p><strong>是否可编辑:</strong> {{ isEditable ? '是' : '否' }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentTaskDate = ref(new Date())
const currentTaskType = ref('pickup')
const isEditable = ref(true)

const taskTypeMap = {
  pickup: '取车任务',
  return: '还车任务',
  inspection: '检查任务',
  maintenance: '维护任务'
}

const handleDateChange = (date) => {
  currentTaskDate.value = date
  console.log('日期变化:', date)
}

const handleTaskComplete = (taskInfo) => {
  console.log('任务完成:', taskInfo)
}

const getTaskTypeText = (type) => {
  return taskTypeMap[type] || type
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN')
}
</script>

<style scoped>
.task-date-demo {
  padding: 16px;
}

.task-info {
  margin-top: 16px;
  padding: 16px;
  background: #f7f8fa;
  border-radius: 8px;
}

.task-info p {
  margin: 8px 0;
  font-size: 14px;
  color: #646566;
}
</style>
```

### 任务列表

```vue
<template>
  <div class="task-list-demo">
    <h3>今日任务</h3>

    <div
      v-for="task in taskList"
      :key="task.id"
      class="task-item"
    >
      <van-cell-group>
        <van-cell
          :title="`任务 ${task.id}`"
          :label="getTaskTypeText(task.type)"
        />
      </van-cell-group>

      <FaceTaskDate
        :task-date="task.date"
        :task-type="task.type"
        :editable="task.editable"
        @date-change="(date) => updateTaskDate(task.id, date)"
        @task-complete="(taskInfo) => completeTask(task.id, taskInfo)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const taskList = ref([
  {
    id: 'T001',
    type: 'pickup',
    date: new Date('2024-01-15 09:00'),
    editable: true
  },
  {
    id: 'T002',
    type: 'return',
    date: new Date('2024-01-15 14:00'),
    editable: true
  },
  {
    id: 'T003',
    type: 'inspection',
    date: new Date('2024-01-15 16:00'),
    editable: false
  }
])

const taskTypeMap = {
  pickup: '取车任务',
  return: '还车任务',
  inspection: '检查任务',
  maintenance: '维护任务'
}

const updateTaskDate = (taskId, newDate) => {
  const task = taskList.value.find(t => t.id === taskId)
  if (task) {
    task.date = newDate
    console.log(`任务 ${taskId} 日期更新为:`, newDate)
  }
}

const completeTask = (taskId, taskInfo) => {
  console.log(`任务 ${taskId} 完成:`, taskInfo)
}

const getTaskTypeText = (type) => {
  return taskTypeMap[type] || type
}
</script>

<style scoped>
.task-list-demo {
  padding: 16px;
}

.task-list-demo h3 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #323233;
}

.task-item {
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
```

## 特性

- 📅 **日期管理**: 支持任务日期的显示和编辑
- 🏷️ **任务类型**: 支持多种任务类型标识
- ✏️ **可编辑性**: 支持控制日期是否可编辑
- 🎯 **任务完成**: 支持标记任务完成状态
- 📱 **移动端优化**: 适合移动端的日期选择界面
- 🔄 **实时更新**: 日期变化时实时触发事件
