<script setup>
const props = defineProps({
  searchQuery: String
})
const emit = defineEmits(['update:searchQuery'])
</script>

<template>
    <div class="mb-8">
        <input 
            :value="searchQuery" 
            @input="$emit('update:searchQuery', $event.target.value)"
            type="text" 
            placeholder="Search for products..." 
            class="border p-2 rounded w-full"
        />
    </div>
</template>