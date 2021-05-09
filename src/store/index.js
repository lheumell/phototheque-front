// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: window.localStorage.accessToken,
    email: window.localStorage.email,
    username: window.localStorage.username,
    role : window.localStorage.role,
    searchQuery : ""
  },
  getters: {
    isConnected: (state) => {
      if (state.accessToken) {
        return true;
      } else {
        return false;
      }
    },
  //   filteredImages(state) {
  //     // return keyword => state.items.filter(item =>{
  //     //   return item.name === keyword
  //     // });

  //     if (state.searchQuery) {
  //       console.log(images)
  //       return images => images.filter((item) => {
  //         return item.title.startsWith(state.searchQuery);
  //       });
  //     } else {
  //       console.log('ok')
  //       return images => images;
  //     }
  //   },
  },
  mutations: {
    typeSearch(state, search) {
      state.searchQuery = search ;
    }
  },
  actions: {}
});
