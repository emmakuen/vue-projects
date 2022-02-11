<template>
  <div class="task">
    <p>{{ task.text }}</p>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },
};
</script>
