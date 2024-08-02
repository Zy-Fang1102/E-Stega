<template>
  <div class="content">
    <div>
      <dv-border-box-12 :reverse="true">
        <div class="head">
          <div class="head_content">
            <h1 class="sample-title">检测隐写样本</h1> <!-- 添加样式类 -->
            <h2 class="sample-count">20</h2> <!-- 添加样式类 -->
          </div>
        </div>
      </dv-border-box-12>
    </div>

    <div class="body">
      <div style="display: flex; justify-content: center; align-items: center;">
  <img src="../assets/images/earth.png" style="max-width: 60%; height: auto;" />
</div>
      <!-- 温度监测表 -->
      <dv-border-box-11 title="隐写文本检测">
        <Echart :options="options1" height="350px" />
      </dv-border-box-11>
      <!-- 城市噪音监测表与城市湿度 -->
      <!-- <div class="body_table1">
        <div>
          <dv-border-box-2 style="padding: 10px">
            <h2>隐写检测日志</h2>
            <dv-capsule-chart
              :config="noiseData"
              style="width: 300px; height: 350px"
            />
          </dv-border-box-2>
        </div>
        <div>
          <dv-border-box-2 style="padding: 10px">
            <h2>内存信息</h2>
            <Echart :options="options2" height="350px" width="300px" />
          </dv-border-box-2>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Echart from "../components/echart.vue";
import * as echarts from "echarts";
export default {
  components: { Echart },
  data() {
    return {
      options1: {
        color: ["#005fa2"],
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["air spend"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            name: "h",
            type: "category",
            boundaryGap: false,
            data: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
          },
        ],
        yAxis: [
          {
            name: "隐写文本数量",
            type: "value",
          },
        ],
        series: [
          {
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(35, 67, 234)",
                },
                {
                  offset: 1,
                  color: "rgb(121, 185, 235)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [0, 0, 0, 0, 0, 1, 2, 5, 9, 10, 12, 15, 20],
          },
        ],
      },
      noiseData: {
        data: [
          { name: "今日", value: 20 },
          { name: "昨日", value: 15 },
          { name: "8/6", value: 27 },
          { name: "8/5", value: 10 },
          { name: "8/4", value: 3 },
          { name: "8/3", value: 5 },
          { name: "8/2", value: 5 },
          { name: "8/1", value: 25 },
          { name: "7/31", value: 1 },
          { name: "7/30", value: 0 },
        ],
      },
      options2: {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}K",
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            min: 0,
            max: 1000,
            detail: {
              formatter: "{value}",
            },
            data: [
              {
                value: 719.64,
                name: "内存消耗",
              },
            ],
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.content {
  width: 38%;
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

.head_content h1,

/* .head_content h2 {
  margin-top: 5px;
} */

/* 为噪音监测和湿度的标题设置颜色 */
.body_table1 h2 {
  color: white; /* 设置噪音监测和湿度的标题颜色为白色 */
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

.body {
  margin-top: 10px;
}
.body_table1 {
  display: flex;
}
</style>

