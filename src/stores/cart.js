import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart_items')) || [],
    warning: '',
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
      if (this.count >= 10) {
        this.warning = 'В корзине может быть не больше 10 товаров.'
        return
      }
      this.warning = ''

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
      if (delta > 0 && this.count >= 10) {
         this.warning = 'В корзине может быть не больше 10 товаров.'
         return
        }
        this.warning = ''
      item.quantity += delta

      if (item.quantity <= 0) {
        this.removeFromCart(id)
        this.warning = ''
      } else {
        this.saveToLocalStorage()
        this.warning = ''
      }
    },

    saveToLocalStorage() {
      localStorage.setItem('cart_items', JSON.stringify(this.items))
    },
  },
})