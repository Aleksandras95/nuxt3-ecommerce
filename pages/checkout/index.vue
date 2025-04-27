<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const router = useRouter()

const name = ref('')
const phone = ref('')
const address = ref('')
const error = ref('')
const success = ref(false)

function submitOrder() {
  if (!name.value || !phone.value || !address.value) {
    error.value = 'Please fill all the fields.'
    return
  }

  if (cartStore.cartItems.length === 0) {
    error.value = 'Your cart is empty.'
    return
  }

  // Usually here making request to server, but for now we clear a cart
  cartStore.clearCart()
  success.value = true

  // After 2 seconds redirecting to homepage
  setTimeout(() => {
    router.push('/')
  }, 2000)
}
</script>

<template>
  <div class="pt-32 pb-24">
    <div class="container mx-auto">
        <NuxtLink to="/" class="text-blue-500 hover:underline mb-6 inline-block">← Back to shop</NuxtLink>

    <h1 class="text-3xl font-bold mb-8">Checkout</h1>

    <div v-if="success" class="bg-green-100 text-green-700 p-4 rounded mb-6">
        Order successfully placed! Redirecting to the main page...
    </div>

    <form @submit.prevent="submitOrder" v-else class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">Name</label>
        <input v-model="name" type="text" class="border rounded w-full p-2" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Phone number</label>
        <input v-model="phone" type="text" class="border rounded w-full p-2" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Address</label>
        <textarea v-model="address" class="border rounded w-full p-2"></textarea>
      </div>

      <div v-if="error" class="bg-red-100 text-red-700 p-2 rounded">
        {{ error }}
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
        Submit order
      </button>
    </form>
    </div>
  </div>
</template>
