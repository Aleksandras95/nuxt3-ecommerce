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
        <!---Products list-->
        <div class="grid grid-cols-3 gap-6">
            <Product v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>
    </div>
</template>