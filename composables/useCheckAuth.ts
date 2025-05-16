export async function useCheckAuth(redirectTo = '/authentication/login') {
    const user = useUserStore()
    const { error } = await useFetch('/auth/checkUser', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
        credentials: 'include',
    })

    if (error.value) {
        user.logout()
        navigateTo(redirectTo)
        return false
    }

    return true
}
