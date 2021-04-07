<template>
  <div id="app">
    <v-header></v-header>
    <div class="container">
      <v-todo></v-todo>
    </div>
  </div>
</template>

<script>
import vHeader from "@/components/v-header.vue";
import vTodo from "@/components/v-todo.vue";

export default {
  name: "app",
  components: { vHeader, vTodo },
};
</script>

<style lang="less">
@import "./less/common";
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
