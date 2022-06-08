<template>
  <layout>
    <b-container>
      <b-table
        striped
        hover
        class="history-content"
        :items="payments"
        :fields="fields"
      >
        <template #cell(track)="data">
          <a
            :href="'https://open.spotify.com/track/' + data.item.track_spotify"
            target="_blank"
            class="spotify-link"
            >{{ data.value }}</a
          >
        </template>
        <template #cell(artist)="data">
          <a
            :href="
              'https://open.spotify.com/artist/' + data.item.artist_spotify
            "
            target="_blank"
            class="spotify-link"
            >{{ data.value }}</a
          >
        </template>
      </b-table>
    </b-container>
  </layout>
</template>

<script>
import Layout from "../layout/Layout.vue";

export default {
  components: {
    Layout,
  },
  data() {
    return {
      payments: [],
      fields: ["listId", "value", "createdAt"],
    };
  },
  created() {
    this.getPayments();
  },
  methods: {
    getPayments() {
      this.$api
        .get(`/payments/`)
        .then((res) => res.data)
        .then((data) => {
          this.payments = data;
          console.log(this.payments);
        });
    },
  },
};
</script>
<style scoped>
</style>
