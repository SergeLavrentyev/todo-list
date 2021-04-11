<template>
  <div class="pagination">
    <button
      :to="`/${page}`"
      v-for="(page, index) in pages"
      :key="index"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "v-todo",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      pages: "getPages",
    }),
  },
  methods: {
    ...mapActions({
      setPage: "setPage",
    }),
    changePage(page) {
      this.setPage(page),
        this.$router.push({
          path: `/${page}`,
        });
    },
  },
};
</script>
