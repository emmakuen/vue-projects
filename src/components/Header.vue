<template>
  <header>
    <h1>{{ title }}</h1>
    <Button color="green" text="Add Task" />
  </header>
</template>

<script>
import Button from "./Button";

export default {
  name: "Header",
  components: {
    Button,
  },
  props: {
    title: {
      type: String,
      default: "App",
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
