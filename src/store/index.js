import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    itemsPerPage: 10,
    pageNumber: 1
  },
  getters: {
    getItems: ({ items }) => items,
    getPages: ({ items, itemsPerPage }) =>
      Math.ceil(items.length / itemsPerPage) || 1,
    getPageNumber: ({ pageNumber }) => pageNumber,
    getItemsPerPage: ({ itemsPerPage }) => itemsPerPage
  },
  mutations: {
    setItems: (state, payload) => {
      state.items = payload;
    },
    setPage: (state, payload) => {
      state.pageNumber = payload;
      console.log(state.pageNumber);
    }
  },
  actions: {
    setItems: async ({ commit }) => {
      let items = [];
      try {
        await db.collection("todos").onSnapshot(snapshot => {
          items = [];
          snapshot.forEach(doc => {
            items.push({
              id: doc.id,
              task: doc.data().task,
              done: doc.data().done
            });
            commit("setItems", items);
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
    setPage: ({ commit }, payload) => {
      commit("setPage", payload);
    }
  }
});
