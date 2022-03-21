/* activate vuex store */
export const state = () => ({
    apiReady: false,
  })
  
  export const mutations = {
    apiLoadComplete(state) {
        state.apiReady = true;
    }
  }