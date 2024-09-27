<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useLoading } from '@sa/hooks';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';
import { useTabStore } from '@/store/modules/tab';
import { useAuth } from '@/hooks/business/auth';

const route = useRoute();
const appStore = useAppStore();
const authStore = useAuthStore();
const tabStore = useTabStore();
const { hasAuth } = useAuth();
const { loading, startLoading, endLoading } = useLoading();

type AccountKey = 'super' | 'admin' | 'user';

interface Account {
  key: AccountKey;
  label: string;
  userName: string;
  password: string;
}

const accounts = computed<Account[]>(() => [
  {
    key: 'super',
    label: '超级管理员',
    userName: 'Super',
    password: '123456'
  },
  {
    key: 'admin',
    label: '管理员',
    userName: 'Admin',
    password: '123456'
  },
  {
    key: 'user',
    label: '普通用户',
    userName: 'User',
    password: '123456'
  }
]);

const loginAccount = ref<AccountKey>('super');

async function handleToggleAccount(account: Account) {
  loginAccount.value = account.key;

  startLoading();
  await authStore.login(account.userName, account.password, false);
  tabStore.initTabStore(route);
  endLoading();
  appStore.reloadPage();
}
</script>

<template>
  <NSpace vertical :size="16">
    <NCard title="切换权限" :bordered="false" size="small" segmented class="card-wrapper">
      <NDescriptions bordered :column="1">
        <NDescriptionsItem label="用户角色">
          <NSpace>
            <NTag v-for="role in authStore.userInfo.roles" :key="role">{{ role }}</NTag>
          </NSpace>
        </NDescriptionsItem>
        <NDescriptionsItem ions-item label="切换账号">
          <NSpace>
            <NButton
              v-for="account in accounts"
              :key="account.key"
              :loading="loading && loginAccount === account.key"
              :disabled="loading && loginAccount !== account.key"
              @click="handleToggleAccount(account)"
            >
              {{ account.label }}
            </NButton>
          </NSpace>
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>
    <NCard title="权限钩子函数 `hasAuth`" :bordered="false" size="small" segmented class="card-wrapper">
      <NSpace>
        <NButton v-if="hasAuth('B_CODE1')">超级管理员可见</NButton>
        <NButton v-if="hasAuth('B_CODE2')">管理员可见</NButton>
        <NButton v-if="hasAuth('B_CODE3')">管理员和用户可见</NButton>
      </NSpace>
    </NCard>
  </NSpace>
</template>

<style scoped></style>
