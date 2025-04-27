<script setup>
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()

const selectedCategory = ref('all')

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return productStore.products
  }
  return productStore.products.filter(product => product.category === selectedCategory.value)
})

const categories = ref([
  { label: 'All', value: 'all' },
  { label: 'Phones', value: 'phones' },
  { label: 'Laptops', value: 'laptops' },
  { label: 'Accessories', value: 'accessories' },
  { label: 'Tablets', value: 'tablets' }
])

const sortOrder = ref('default')

const sortedProducts = computed(() => {
  let products = filteredProducts.value.slice() // copy so as not to mutate the original array

  if (sortOrder.value === 'priceAsc') {
    products.sort((a, b) => a.price - b.price)
  } else if (sortOrder.value === 'priceDesc') {
    products.sort((a, b) => b.price - a.price)
  }

  return products
})

const searchQuery = ref('')

const searchedProducts = computed(() => {
  return sortedProducts.value.filter(product => 
    product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
    <div>
        <!-- Category filter -->
        <div class="flex gap-4 mb-8">
        <button 
            v-for="cat in categories" 
            :key="cat.value"
            @click="selectedCategory = cat.value"
            :class="[
            'px-4 py-2 rounded border',
            selectedCategory === cat.value ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            ]"
        >
            {{ cat.label }}
        </button>
        </div>
        <!-- Dropdown sort list -->
        <select v-model="sortOrder" class="border p-2 rounded">
            <option value="default">No sorting</option>
            <option value="priceAsc">Price: ascending</option>
            <option value="priceDesc">Price: descending</option>
        </select>
        <!---Search for products-->
        <div class="mb-8">
            <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search for products..." 
                class="border p-2 rounded w-full"
            />
        </div>
        <!---Products list-->
        <div class="grid grid-cols-3 gap-6">
            <Product v-for="product in searchedProducts" :key="product.id" :product="product" />
        </div>
    </div>
</template>