<template>
  <div style="display: block">
    <vue3-chart-js
      ref="chartRef"
      v-bind="{ ...localDoughnutChartOptions }"
      @after-render="afterRender"
    />
  </div>
  <!-- <button class="btn my-2" type="submit" @click="updateChart">Update Doughnut Data</button>
    <button class="btn my-2" type="submit" @click="exportChart">Export Chart as PNG</button> -->
</template>

<script setup>
  import { ref } from 'vue';
  import Vue3ChartJs from '@j-t-mcc/vue3-chartjs';

  const doughnutChart = {
    id: 'doughnut',
    type: 'doughnut',
    width: 1000,
    data: {
      labels: ['Blogs', 'Products', 'Events'],
      datasets: [
        {
          backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
          data: [10, 5, 20],
        },
      ],
    },
    options: {
      responsive: true,
      cutout: '10%',
      plugins: {},
    },
  };

  const beforeInit = (e) => {
    // console.log('chart is before init', e)
  };

  const beforeUpdate = (e) => {
    // console.log('beforeUpdate', e)
  };

  const afterUpdate = (e) => {
    // console.log('afterUpdate', e)
  };

  const afterRender = (e) => {
    // console.log('afterRender', e)
  };

  const testFunc = () => {
    // console.log('test func called')
  };

  const chartRef = ref(null);

  const localDoughnutChartOptions = { ...doughnutChart };

  let counter = 1;

  const updateChart = () => {
    localDoughnutChartOptions.options.plugins.title = {
      display: true,
      text: 'Loaded: ' + counter++,
    };

    localDoughnutChartOptions.data.labels.reverse();
    localDoughnutChartOptions.data.datasets = [
      {
        backgroundColor: [
          '#' + Math.floor(Math.random() * 16777215).toString(16),
          '#' + Math.floor(Math.random() * 16777215).toString(16),
          '#' + Math.floor(Math.random() * 16777215).toString(16),
          '#' + Math.floor(Math.random() * 16777215).toString(16),
        ],
        data: [
          Math.floor(Math.random() * 500),
          Math.floor(Math.random() * 500),
          Math.floor(Math.random() * 500),
          Math.floor(Math.random() * 500),
        ],
      },
    ];

    chartRef.value.update(750);
  };

  const exportChart = () => {
    let a = document.createElement('a');
    a.href = chartRef.value.chartJSState.chart.toBase64Image('image/png', 1);
    a.download = 'image-export.png';
    a.click();
    a = null;
  };
</script>
<style>
  #doughnut {
    margin: auto;
  }
</style>
