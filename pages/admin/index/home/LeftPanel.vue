<template>
  <div
    class="w-full md:w-0 md:flex-[0.835] md:h-full bg-[var(--web-bg-2)] p-8 rounded-md"
  >
    <h4>文章数量(每月)</h4>
    <div ref="chart" id="statistical-data" class="h-[550px] md:h-full"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  articleList: {
    type: Array,
    required: true,
  },
});

const myChart = ref();

const update = () => {
  const option = {
    xAxis: {
      type: "category",
      axisLabel: {
        interval: 0, // 显示所有标签
        rotate: 45
      },
      // boundaryGap: true,
      data: props.articleList.map((item) => item.name),
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,0.2)",
        },
      },
    },
    series: [
      {
        type: "bar",
        data: props.articleList.map((item) => item.value),
      },
    ],
  };

  myChart.value.setOption(option);
};

const resizeTheChart = () => {
  if (myChart.value != null) {
    myChart.value.resize();
  }
};

onMounted(() => {
  myChart.value = echarts.init(
    document.getElementById("statistical-data") as HTMLElement
  );
  window.addEventListener("resize", resizeTheChart);

  watch(
    () => props.articleList,
    () => {
      update();
    },
    {
      immediate: true,
    }
  );
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeTheChart);
});
</script>
