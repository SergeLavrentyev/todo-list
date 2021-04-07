import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    itemsPerPage: 2,
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
    setItems: state => {
      let items = [];

      db.collection("todos").onSnapshot(snapshot => {
        items = [];
        snapshot.forEach(doc => {
          console.log(doc.data(doc.data().task));
          items.push({
            id: doc.id,
            task: doc.data().task,
            done: doc.data().done
          });
        });

        state.items = items;
      });
    },
    setPage: (state, payload) => {
      state.pageNumber = payload;
    }
  },
  actions: {
    setItems: ({ commit }) => {
      commit("setItems");
    },
    setPage: ({ commit }, payload) => {
      commit("setPage", payload);
    }
  }
});
