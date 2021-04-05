import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '../firebase';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: null,
    task: ''
  },
  getters: {
    getItems: state => {
      return state.items;
    },
    getTask: state => {
      return state.task;
    }
  },
  mutations: {
    updateTask(state, payload) {
      state.task = payload;
    },
    setItems: state => {
      let items = [];

      db.collection('todos').onSnapshot(snapshot => {
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
    }
  },
  actions: {
    updateTask: ({ commit }, payload) => {
      commit('updateTask', payload);
    },
    setItems: ({ commit }) => {
      commit('setItems');
    }
  }
});
