// stores/counter.ts
import { defineStore } from 'pinia'
import type { IUser } from '~/interfaces'

export const useUserStore = defineStore('counter', {
    state: () => ({
        username: '',
        token: '',
        email: '',
    }),
    actions: {
        setUser(payload: any) {
            this.token = payload.token;
            this.username = payload.username;
            this.email = payload.email;
        },
    },
    persist: true, // This enables localStorage persistence
})
