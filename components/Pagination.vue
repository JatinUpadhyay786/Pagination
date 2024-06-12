<template>
  <h1>Pagination Component</h1>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("index", ["data"]),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    ...mapActions("../store/index.js", {
      fetchData: "FETCH_DATA",
    }),
  },
};
</script>
