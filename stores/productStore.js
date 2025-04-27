import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [
            { id: 1, title: 'iPhone 14', price: 999, image: 'https://via.placeholder.com/150', category: 'phones' },
            { id: 2, title: 'MacBook Pro', price: 1999, image: 'https://via.placeholder.com/150', category: 'laptops' },
            { id: 3, title: 'AirPods', price: 199, image: 'https://via.placeholder.com/150', category: 'accessories' },
            { id: 4, title: 'iPad Pro', price: 1099, image: 'https://via.placeholder.com/150', category: 'tablets' },
            { id: 5, title: 'iPhone 16 Pro Max', price: 1300, image: 'https://via.placeholder.com/150', category: 'phones' },
            { id: 6, title: 'Macbook Air', price: 1599, image: 'https://via.placeholder.com/150', category: 'laptops' },
        ]      
    }),
    getters: {
        getProductById: (state) => {
            return (id) => state.products.find(item => item.id === id)
        }
    }
})