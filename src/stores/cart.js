import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart_items')) || [],
  }),

  getters: {
    count: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),

    sum: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
  },

  actions: {
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }

      this.saveToLocalStorage()
    },

    removeFromCart(id) {
      this.items = this.items.filter((item) => item.id !== id)
      this.saveToLocalStorage()
    },

    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },

    updateQuantity(id, delta) {
      const item = this.items.find((item) => item.id === id)
      if (!item) return

      item.quantity += delta

      if (item.quantity <= 0) {
        this.removeFromCart(id)
      } else {
        this.saveToLocalStorage()
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('cart_items', JSON.stringify(this.items))
    },
  },
})