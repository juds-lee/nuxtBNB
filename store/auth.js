export const state = () => ({
    isLoggedIn: false,
    user: {}
})

export const mutation = {
    user(state,user) {
        state.isLoggedIn = !!user, 
        state.user = user || {}
    }
}