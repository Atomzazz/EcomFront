import axios from 'axios'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { listCategory } from '../api/Category'
import { listProduct, search } from '../api/product'
import _ from 'lodash'
import {
    getHomeImages,
    createHomeImage,
    deleteHomeImage,
    editHomeImage,
    toggleFeaturedImage, // ✅ เพิ่ม
} from '../api/homeImage'; // ✅ เพิ่ม import ด้วย


//getก็เหมือนthis
const ecomStore = (set, get) => ({
    // key:valuse
    user: null,
    token: null,
    categories: [],
    products: [],
    carts: [],
    homeImages: [],
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),

    actionAddtoCart: (item) => {
        const carts = get().carts
        //...carts คือการcopy ข้อมูลเดิมขอวcarts
        const updateCart = [...carts, { ...item, count: 1 }]
        const uniqe = _.unionWith(updateCart, _.isEqual)

        //การsetเข้าไปในอาเรย์
        set({ carts: uniqe })


    },

    actionUpdateQuantity: (productId, newQuantity) => {
        console.log("test", productId, newQuantity);
        set((state) => ({
            carts: state.carts.map((item) =>
                item.id === productId
                    // Math.max คือฟังชั่นหาค่าสูงสุด
                    ? { ...item, count: Math.max(1, newQuantity) }
                    : item
            )
        }))
    },

    actionRemove: (productId) => {
        console.log("removeee", productId);
        set((state) => ({
            carts: state.carts.filter((item) => {
                return item.id !== productId

            })
        }))

    },

    getTotalPrice: () => {
        // reduce ฟังชั่น บวก
        return get().carts.reduce((total, item) => {
            return total + item.price * item.count
        }, 0)
    },




    actionLogin: async (form) => {
        const res = await axios.post('https://ecom-eight-brown.vercel.app/api/login', form)
        set({
            user: res.data.payload,
            token: res.data.token
        })
        return res
    },

    getCategory: async () => {
        try {
            const res = await listCategory()
            set({ categories: res.data })

        } catch (error) {
            console.log(error)

        }
    },

    getProduct: async (count) => {
        try {
            const res = await listProduct(count)
            set({ products: res.data })

        } catch (error) {
            console.log(error)

        }
    },

    searchFilters: async (arg) => {
        try {
            const res = await search(arg)
            set({ products: res.data })

        } catch (error) {
            console.log(error)

        }
    },

    clearCart: () => {
        set({ carts: [] })
    },




    fetchHomeImages: async (options = {}) => {
        try {
            const res = await axios.get('https://ecom-eight-brown.vercel.app/api/home-images', {
                params: options, // ✅ ส่ง query ไป filter
            })
            set({ homeImages: res.data })
        } catch (err) {
            console.error("❌ Error fetching home images:", err)
        }
    }
    ,
    addHomeImage: async (form, token) => {
        try {
            await createHomeImage(form, token);
            await get().fetchHomeImages(); // รีเฟรช
        } catch (err) {
            console.error("❌ Error adding home image:", err);
        }
    },

    updateHomeImage: async (id, data, token) => {
        try {
            await editHomeImage(id, data, token);
            await get().fetchHomeImages();
        } catch (err) {
            console.error("❌ Error updating home image:", err);
        }
    },

    removeHomeImage: async (id, token) => {
        try {
            await deleteHomeImage(id, token);
            await get().fetchHomeImages();
        } catch (err) {
            console.error("❌ Error deleting home image:", err);
        }
    },

    toggleFeaturedHomeImage: async (id, token) => {
        try {
            await toggleFeaturedImage(id, token)
            await get().fetchHomeImages()
        } catch (err) {
            console.error("❌ Error toggling featured:", err)
        }
    }
})

const usePersist = {
    name: 'ecom-store',
    storage: createJSONStorage(() => localStorage)
}

const useEcomStore = create(persist(ecomStore, usePersist))

export default useEcomStore