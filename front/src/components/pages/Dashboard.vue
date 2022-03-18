<template>
  <layout>
    <b-container fluid>
      <b-row>
        <b-col cols="4">
          <div class="chart">
            <TesteChart :chart-data="chartData" />
          </div>
        </b-col>
        <b-col cols="6"> </b-col>
      </b-row>
    </b-container>
  </layout>
</template>

<script>
import TesteChart from "../charts/TesteChart.vue";
import Layout from "../layout/Layout.vue";

export default {
  components: {
    Layout,
    TesteChart,
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
    };
  },
};
</script>
<style scope>
  .chart{
    padding: 1em;
      background-color: white;
      margin: 1em;

  }
</style>
