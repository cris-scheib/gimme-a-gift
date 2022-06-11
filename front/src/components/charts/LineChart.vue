<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  mounted() {
    this.renderChart(
      {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
        ],
        datasets: [
          {
            label: "Dados",
            data: [2, 10, 5, 9, 0, 6, 15],
            backgroundColor: "rgba(204, 144, 178, 0.50)",
            borderColor: "rgba(204, 144, 178, 0.50)",
            pointBackgroundColor: "rgba(204, 144, 178, 1)",
          },
          {
            label: "Dados",
            data: [5, 8, 3, 9, 7, 13, 2],
            backgroundColor: "rgba(105, 176, 177, 0.50)",
            borderColor: "rgba(105, 176, 177, 0.50)",
            pointBackgroundColor: "rgba(105, 176, 177, 1)",
          },
        ],
      },
      // borderColor: "rgba(105, 176, 177, 0.50)", -> Verde
      // borderColor: "rgba(204, 144, 178, 0.50)", -> Rosa
      // borderColor: "rgba(244, 213, 98, 0.50)", -> Amarelo
      {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "My Data",
        },
      }
    );
  },
};
</script>