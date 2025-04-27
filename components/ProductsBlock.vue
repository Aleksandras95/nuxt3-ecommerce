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

const currentPage = ref(1)
const itemsPerPage = 3

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return searchedProducts.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(searchedProducts.value.length / itemsPerPage)
})

function changePage(page) {
  currentPage.value = page
}
</script>

<template>
    <div class="pt-32 pb-24">
        <div class="container mx-auto">
            <div class="flex items-start justify-between gap-8">
            <div class="w-1/3">
                <!---Search for products-->
                <div class="mb-8">
                    <input 
                        v-model="searchQuery" 
                        type="text" 
                        placeholder="Search for products..." 
                        class="border p-2 rounded w-full"
                    />
                </div>
                <!-- Category filter -->
                <div class="flex flex-col gap-4 mb-8">
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
            </div>
            <div class="w-[66.666%]">
                <div class="flex justify-end mb-8">
                    <!-- Dropdown sort list -->
                    <select v-model="sortOrder" class="border p-2 rounded">
                        <option value="default">No sorting</option>
                        <option value="priceAsc">Price: ascending</option>
                        <option value="priceDesc">Price: descending</option>
                    </select>
                </div>

                 <!---Products list-->
                <TransitionGroup name="fade" tag="div" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Product v-for="product in paginatedProducts" :key="product.id" :product="product" />
                </TransitionGroup>
                <!---Pagination--->
                <div class="flex justify-center items-center gap-2 mt-8">
                <button 
                    v-for="page in totalPages" 
                    :key="page"
                    @click="changePage(page)"
                    :class="[
                    'px-4 py-2 border rounded',
                    currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                    ]"
                >
                    {{ page }}
                </button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>