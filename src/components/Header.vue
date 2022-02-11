<template>
  <header>
    <h1>{{ title }}</h1>
    <Button
      :color="showAddTask ? 'red' : 'green'"
      :text="showAddTask ? 'Close' : 'Add Task'"
      @btn-click="$emit('btn-click')"
    />
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
    showAddTask: Boolean,
  },
  emits: ["btn-click"],
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
