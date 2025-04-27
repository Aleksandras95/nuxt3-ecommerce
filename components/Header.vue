<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
    <div class="fixed bg-white shadow-md w-full top-0 left-0 right-0 h-16 flex items-center">
        <div class="container mx-auto">
            <div class="flex items-center justify-between">
                <NuxtLink to="/" class="text-black text-3xl font-bold">Nuxt3 Shop</NuxtLink>
                <NuxtLink to="/cart" class="text-blue-500 hover:underline inline-block relative">
                    <img class="h-8" src="~/assets/img/shopping-bag.png" alt="shopping-bag">
                    <div class="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">{{ cartStore.cartItems.length }}</div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>