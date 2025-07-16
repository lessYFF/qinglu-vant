# FaceRoles

角色权限组件，用于管理和显示用户角色权限。

## 基础用法

```vue
<template>
  <FaceRoles
    :roles="userRoles"
    :permissions="userPermissions"
  />
</template>

<script setup>
import { ref } from 'vue'
import { FaceRoles } from 'qinglu-vant'

const userRoles = ref(['admin', 'manager'])
const userPermissions = ref(['read', 'write', 'delete'])
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| roles | 用户角色列表 | Array | [] |
| permissions | 用户权限列表 | Array | [] |
| showPermissions | 是否显示权限详情 | Boolean | true |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| role-change | 角色变化时触发 | roles: 角色列表 |

## 示例

### 角色权限展示

```vue
<template>
  <div class="roles-demo">
    <van-cell-group>
      <van-cell title="当前用户" :value="currentUser.name" />
    </van-cell-group>

    <FaceRoles
      :roles="currentUser.roles"
      :permissions="currentUser.permissions"
      :show-permissions="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentUser = ref({
  name: '张三',
  roles: ['店长', '司机'],
  permissions: ['订单管理', '车辆管理', '司机调度', '财务查看']
})
</script>
```

### 权限检查

```vue
<template>
  <div class="permission-check">
    <FaceRoles
      :roles="userRoles"
      :permissions="userPermissions"
      @role-change="handleRoleChange"
    />

    <div class="action-buttons">
      <van-button
        v-if="hasPermission('order_create')"
        type="primary"
      >
        创建订单
      </van-button>

      <van-button
        v-if="hasPermission('vehicle_manage')"
        type="success"
      >
        车辆管理
      </van-button>

      <van-button
        v-if="hasPermission('finance_view')"
        type="warning"
      >
        财务报表
      </van-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userRoles = ref(['manager'])
const userPermissions = ref(['order_create', 'vehicle_manage', 'finance_view'])

const hasPermission = (permission) => {
  return userPermissions.value.includes(permission)
}

const handleRoleChange = (roles) => {
  console.log('角色变更:', roles)
}
</script>

<style scoped>
.action-buttons {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}
</style>
```

## 特性

- 👥 **角色管理**: 显示和管理用户角色
- 🔐 **权限控制**: 基于角色的权限控制
- 📊 **权限展示**: 清晰展示用户拥有的权限
- 🎯 **动态检查**: 支持动态权限检查
- 🔄 **实时更新**: 角色变化时实时更新权限
