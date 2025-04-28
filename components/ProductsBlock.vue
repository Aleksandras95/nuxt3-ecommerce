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
                <ProductSearch 
                 :searchQuery="searchQuery"
                 @update:searchQuery="(value) => searchQuery = value"
                />
                <!-- Category filter -->
                <CategoryFilter 
                :categories="categories"
                :selectedCategory="selectedCategory"
                @update:category="(value) => selectedCategory = value"
                />
            </div>
            <div class="w-[66.666%]">
                <div class="flex justify-end mb-8">
                    <!-- Dropdown sort list -->
                    <ProductSorting 
                     :sortOrder="sortOrder"
                     @update:sortOrder="(value) => sortOrder = value"
                    />
                </div>

                 <!---Products list-->
                <TransitionGroup name="fade" tag="div" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Product v-for="product in paginatedProducts" :key="product.id" :product="product" />
                </TransitionGroup>
                <!---Pagination--->
                <Pagination 
                :totalPages="totalPages"
                :currentPage="currentPage"
                @update:page="changePage"
                />
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