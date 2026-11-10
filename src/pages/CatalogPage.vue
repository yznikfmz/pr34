<script setup>
import { useFavoritesStore } from '../stores/favorites'

const favoritesStore = useFavoritesStore()
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const products = [
  { id: 1, name: 'Ноутбук', price: 75000 },
  { id: 2, name: 'Смартфон', price: 35000 },
  { id: 3, name: 'Наушники', price: 5000 },
  { id: 4, name: 'Клавиатура', price: 4000 },
]

function addToCart(product) {
  cartStore.addToCart(product)
}
</script>

<template>
    <p v-if="cartStore.warning" class="warning">
        {{ cartStore.warning }}
    </p>
  <main class="page">
    <h1>Каталог товаров</h1>
    <p>
      <RouterLink to="/cart">
        Перейти в корзину ({{ cartStore.count }} шт.)
      </RouterLink>
    </p>

    <div class="products-grid">
      <article
        v-for="product in products"
        :key="product.id"
        class="product-card"
      >
        <h2>{{ product.name }}</h2>
        <p>{{ product.price.toLocaleString('ru-RU') }} ₽</p>
        <button class="btn-add" @click="addToCart(product)">
          В корзину
        </button>
        <button @click="favoritesStore.toggle(product.id)">
            {{favoritesStore.ids.includes(product.id) ? 'Убрать из избранного' : 'В избранное'}}
             </button>
      </article>
    </div>
  </main>
</template>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.product-card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.btn-add {
  padding: 8px 16px;
  border: 0;
  border-radius: 4px;
  background: #42b983;
  color: white;
  cursor: pointer;
}
.warning {
  color: #c62828;
  font-weight: bold;
}
</style>