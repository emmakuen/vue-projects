<template>
  <div style="clear: left">
    <img
      :src="home.images[0]"
      style="width: 200px; float: left; padding: 10px"
    />
    <br />
    {{ home.title }} <br />
    {{ home.location.address }} {{ home.location.city }} <br />
    {{ home.location.state }} {{ home.guests }} guests <br />
    {{ pluralize(home.guests, "guest") }},
    {{ pluralize(home.bedrooms, "room") }}, {{ pluralize(home.beds, "bed") }},
    {{ pluralize(home.bathrooms, "bath") }} <br />
    {{ home.pricePerNight }} / night <br />
    <img src="/images/star.svg" height="20" width="20" />
    {{ home.reviewValue }} ({{ home.reviewCount }}) <br />
  </div>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pluralize(number, singularWord) {
      const text = `${number} ${singularWord}`;
      if (number == 1) return text;
      return text + "s";
    },
  },
};
</script>

<style></style>
