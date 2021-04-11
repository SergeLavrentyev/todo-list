<template>
  <div class="todo">
    <form class="todo__form">
      <textarea
        class="todo__textarea"
        name="todoTex"
        v-model="task"
        @keydown.enter="addTodo"
        :placeholder="placeholder"
      ></textarea>
      <button class="todo__button" @click.prevent="addTodo" :disabled="!task">
        <i class="fas fa-plus"></i>
        Добавить
      </button>
    </form>
    <p v-if="!items.length">Пока бездельничаем...</p>
    <ul class="todo__list">
      <li
        v-for="todo in slicedPages"
        :key="todo.id"
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
    {{ pageNumber }}
    <div class="pagination">
      <button
        v-for="(page, index) in pages"
        :key="index"
        @click="setPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "v-todo",
  data() {
    return {
      task: null,
      placeholder: "Добавить задачу",
      from: null,
      to: null,
    };
  },
  created() {
    this.setItems();
  },
  computed: {
    ...mapGetters({
      items: "getItems",
      pages: "getPages",
      pageNumber: "getPageNumber",
      itemsPerPage: "getItemsPerPage",
    }),
    slicedPages() {
      this.from = (this.pageNumber - 1) * this.itemsPerPage;
      this.to = this.from + this.itemsPerPage;
      return this.items.slice(this.from, this.to);
    },
  },
  methods: {
    ...mapActions({
      setItems: "setItems",
      setPage: "setPage",
    }),
    async addTodo() {
      if (this.task) {
        await db.collection("todos").add({ task: this.task, done: false });
        this.task = null;
        this.setPage(1);
      }
    },
    async deleteTodo(id) {
      await db.collection("todos").doc(id).delete();
      if (this.items.length === this.pageNumber * this.itemsPerPage - 2)
        this.setPage(this.pageNumber - 1 || 1);
    },
    async updateTodo(todo) {
      await db.collection("todos").doc(todo.id).update(todo);
    },
    async toggleTodo(id) {
      const todo = this.items.find((todo) => todo.id === id);
      todo.done = !todo.done;
      await this.updateTodo(todo);
    },
  },
};
</script>
