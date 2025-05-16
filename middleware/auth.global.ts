export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUserStore()


    if (to.path.includes('/profile') && !user.token) {
        return navigateTo('/authentication/login')
    }
})
