<script setup lang="ts">
import { fetchCustomBackendError } from '@/service/api';

async function logout() {
  await fetchCustomBackendError('8888', '用户状态失效，请重新登录');
}

async function logoutWithModal() {
  await fetchCustomBackendError('7777', '用户状态失效，请重新登录');
}

async function refreshToken() {
  await fetchCustomBackendError('9999', 'token已过期');
}

async function handleRepeatedMessageError() {
  await Promise.all([
    fetchCustomBackendError('2222', '自定义请求错误 1'),
    fetchCustomBackendError('2222', '自定义请求错误 1'),
    fetchCustomBackendError('2222', '自定义请求错误 1'),
    fetchCustomBackendError('3333', '自定义请求错误 2'),
    fetchCustomBackendError('3333', '自定义请求错误 2'),
    fetchCustomBackendError('3333', '自定义请求错误 2')
  ]);
}

async function handleRepeatedModalError() {
  await Promise.all([
    fetchCustomBackendError('7777', '用户状态失效，请重新登录'),
    fetchCustomBackendError('7777', '用户状态失效，请重新登录'),
    fetchCustomBackendError('7777', '用户状态失效，请重新登录')
  ]);
}
</script>

<template>
  <NSpace vertical :size="16">
    <NCard title="请求失败后登出用户" :bordered="false" size="small" segmented class="card-wrapper">
      <NButton @click="logout">触发</NButton>
    </NCard>
    <NCard title="请求失败后弹出模态框再登出用户" :bordered="false" size="small" segmented class="card-wrapper">
      <NButton @click="logoutWithModal">触发</NButton>
    </NCard>
    <NCard title="请求的token已过期，刷新token" :bordered="false" size="small" segmented class="card-wrapper">
      <NButton @click="refreshToken">触发</NButton>
    </NCard>
    <NCard title="重复请求错误只出现一次" :bordered="false" size="small" segmented class="card-wrapper">
      <NButton @click="handleRepeatedMessageError">重复请求错误(Message)</NButton>
      <NButton class="ml-12px" @click="handleRepeatedModalError">重复请求错误(Modal)</NButton>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
