<script setup>
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()
const route = useRoute()

const product = productStore.getProductById(Number(route.params.id))
</script>

<template>
  <div class="p-8">
    <NuxtLink to="/" class="text-blue-500 hover:underline mb-4 inline-block">← Back to shop</NuxtLink>

    <div v-if="product" class="max-w-md mx-auto border p-6 rounded shadow">
      <img :src="product.image" alt="product" class="w-full h-60 object-cover mb-6" />
      <h1 class="text-2xl font-bold mb-4">{{ product.title }}</h1>
      <p class="text-gray-700 mb-4">${{ product.price }}</p>
      <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add to cart</button>
    </div>

    <div v-else class="text-center text-gray-500">
      No results
    </div>
  </div>
</template>
