<template>
  <div class="content">
    <div>
      <dv-border-box-12 :reverse="true">
        <div class="head">
          <div class="head_content">
            <h1 class="sample-title">今日检测样本</h1> <!-- 添加样式类 -->
            <h2 class="sample-count">684</h2> <!-- 添加样式类 -->
          </div>
        </div>
      </dv-border-box-12>
    </div>
    <div class="body">

      <!-- 系统效率分析柱状图 -->
      <dv-border-box-11 title="系统效率分析">
        <Echart :options="options1" height="400px" />
      </dv-border-box-11>
      <div class="body_table2">
      <!-- 城市空气污染物监测表 -->
      <dv-border-box-10>
        <div style="padding: 5px">
          <dv-scroll-board :config="airData" style="height: 330px" />
        </div>
      </dv-border-box-10>
    </div>
    </div>
  </div>
</template>

<script>
import Echart from "../components/echart.vue";

export default {
  components: { Echart },
  data() {
    return {
      options1: {
        title: {
          text: "",
          left: 'center',
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          data: ["时间消耗", "内存占用"],
          bottom: '5%',
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["系统", "FS_Stega", "Zou", "SeSy"],
          axisLine: { show: true },
          axisTick: { show: true },
          splitLine: { show: false },
        },
        yAxis: [
          {
            name: "时间 (s)",
            type: "value",
            min: 0,
            max: 2.5,
            interval: 0.5,
            position: 'left',
            axisLabel: {
              formatter: '{value} s',
            },
          },
          {
            name: "内存占用 (MB)",
            type: "value",
            min: 300,
            max: 900,
            interval: 200,
            position: "right",
            axisLabel: {
              formatter: '{value} MB',
            },
          },
        ],
        series: [
  {
    name: "时间消耗",
    type: "bar",
    data: [1.45, 1.62, 1.67, 2.10],
    itemStyle: { 
      color: "rgb(176,201,204)",
      borderRadius: [5, 5, 0, 0] // 设置圆角，上左和上右
    },
    barWidth: '30%',
  },
  {
    name: "内存占用",
    type: "bar",
    data: [417.9, 421.3, 835.9, 838.2],
    itemStyle: { 
      color: "rgb(83,79,254)", 
      opacity: 0.8,
      borderRadius: [5, 5, 0, 0] // 设置圆角，上左和上右
    },
    barWidth: '30%',
    yAxisIndex: 1,
  },
],

      },
      airData: {
        header: ["检测文件", "检测时间", "检测结果"],
        data: [
          ["IMDB_SAMPLE1.CSV", "2024-07-29 13:41:11", "64%"],
          ["Tweet_SAMPLE1.CSV", "2024-07-29 20:50:48", "20%"],
          ["News_SAMPLE1.CSV", "2024-07-29 20:51:03", "15%"],
          ["IMDB_SAMPLE2.CSV", "2024-07-29 20:52:17", "85%"],
          ["Tweet_SAMPLE2.CSV", "2024-07-30 15:48:01", "34%"],
          ["News_SAMPLE2.CSV", "2024-07-30 17:21:15", "31%"],
          ["IMDB_SAMPLE3.CSV", "2024-07-31 11:31:31", "94%"],
          ["Tweet_SAMPLE3.CSV", "2024-07-31 18:51:16", "52%"],
        ],
      },
    };
  },
};
</script>

<style scoped>
.content {
  width: 30%;
}

.head {
  padding: 10px;
  height: 80px;
  display: flex;
  justify-content: space-around;
}

.head_content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.sample-title {
  color: white; /* 设置标题颜色为白色 */
  font-size: 14px; /* 更小的字号 */
  margin: 0; /* 清除默认的 margin */
}

.sample-count {
  color: rgb(14, 248, 252); /* 设置数字颜色为白色 */
  font-size: 38px; /* 较大的字号 */
  margin: 0; /* 清除默认的 margin */
}

.body_table2 {
  margin-top: 30px; /* 为底部图表添加间距 */
}

.body {
  margin-top: 10px;
}
</style>



