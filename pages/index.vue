<template>
  HI, THERE!
  <div class="card">
    <Chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import Chart from "primevue/chart";
onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
  return {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Vendor Activity",
        data: [540, 325, 702, 620, 800, 400, 300], // Add more data points for each day
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)", // Additional color for Sat
          "rgba(75, 192, 192, 0.2)", // Additional color for Sun
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(255, 99, 132)",
          "rgb(255, 206, 86)", // Additional color for Sat
          "rgb(75, 192, 192)", // Additional color for Sun
        ],
        borderWidth: 1,
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};
</script>
