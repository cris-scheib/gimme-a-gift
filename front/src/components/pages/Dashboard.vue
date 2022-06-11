<template>
  <layout>
    <div class="page-content">
      <b-container v-if="loaded">
        <h4>Dashboard</h4>
        <b-row>
          <b-col cols="6" md="4">
            <b-card class="dashboard-card">
              <h2 class="pl-2">{{ adminLists }}</h2>
              <p class="m-0"><small>Listas que eu administro</small></p>
            </b-card>
          </b-col>
          <b-col cols="6" md="4">
            <b-card class="dashboard-card">
              <h2 class="pl-2">{{ guestLists }}</h2>
              <p class="m-0"><small>Listas que eu participo</small></p>
            </b-card>
          </b-col>
          <b-col cols="4"> </b-col>
          <b-col cols="4"> </b-col>
        </b-row>
        <line-chart />
        <b-row v-if="test">
          <b-col cols="4">
            <div class="chart">
              <TesteChart :chart-data="chartData" />
            </div>
          </b-col>
          <b-col cols="6"> {{ adminLists }} {{ guestLists }}</b-col>
        </b-row>
      </b-container>
    </div>
  </layout>
</template>

<script>
import LineChart from '../charts/LineChart.vue';
import TesteChart from "../charts/TesteChart.vue";
import Layout from "../layout/Layout.vue";

export default {
  components: {
    Layout,
    TesteChart,
    LineChart,
  },
  data() {
    return {
      chartData: {
        labels: [40, 70],
        datasets: [
          {
            label: "Evento 1",
            backgroundColor: "#d78db3",
            data: [45, 35],
          },
          {
            label: "Evento 2",
            backgroundColor: "#69b0b1",
            data: [35, 67],
          },
        ],
      },
      adminLists: 0,
      guestLists: 0,
      loaded: false,
      test: false,
    };
  },
  async created() {
    this.adminLists = await this.getCountLists("admin");
    this.guestLists = await this.getCountLists("guest");
    this.loaded = true;
  },
  methods: {
    getCountLists(permission) {
      return this.$api
        .get(`/count-lists/`, { params: { permission } })
        .then((res) => res.data)
        .then((data) => {
          return data;
        });
    },
  },
};
</script>
<style scope>
.chart {
  padding: 1em;
  background-color: white;
  margin: 1em;
}
.dashboard-card {
  border: unset !important;
  box-shadow: 0px 5px 7px 1px #dfdfdf;
  position: relative !important;
  border-radius: 1em !important;
}
.dashboard-card::after {
  background: linear-gradient(900deg, #d78db3, #f4d562);
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  width: 0.5em;
  height: 100%;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
}
.dashboard-card h2 {
  background: -webkit-linear-gradient(#69b0b1, #d78eb3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
#line-chart{
  height: 360px !important;
}
</style>
