import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    ids: JSON.parse(localStorage.getItem('favorite_ids')) || [],
  }),

  getters: {
    count: (state) => state.ids.length,
  },

  actions: {
    toggle(id) {
      if (this.ids.includes(id)) {
        this.ids = this.ids.filter((itemId) => itemId !== id)
      } else {
        this.ids.push(id)
      }

      localStorage.setItem('favorite_ids', JSON.stringify(this.ids))
    },
  },
})