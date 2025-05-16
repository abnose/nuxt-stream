// stores/counter.ts
import { defineStore } from 'pinia'
import type { IUser } from '~/interfaces'

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        token: '',
        email: '',
        imgUrl: ''
    }),
    actions: {
        setUser(payload: any) {
            this.username = payload.username;
            this.email = payload.email;
            this.imgUrl = payload.img;
        },
        setToken(payload: any) {
            this.token = payload.token;
        }
    },
    persist: true, // This enables localStorage persistence
})
