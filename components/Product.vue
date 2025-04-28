<script setup>
const props = defineProps({
    product: {
        type: Object,
        default: () => {}
    }
})
</script>

<template>
    <NuxtLink class="border p-4 rounded shadow" :to="`/product/${product.id}`">
        <img :src="product.image" alt="product" class="w-full h-40 object-cover mb-4" />
        <h2 class="text-xl font-semibold">{{ product.title }}</h2>
        <p class="text-gray-700 mb-2">${{ product.price }}</p>
    </NuxtLink>
</template>