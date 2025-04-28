<script setup>
const props = defineProps({
  categories: Array,
  selectedCategory: String
})
const emit = defineEmits(['update:category'])
</script>

<template>
    <div class="flex flex-col gap-4 mb-8">
        <button 
            v-for="cat in categories" 
            :key="cat.value"
            @click="$emit('update:category', cat.value)"
            :class="[
            'px-4 py-2 rounded border',
            selectedCategory === cat.value ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
            ]"
        >
            {{ cat.label }}
        </button>
    </div>
</template>