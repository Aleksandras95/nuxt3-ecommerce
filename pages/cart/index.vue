<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
cartStore.loadCart()

function handleRemove(productId) {
  cartStore.removeFromCart(productId)
}
</script>

<template>
  <div class="p-8">
    <NuxtLink to="/" class="text-blue-500 hover:underline mb-6 inline-block">← Back to shop</NuxtLink>

    <h1 class="text-3xl font-bold mb-8">Cart</h1>

    <div v-if="cartStore.cartItems.length > 0" class="space-y-4">
      <div 
        v-for="item in cartStore.cartItems" 
        :key="item.id" 
        class="flex items-center justify-between border p-4 rounded"
      >
        <div>
          <h2 class="text-xl font-semibold">{{ item.title }}</h2>
          <p>Price: ${{ item.price }}</p>
          <p>Quantity: {{ item.quantity }}</p>
        </div>
        <button 
          @click="handleRemove(item.id)" 
          class="text-red-500 hover:text-red-700"
        >
          X
        </button>
      </div>

      <div class="text-right mt-8">
        <button 
          @click="cartStore.clearCart" 
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear cart
        </button>
      </div>
      <NuxtLink 
        to="/checkout" 
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 block text-center mt-8"
        >
        Checkout
      </NuxtLink>
    </div>

    <div v-else class="text-center text-gray-500">
      Cart is empty
    </div>
  </div>
</template>
