<template>
  <div>
    <div
      :key="home.objectID"
      v-for="home in homes"
      style="float: left; margin: 10px"
    >
      <HomeCard :home="home" />
    </div>
  </div>
</template>

<script>
import homes from "~/data/homes";
export default {
  head() {
    return {
      title: "Homepage",
      meta: [
        {
          name: "description",
          content: "This is a homepage!",
          hid: "description",
        },
      ],
    };
  },
  data() {
    return {
      homes: homes.slice(0, 3),
    };
  },
};
</script>

<style lang="scss" scoped></style>
