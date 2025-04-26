import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
    state: () => ({
        products: [
            { id: 1, title: 'iPhone 14', price: 999, image: 'https://via.placeholder.com/150' },
            { id: 2, title: 'MacBook Pro', price: 1999, image: 'https://via.placeholder.com/150' },
            { id: 3, title: 'AirPods', price: 199, image: 'https://via.placeholder.com/150' }
        ]      
    }),
    getters: {
        getProductById: (state) => {
            return (id) => state.products.find(item => item.id === id)
        }
    }
})