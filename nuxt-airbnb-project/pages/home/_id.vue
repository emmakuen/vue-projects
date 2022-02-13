<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        width="200"
        height="150"
      />
    </div>
    {{ home.title }} <br />
    ${{ home.pricePerNight }} / night <br />
    <img src="/images/marker.svg" height="20" width="20" />
    {{ home.location.address }} {{ home.location.city }}
    {{ home.location.state }} {{ home.location.country }} <br />
    <img src="/images/star.svg" height="20" width="20" />
    {{ home.reviewValue }} <br />
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
    {{ home.bathrooms }} bath <br />
    <div style="height: 800px; width: 800px" ref="map"></div>
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image" alt="reviewer image" /><br />
      {{ review.reviewer.name }} <br />
      {{ formatDate(review.date) }} <br />
      <short-text :text="review.comment" :target="150" /> <br />
    </div>
    <img :src="user.image" /> <br />
    {{ user.name }} <br />
    {{ formatDate(user.joined) }} <br />
    {{ user.reviewCount }} reviews <br />
    {{ user.description }}
  </div>
</template>

<script>
import ShortText from "../../components/ShortText.vue";
export default {
  components: { ShortText },
  head() {
    return {
      title: this.home.title,
    };
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
    },
  },
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
  },
  async asyncData({ params, $dataApi, error }) {
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUserByHomeId(params.id),
    ]);

    const badResponse = responses.find((response) => !response.ok);
    if (badResponse)
      return error({
        statusCode: homeResponse.status,
        message: homeResponse.statusText,
      });

    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
    };
  },
};
</script>

<style></style>
