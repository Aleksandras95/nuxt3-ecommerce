<template>
    <div class="grid grid-cols-3 gap-6">
        <Product v-for="product in productStore.products" :key="product.id" :product="product" />
    </div>
</template>

<script setup>
import { useProductStore } from '@/stores/productStore'

const productStore = useProductStore()
</script>