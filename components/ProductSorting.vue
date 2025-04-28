<script setup>
const props = defineProps({
  sortOrder: String
})
const emit = defineEmits(['update:sortOrder'])
</script>

<template>
    <select :value="sortOrder" @change="$emit('update:sortOrder', $event.target.value)" class="border p-2 rounded">
        <option value="default">No sorting</option>
        <option value="priceAsc">Price: ascending</option>
        <option value="priceDesc">Price: descending</option>
    </select>
</template>