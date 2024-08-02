<template>
  <div class="content">
    <div>
      <dv-border-box-12 :reverse="true">
        <div class="head">
          <div class="head_content">
            <h1 class="sample-title">检测正常样本</h1>
            <h2 class="sample-count">664</h2>
          </div>
        </div>
      </dv-border-box-12>
    </div>

    <div class="body">
      <!-- 城市空气污染物比例占比 -->
      <div class="body_table1">
        <dv-border-box-11 style="padding: 10px" title="恶意样本分布场景">
          <div class="body_echart1">
            <div class="real_echart1" style="width: 100%; height: 100%; margin: auto;"> <!-- 将宽高设置为相对值 -->
              <Echart
                :options="options1"
                height="100%"
                width="100%"
                style="margin: auto"
              />
            </div>
          </div>
        </dv-border-box-11>
      </div>

      <div class="body_table2">
        <dv-border-box-11 style="padding: 10px;" title="隐写分析方法准确度对比">
            <Echart :options="options2" height="350px" style="margin: auto" />
        </dv-border-box-11>
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
  legend: {
    top: "bottom",
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "样本分布",
      type: "pie",
      radius: "50%", // 使用 50% 的半径
      center: ["50%", "50%"], // 图表居中
      data: [
        { value: 15, name: "IMDB" },
        { value: 50, name: "News" },
        { value: 80, name: "Tweet" },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
},

      options2: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          // show: false,
          data: ["TS-CSW", "TS-RNN", "Zou", "SeSy", "Ours"],
          bottom: "20%", // 设置图例显示在图表下方
          // textStyle: {
          //   color: "#fff", // 设置图例文字颜色
          // },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
  name: "训练集中有标签样本的数目",
  nameLocation: "middle", // 将名称位置设置在中间
  nameGap: -25, // 设置名称与横轴的间距
  type: "category",
  boundaryGap: false,
  data: ["4", "8", "10", "100", "1000", "10000"],
},

        yAxis: {
          name: "准确率(%)",
          type: "value",
        },
        series: [
          {
            name: "TS-CSW",
            type: "line",
            data: [50.2, 51, 51.5, 55, 58.5, 71],
            smooth: true,
          },
          {
            name: "TS-RNN",
            type: "line",
            data: [51, 50.8, 51.2, 56.2, 59.2, 70.3],
            smooth: true,
          },
          {
            name: "Zou",
            type: "line",
            data: [58, 57, 60, 79.9, 90.3, 92],
            smooth: true,
          },
          {
            name: "SeSy",
            type: "line",
            data: [63, 51.2, 61, 82.5, 89.9, 92.3],
            smooth: true,
          },
          {
            name: "Ours",
            type: "line",
            data: [83.95, 88.64, 90.12, 93.95, 91.60, 93.74],
            smooth: true,
          },
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

.body h2 {
  color: white; /* 设置文字颜色为白色 */
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

.body_echart1{
  height: 380px;
}

.body_table1 {
  display: flex;
}

.body_table2 {
  margin-top: 0px; /* 为底部图表添加间距 */
  display: flex;
}
</style>



