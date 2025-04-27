import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: []
  }),
  actions: {
    addToCart(product) {
      const existing = this.cartItems.find(item => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        this.cartItems.push({ ...product, quantity: 1 })
      }
      this.saveCart()
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId)
      this.saveCart()
    },
    clearCart() {
      this.cartItems = []
      this.saveCart()
    },
    saveCart() {
      if (process.client) {
        localStorage.setItem('cart', JSON.stringify(this.cartItems))
      }
    },
    loadCart() {
      if (process.client) {
        const cart = localStorage.getItem('cart')
        if (cart) {
          this.cartItems = JSON.parse(cart)
        }
      }
    }
  }
})
