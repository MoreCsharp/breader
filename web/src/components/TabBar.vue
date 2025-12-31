<template>
  <nav class="tab-bar">
    <router-link to="/" class="tab-item" active-class="active">
      <span class="icon">📚</span>
      <span class="label">书架</span>
    </router-link>
    <router-link to="/search" class="tab-item" active-class="active">
      <span class="icon">🔍</span>
      <span class="label">搜索</span>
    </router-link>
    <router-link to="/sources" class="tab-item" active-class="active">
      <span class="icon">⚙️</span>
      <span class="label">书源</span>
    </router-link>
  </nav>
</template>

<style scoped lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  display: flex;
  z-index: 100;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  text-decoration: none;
  transition: color var(--transition-fast);

  &.active {
    color: var(--color-primary);
  }

  .icon {
    font-size: 20px;
    margin-bottom: 2px;
  }

  .label {
    font-size: 12px;
  }
}
</style>
