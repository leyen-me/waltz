<template>
  <div
    class="w-full h-[550px] md:w-0 md:flex-[0.25] md:h-full bg-[var(--web-bg-2)] md:ml-4 md:mt-0 mt-4 p-8 rounded-md"
  >
    <h4>分类占比</h4>
    <div id="percentage-completion" class="h-[550px] md:h-full"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
});

const myChart = ref();

const update = () => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      textStyle: {
        color: "#FFF",
      },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            color: "#FFF",
            fontSize: 32,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: props.list,
      },
    ],
  };

  myChart.value.setOption(option);
};

onMounted(() => {
  myChart.value = echarts.init(
    document.getElementById("percentage-completion") as HTMLElement
  );

  watch(
    () => props.list,
    () => {
      update();
    },
    {
      immediate: true,
    }
  );
});

const resizeTheChart = () => {
  if (myChart.value != null) {
    myChart.value.resize();
  }
};
onMounted(() => {
  window.addEventListener("resize", resizeTheChart);
});
onUnmounted(() => {
  window.removeEventListener("resize", resizeTheChart);
});
</script>
