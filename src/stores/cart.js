import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart_items')) || [],
    warning: '',
    lastItems: null,
  }),

  getters: {
    count: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),

    sum: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),

    canUndo: (state) => state.lastItems !== null,
  },

  actions: {
    rememberState() {
      this.lastItems = JSON.parse(JSON.stringify(this.items))
    },

    addToCart(product) {
      if (this.count >= 10) {
        this.warning = 'В корзине может быть не больше 10 товаров.'
        return
      }

      this.rememberState()
      this.warning = ''

      const existingItem = this.items.find((item) => item.id === product.id)

      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.items.push({ ...product, quantity: 1 })
      }

      this.saveToLocalStorage()
    },

    removeFromCart(id) {
      if (!this.items.some((item) => item.id === id)) return

      this.rememberState()
      this.items = this.items.filter((item) => item.id !== id)
      this.warning = ''
      this.saveToLocalStorage()
    },

    clearCart() {
      if (this.items.length === 0) return

      this.rememberState()
      this.items = []
      this.warning = ''
      this.saveToLocalStorage()
    },

    updateQuantity(id, delta) {
      const item = this.items.find((item) => item.id === id)
      if (!item) return

      if (delta > 0 && this.count + delta > 10) {
        this.warning = 'В корзине может быть не больше 10 товаров.'
        return
      }

      this.rememberState()
      this.warning = ''
      item.quantity += delta

      if (item.quantity <= 0) {
        this.items = this.items.filter((cartItem) => cartItem.id !== id)
      }

      this.saveToLocalStorage()
    },

    undoLastAction() {
      if (this.lastItems === null) return

      this.items = this.lastItems
      this.lastItems = null
      this.warning = ''
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('cart_items', JSON.stringify(this.items))
    },
  },
})