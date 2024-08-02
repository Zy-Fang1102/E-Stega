<!-- <template>
    <div
      :class="className"
      :style="{ height: height, width: width }"
    />
  </template>
   
  <script>
  import * as echarts from 'echarts'
//   import 'echarts-liquidfill'
  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100px'
      },
      option: {
        type: Object,
        default () {
          return {};
        },
      },
    },
    data () {
      return {
        chart: null
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy () {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart () {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions()
      },
      setOptions () {
        this.chart.setOption(this.option)
      }
    }
  }
  </script> -->
  <!-- <template>
    <div ref="chartRef" style="height: 320px"></div>
  </template>
   
  <script setup lang="ts">
  import { ref, onMounted, watch, onUnmounted, Ref } from 'vue';
  import { echarts, ECOption } from '@/utils/echarts.ts';
   
  const props = defineProps<{
    option: ECOption;
    data: [];
  }>();
   
  let chartInstance: echarts.ECharts;
  let isFinishedHandled = false;
  let resizeObserver: ResizeObserver | null = null;
  const chartRef = ref<HTMLElement | null>(null);
   
  /**
   * 处理图表渲染完成事件
   * @param chartInstance
   * @param chartRef
   */
  function handleChartRenderFinished(
    chartInstance: echarts.ECharts,
    chartRef: Ref<HTMLElement | null>
  ) {
    if (isFinishedHandled) return;
    isFinishedHandled = true;
   
    resizeObserver = new ResizeObserver(() => {
      chartInstance.resize();
    });
   
    resizeObserver.observe(chartRef.value!);
  }
   
  onMounted(() => {
    if (!chartRef.value) return;
   
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption(props.option);
   
    // 监听图表渲染完成事件 - 响应宽度变化
    chartInstance.on('finished', () =>
      handleChartRenderFinished(chartInstance, chartRef)
    );
  });
   
  onUnmounted(() => {
    resizeObserver?.disconnect();
    chartInstance?.dispose();
  });
   
  watch(
    () => props.option,
    newOption => {
      chartInstance?.setOption(newOption);
    }
  );
   
  watch(
    () => props.data,
    newData => {
      chartInstance?.setOption({ series: [{ data: newData }] });
    }
  );
  </script> -->

<template>
    <div :id="id" :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
    import tdTheme from "./theme.json"
    import resizeMixins from "../layout/mixin/ResizeHandler";

    export default {
        name: "echart",
        mixins: [resizeMixins],
        props: {
            id: {
                type: String,
                default: "chart"
            },
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '2.5rem'
            },
            options: {
                type: Object,
                default: ()=>({})
            }
        },
        data(){
            return {
                chart:null
            }
        },
        watch:{
            options:{
                handler(options){
                    this.chart.setOption(options,true)
                },
                deep:true
            }
        },
        mounted(){
            // 默认注册主题
            console.log("注册主题",this.$echarts)
            this.$echarts.registerTheme('tdTheme',tdTheme);
            // 初始化Echarts
            this.initChart();
        },
        methods:{
            initChart(){
                this.chart = this.$echarts.init(this.$el,"tdTheme")
                this.chart.setOption(this.options,true)
            }
        }
    }
</script>

<style>

</style>

