<template>
  <div id="app">
    <v-header></v-header>
    <div class="container">
      <div class="todo">
        <form class="todo__form">
          <textarea
            class="todo__textarea"
            name="todoTex"
            v-model="task"
            @keydown.enter="addTodo"
            :placeholder="placeholder"
          ></textarea>
          <button
            class="todo__button"
            @click.prevent="addTodo"
            :disabled="!task"
          >
            <i class="fas fa-plus"></i>
            Добавить
          </button>
        </form>
        <p v-if="!items.length">Пока бездельничаем...</p>
        <ul class="todo__list" v-for="todo in slicedPages" :key="todo.id">
          <li
            class="todo__item"
            :style="todo.done ? 'background-color: rgb(126, 235, 193)' : ''"
          >
            <p class="todo__title">{{ todo.task }}</p>
            <div class="todo__buttons">
              <button
                class="button todo__button--remove"
                @click="deleteTodo(todo.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
              <button
                class="button todo__button--edit"
                @click="toggleTodo(todo.id)"
              >
                <i class="fas fa-check"></i>
              </button>
            </div>
          </li>
        </ul>
        <div class="pagination">
          <button
            v-for="(page, index) in pages"
            :key="index"
            @click="getPage(page)"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import vHeader from './components/v-header.vue';
import { db } from './firebase';
export default {
  components: { vHeader },
  data() {
    return {
      task: null,
      placeholder: 'Добавить задачу',
      limit: 10,
      pageNumber: 1,
      from: null,
      to: null,
    };
  },
  created() {
    this.$store.dispatch('setItems');
  },
  computed: {
    ...mapGetters({
      items: 'getItems',
    }),
    pages() {
      return Math.ceil(this.items.length / 10);
    },
    slicedPages() {
      this.from = (this.pageNumber - 1) * this.limit;
      this.to = this.from + this.limit;
      return this.items.slice(this.from, this.to);
    },
  },
  methods: {
    ...mapActions({
      updateTask: 'iupdateTask',
    }),
    getPage(page) {
      this.pageNumber = page;
    },
    async addTodo() {
      if (this.task) {
        await db.collection('todos').add({ task: this.task, done: false });
        this.task = null;
      }
    },
    async deleteTodo(id) {
      await db.collection('todos').doc(id).delete();
    },
    async updateTodo(todo) {
      await db.collection('todos').doc(todo.id).update(todo);
    },
    async toggleTodo(id) {
      const todo = this.items.find((todo) => todo.id === id);
      todo.done = !todo.done;
      await this.updateTodo(todo);
    },
  },
};
</script>

<style lang="less">
@import './less/common';
.todo {
  width: 100%;
  max-width: 50rem;
  padding: 2rem 2.5rem;
  margin: 2rem auto;
  border: 0.1rem solid rgb(0, 0, 0);
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2s);

  &__form {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__textarea {
    padding: 0.5rem;
    flex-basis: 70%;
    resize: none;
  }

  &__button {
    flex-basis: 30%;
    border: none;
    color: #fff;
    background-color: rgb(40, 93, 124);
    transition: background-color 0.3s ease-in-out;

    &:disabled {
      background-color: rgba(40, 93, 124, 0.1);
    }
  }

  &__list {
    display: flex;
    flex-direction: column-reverse;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;
    margin: 0.5rem 0;
    transition: background-color 0.3s ease-in-out;
  }

  &__title {
    flex-basis: 70%;
    word-wrap: break-word;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
