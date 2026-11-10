<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <main class="page">
    <h1>Корзина</h1>
    <p v-if="cartStore.warning" class="warning">
        {{ cartStore.warning }}
    </p>
    <div class="cart-summary">
      <p><strong>Товаров:</strong> {{ cartStore.count }}</p>
      <p>
        <strong>Итого:</strong>
        {{ cartStore.sum.toLocaleString('ru-RU') }} ₽
      </p>
    </div>
    <button
    v-if="cartStore.canUndo"
    сlass="btn-undo"
    @click="cartStore.undoLastAction()"
    >
    Отменить последнее действие
</button>
    <ul v-if="cartStore.items.length" class="cart-list">
      <li
        v-for="item in cartStore.items"
        :key="item.id"
        class="cart-item"
      >
        <div>
          <strong>{{ item.name }}</strong>
          <span>
            {{ item.price.toLocaleString('ru-RU') }} ₽ ×
            {{ item.quantity }}
          </span>
        </div>

        <div class="item-actions">
          <button @click="cartStore.updateQuantity(item.id, -1)">−</button>
          <button @click="cartStore.updateQuantity(item.id, 1)">+</button>
          <button @click="cartStore.removeFromCart(item.id)">Удалить</button>
        </div>
      </li>
    </ul>

    <p v-else>Корзина пуста.</p>

    <button
      v-if="cartStore.items.length"
      class="btn-clear"
      @click="cartStore.clearCart()"
    >
      Очистить корзину
    </button>

    <p class="note">Данные корзины сохраняются между перезагрузками страницы.</p>
  </main>
</template>

<style scoped>
.cart-summary {
  margin: 16px 0;
  padding: 16px;
  border-radius: 8px;
  background: #f5f5f5;
}

.cart-list {
  padding: 0;
  list-style: none;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
}

.cart-item span {
  display: block;
  margin-top: 4px;
  color: #666;
}

.item-actions {
  display: flex;
  gap: 6px;
}

.item-actions button,
.btn-clear {
  padding: 7px 10px;
  cursor: pointer;
}

.btn-clear {
  margin-top: 16px;
  background: #c62828;
  color: white;
  border: 0;
}

.note {
  margin-top: 20px;
  color: #666;
  font-size: 13px;
}
.warning {
  color: #c62828;
  font-weight: bold;
}
.btn-undo {
  margin-bottom: 16px;
  padding: 7px 10px;
  cursor: pointer;
}
@media (max-width: 520px) {
  .cart-item {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>