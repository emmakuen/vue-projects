<template>
  <div>
    <img
      src="https://media1.giphy.com/media/8L0Pky6C83SzkzU55a/giphy.gif?cid=790b76118284230a6b62a635762786c9957b27d6d8f27a3e&rid=giphy.gif&ct=g"
      alt=""
    /><br /><br />
    <h1>Error!</h1>
    {{ error.message }} {{ error.statusCode }}
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Error Occurred",
    };
  },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
