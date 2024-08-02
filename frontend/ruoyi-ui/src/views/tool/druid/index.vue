<template>
  <div class="word-cloud-container">
    <h1 class="box-title">词云</h1>
    <div ref="wordCloud" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-wordcloud';

export default {
  name: "WordCloud",
  mounted() {
    this.initWordCloud();
  },
  methods: {
    initWordCloud() {
      const chartDom = this.$refs.wordCloud;
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: '词云',
          left: 'center'
        },
        tooltip: {},
        series: [{
          type: 'wordCloud',
          shape: 'circle',
          gridSize: 10,
          width: '100%',
          rotation: 0,
          textStyle: {
            color: function () {
              const colors = ['#8B0000', '#FF6347', '#FF0000', '#00FF00', '#5b5e55', '#f40e38', '#510a08'];
              return colors[Math.floor(Math.random() * colors.length)];
            },
            normal: {
              fontFamily: 'Arial',
              fontWeight: 'bold',
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: [
            { name: 'enough', value: 23 },
            { name: 'problem', value: 7 },
            { name: 'bread', value: 2 },
            { name: 'all', value: 3 },
            { name: 'you', value: 4 },
            { name: 'she', value: 7 },
            { name: 'has', value: 7 },
            { name: 'of', value: 10 },
            { name: 'a', value: 14 },
            { name: 'he', value: 6 },
            { name: 'looks', value: 2 },
            { name: 'formidable', value: 2 },
            { name: 'than', value: 5 },
            { name: 'seems', value: 2 },
            { name: 'intelligent', value: 2 },
            { name: 'for', value: 2 },
            { name: 'writes', value: 2 },
            { name: 'clearly', value: 3 },
            { name: 'speaks', value: 2 },
            { name: 'man', value: 5 },
            { name: 'fool', value: 5 },
            { name: 'to', value: 4 },
            { name: 'try', value: 2 },
            { name: 'saw', value: 2 },
            { name: 'harry', value: 2 },
            { name: 'celebrity', value: 3 },
            { name: 'his', value: 4 },
            { name: 'father', value: 2 },
            { name: 'wants', value: 2 },
            { name: 'be', value: 3 },
            { name: 'coward', value: 2 },
            { name: 'pull', value: 2 },
            { name: 'trigger', value: 2 },
            { name: 'enough bread', value: 2 },
            { name: 'she has enough', value: 3 },
            { name: 'he looks formidable', value: 2 },
            { name: 'she speaks clearly', value: 2 },
            { name: 'he is a fool', value: 3 },
            { name: 'harry got to be a celebrity', value: 2 },
            { name: 'he is reliable', value: 5 },
            { name: 'john is not more reliable', value: 3 },
            { name: 'i have too many marbles', value: 2 },
            { name: 'i have six marbles', value: 2 },
            { name: 'as much of a man', value: 2 },
            { name: 'what', value: 3 }
          ]
        }]
      };

      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.word-cloud-container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px;
  padding: 10px;
}

.chart {
  height: 300px; /* 设定固定高度 */
}
.box-title {
  text-align: center; /* 水平居中 */
  font-weight: bold; /* 加粗 */
  margin: 10px 0; /* 上下间距 */
}
</style>

