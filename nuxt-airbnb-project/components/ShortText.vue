<template>
  <span>
    {{ displayText }}
    <button
      v-if="isLong && !isExpanded"
      @click="isExpanded = true"
      type="button"
      class="link"
    >
      read more
    </button>
    <button
      class="link"
      v-if="isLong && isExpanded"
      @click="isExpanded = false"
      type="button"
    >
      read less
    </button>
  </span>
</template>

<script>
export default {
  data() {
    return {
      isExpanded: false,
      chunks: [],
    };
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isLong() {
      return this.chunks.length === 2;
    },
    displayText() {
      if (!this.isLong || this.isExpanded) return this.chunks.join(" ");
      return this.chunks[0] + "...";
    },
  },
  created() {
    this.chunks = this.getChunks();
  },
  methods: {
    getChunks() {
      const position = this.text.indexOf(" ", this.target);
      if (this.text.length <= this.target || position === -1)
        return [this.text];
      return [this.text.substring(0, position), this.text.substring(position)];
    },
  },
};
</script>

<style scoped>
.link {
  color: blue;
  background-color: white;
  border: none;
  text-decoration: underline;
  cursor: pointer;
}

.link:focus {
  border: none;
  outline: none;
}
</style>
