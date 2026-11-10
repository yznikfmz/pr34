<script setup>
import { useFavoritesStore } from './stores/favorites'

const favoritesStore = useFavoritesStore()
</script>
<template>
  <div class="app">
    <nav>
      <RouterLink to="/">Каталог</RouterLink>
      <RouterLink to="/cart">Корзина</RouterLink>
      <span>Избранное: {{ favoritesStore.count }}</span>
    </nav>

    <RouterView />
  </div>
</template>