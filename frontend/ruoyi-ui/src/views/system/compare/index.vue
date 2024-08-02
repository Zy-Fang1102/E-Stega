<template>
  <div class="container">
    <div class="header-box">
      <div class="dropdown-container">
        <select v-model="selectedSample" class="dropdown">
          <option value="sample1">小样本</option>
          <option value="sample2">不平衡样本</option>
          <option value="sample3">混合样本</option>
          <option value="sample4">交叉样本</option>
          <option value="sample5">IMDB_SAMPLE1</option>
          <option value="sample6">Tweet_SAMPLE1</option>
          <option value="sample7">News_SAMPLE1</option>
          <option value="sample8">IMDB_SAMPLE2</option>
          <option value="sample9">Tweet_SAMPLE2</option>
          <option value="sample10">News_SAMPLE2</option>
          <option value="sample11">IMDB_SAMPLE3</option>
          <option value="sample12">Tweet_SAMPLE3</option>
        </select>

        <select v-model="selectedMethod" class="dropdown">
          <option value="ours">Ours</option>
          <option value="zou">Zou</option>
          <option value="fs_stega">FS_Stega</option>
          <option value="sesy">SeSy</option>
        </select>

        <button @click="viewResults" class="view-button">查看</button>
      </div>
    </div>

    <div class="main-content">
      <div class="left">
        <div class="top-box left-top-box">
          <h1 class="box-title">词云</h1>
          <img :src="wordCloudImage" alt="词云" class="left-image" />
        </div>
        <div class="bottom-boxes">
          <div class="left-box">
            <h1 class="box-title">模型隐写检测效果可视化</h1>
            <img :src="visualizationImage" alt="模型隐写检测效果可视化" class="left-image" />
          </div>
          <div class="right-box">
            <h1 class="box-title">参数设置</h1>
            <table class="data-table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>值</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in chartData" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="top-box right-top-box">
          <h1 class="box-title">分析结果</h1>
          <div ref="pieChart" class="chart"></div>
        </div>
        <div class="bottom-box">
          <h1 class="box-title">分析结果</h1>
          <table class="data-table">
            <thead>
              <tr>
                <th>载体文本</th>
                <th>分析结果</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in excelData" :key="index">
                <td>{{ item.name }}</td>
                <!-- <td>{{ item.value }}</td> -->
                <td :class="getValueClass(item.value)">{{ item.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { getExcelData } from "@/api/system/compare";
import * as XLSX from 'xlsx';
import axios from 'axios';

export default {
  name: "LayoutPage",
  data() {
    return {
      selectedSample: 'sample1', // 默认选中的样本
      selectedMethod: 'ours', // 默认选中的方法
      wordCloudImage: '', // 存储词云图片路径
      visualizationImage: '', // 存储模型隐写检测效果可视化图片路径
      chartData: [
        // { name: '最大序列长度', value: 128 },
        // { name: '每次随机选取的未标记样本量', value: 4096 },
        // { name: '微调batch size', value: 4 },
        // { name: 'MC Dropout前向传播次数', value: 30 },
        // { name: '样本选择比', value: 25 },
        // { name: '样本稳定性权重系数α', value: 0.1 }
      ],
      excelData: [
        // { name: 'Sample Text 1', value: '80%' },
        // { name: 'Sample Text 2', value: '60%' },
        // { name: 'Sample Text 3', value: '40%' },
        // { name: 'Sample Text 4', value: '30%' },
      ], // 用于存储从后端获取的Excel数据
      myChart: null // 用于存储饼图实例
    };
  },
  mounted() {
    this.initPieChart();
    this.fetchExcelData(); // 获取数据
    this.updateImages(); // 初始化时更新图片
  },
  methods: {
    viewResults() {
      console.log("Selected Sample:", this.selectedSample);
      console.log("Selected Method:", this.selectedMethod);

      // 发送请求获取Excel数据
      // this.fetchExcelData(this.selectedSample, this.selectedMethod);
      // 根据选择的样本和方法读取相应的 Excel 文件路径
      // const filePath = this.getExcelFilePath(this.selectedSample, this.selectedMethod);
      // this.fetchExcelData(filePath);
      // 更新表格数据
      this.updateExceldata();
      this.updateChartData();
      this.updateImages(); // 每次点击查看按钮更新图片
      this.updatePieChart(); // 点击查看按钮时更新饼图
    },

    updateExceldata() {
    const dataMap = {
      sample1: {
        ours: [
    { "name": "the weather rained", "value": "12%" },
    { "name": "gilgamesh seek may ishtar", "value": "25%" },
    { "name": "no one expected to win .", "value": "78%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "10%" },
    { "name": "the bear sniffs", "value": "85%" },
    { "name": "it hung on the wall .", "value": "90%" },
    { "name": "jason killed .", "value": "5%" },
    { "name": "many people were there playing on the beach", "value": "20%" },
    { "name": "know yourself !", "value": "72%" },
    { "name": "agamemnon attempted to behave well .", "value": "88%" },
    { "name": "julie felt he was there", "value": "91%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
],
        zou: [
    { "name": "the weather rained", "value": "23%" },
    { "name": "gilgamesh seek may ishtar", "value": "40%" },
    { "name": "no one expected to win .", "value": "82%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "50%" },
    { "name": "the bear sniffs", "value": "63%" },
    { "name": "it hung on the wall .", "value": "75%" },
    { "name": "jason killed .", "value": "24%" },
    { "name": "many people were there playing on the beach", "value": "61%" },
    { "name": "know yourself !", "value": "32%" },
    { "name": "agamemnon attempted to behave well .", "value": "52%" },
    { "name": "julie felt he was there", "value": "67%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
]
,
        fs_stega: [
    { "name": "the weather rained", "value": "18%" },
    { "name": "gilgamesh seek may ishtar", "value": "21%" },
    { "name": "no one expected to win .", "value": "72%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "27%" },
    { "name": "the bear sniffs", "value": "34%" },
    { "name": "it hung on the wall .", "value": "36%" },
    { "name": "jason killed .", "value": "5%" },
    { "name": "many people were there playing on the beach", "value": "43%" },
    { "name": "know yourself !", "value": "72%" },
    { "name": "agamemnon attempted to behave well .", "value": "88%" },
    { "name": "julie felt he was there", "value": "91%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
],
        sesy: [
    { "name": "the weather rained", "value": "37%" },
    { "name": "gilgamesh seek may ishtar", "value": "58%" },
    { "name": "no one expected to win .", "value": "88%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "34%" },
    { "name": "the bear sniffs", "value": "90%" },
    { "name": "it hung on the wall .", "value": "84%" },
    { "name": "jason killed .", "value": "87%" },
    { "name": "many people were there playing on the beach", "value": "10%" },
    { "name": "know yourself !", "value": "52%" },
    { "name": "agamemnon attempted to behave well .", "value": "88%" },
    { "name": "julie felt he was there", "value": "91%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
]

      },
      sample2: {
        ours: [
    { "name": "the weather rained", "value": "10%" },
    { "name": "gilgamesh seek may ishtar", "value": "15%" },
    { "name": "no one expected to win .", "value": "71%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "18%" },
    { "name": "the bear sniffs", "value": "76%" },
    { "name": "it hung on the wall .", "value": "80%" },
    { "name": "jason killed .", "value": "13%" },
    { "name": "many people were there playing on the beach", "value": "14%" },
    { "name": "know yourself !", "value": "62%" },
    { "name": "agamemnon attempted to behave well .", "value": "78%" },
    { "name": "julie felt he was there", "value": "91%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
],
        zou: [
    { "name": "the weather rained", "value": "52%" },
    { "name": "gilgamesh seek may ishtar", "value": "27%" },
    { "name": "no one expected to win .", "value": "69%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "23%" },
    { "name": "the bear sniffs", "value": "79%" },
    { "name": "it hung on the wall .", "value": "76%" },
    { "name": "jason killed .", "value": "10%" },
    { "name": "many people were there playing on the beach", "value": "10%" },
    { "name": "know yourself !", "value": "28%" },
    { "name": "agamemnon attempted to behave well .", "value": "88%" },
    { "name": "julie felt he was there", "value": "91%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
],
        fs_stega: [
    { "name": "the weather rained", "value": "21%" },
    { "name": "gilgamesh seek may ishtar", "value": "21%" },
    { "name": "no one expected to win .", "value": "89%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "7%" },
    { "name": "the bear sniffs", "value": "13%" },
    { "name": "it hung on the wall .", "value": "80%" },
    { "name": "jason killed .", "value": "9%" },
    { "name": "many people were there playing on the beach", "value": "34%" },
    { "name": "know yourself !", "value": "71%" },
    { "name": "agamemnon attempted to behave well .", "value": "88%" },
    { "name": "julie felt he was there", "value": "91%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
]
,
        sesy: [
    { "name": "the weather rained", "value": "36%" },
    { "name": "gilgamesh seek may ishtar", "value": "67%" },
    { "name": "no one expected to win .", "value": "65%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "34%" },
    { "name": "the bear sniffs", "value": "72%" },
    { "name": "it hung on the wall .", "value": "67%" },
    { "name": "jason killed .", "value": "33%" },
    { "name": "many people were there playing on the beach", "value": "12%" },
    { "name": "know yourself !", "value": "72%" },
    { "name": "agamemnon attempted to behave well .", "value": "88%" },
    { "name": "julie felt he was there", "value": "91%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
]

      },
      // 添加其他样本的数据...
      sample3: {
        ours: [
    { "name": "the weather rained", "value": "7%" },
    { "name": "gilgamesh seek may ishtar", "value": "17%" },
    { "name": "no one expected to win .", "value": "98%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "15%" },
    { "name": "the bear sniffs", "value": "73%" },
    { "name": "it hung on the wall .", "value": "69%" },
    { "name": "jason killed .", "value": "32%" },
    { "name": "many people were there playing on the beach", "value": "16%" },
    { "name": "know yourself !", "value": "66%" },
    { "name": "agamemnon attempted to behave well .", "value": "88%" },
    { "name": "julie felt he was there", "value": "91%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
],
        zou: [
    { "name": "the weather rained", "value": "51%" },
    { "name": "gilgamesh seek may ishtar", "value": "30%" },
    { "name": "no one expected to win .", "value": "84%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "25%" },
    { "name": "the bear sniffs", "value": "65%" },
    { "name": "it hung on the wall .", "value": "70%" },
    { "name": "jason killed .", "value": "37%" },
    { "name": "many people were there playing on the beach", "value": "80%" },
    { "name": "know yourself !", "value": "72%" },
    { "name": "agamemnon attempted to behave well .", "value": "88%" },
    { "name": "julie felt he was there", "value": "91%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
],
        fs_stega: [
    { "name": "the weather rained", "value": "5%" },
    { "name": "gilgamesh seek may ishtar", "value": "15%" },
    { "name": "no one expected to win .", "value": "67%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "82%" },
    { "name": "the bear sniffs", "value": "66%" },
    { "name": "it hung on the wall .", "value": "78%" },
    { "name": "jason killed .", "value": "36%" },
    { "name": "many people were there playing on the beach", "value": "50%" },
    { "name": "know yourself !", "value": "63%" },
    { "name": "agamemnon attempted to behave well .", "value": "88%" },
    { "name": "julie felt he was there", "value": "91%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
]
,
        sesy: [
    { "name": "the weather rained", "value": "32%" },
    { "name": "gilgamesh seek may ishtar", "value": "17%" },
    { "name": "no one expected to win .", "value": "26%" },
    { "name": "who did that plato loved seem to be known by everyone .", "value": "30%" },
    { "name": "the bear sniffs", "value": "77%" },
    { "name": "it hung on the wall .", "value": "87%" },
    { "name": "jason killed .", "value": "69%" },
    { "name": "many people were there playing on the beach", "value": "12%" },
    { "name": "know yourself !", "value": "55%" },
    { "name": "agamemnon attempted to behave well .", "value": "88%" },
    { "name": "julie felt he was there", "value": "91%" },
    { "name": "he thought that dracula was the prince of darkness .", "value": "82%" },
    { "name": "i have eaten already", "value": "74%" },
    { "name": "it is not true that i have left yet .", "value": "69%" },
    { "name": "that monkeys is eating the banana .", "value": "15%" },
    { "name": "i could have been flying helicopters by now .", "value": "95%" },
    { "name": "anson put a book", "value": "31%" },
    { "name": "gilgamesh might have not been reading the cuneiform tablets .", "value": "18%" },
    { "name": "i asked if medea poisoned jason .", "value": "77%" },
    { "name": "who did you persuade to go ?", "value": "80%" },
    { "name": "what did you get all for xmas ?", "value": "63%" },
    { "name": "some disgruntled old pigs in those ditches love truffles", "value": "92%" },
    { "name": "jason was killed .", "value": "81%" },
    { "name": "i would like to might do it", "value": "35%" },
    { "name": "peter is some disgruntled old pigs in those ditches .", "value": "8%" },
    { "name": "there was him in the garden .", "value": "22%" },
    { "name": "gilgamesh is in the dungeon .", "value": "76%" },
    { "name": "anson will come to the party .", "value": "63%" },
    { "name": "gilgamesh has never flown a dragon .", "value": "28%" },
    { "name": "julie maintained her own questions over the course of the argument .", "value": "67%" },
    { "name": "his analysis , i never liked .", "value": "94%" },
    { "name": "that bottle of water might .", "value": "30%" },
    { "name": "did medea poison who ?", "value": "70%" },
    { "name": "she took a picture of the phoenix", "value": "75%" },
    { "name": "look after herself !", "value": "25%" },
    { "name": "who did medea poison ?", "value": "32%" },
    { "name": "i tried for to get them .", "value": "30%" },
    { "name": "who did you introduce athena to ?", "value": "11%" },
    { "name": "can i keep the screwdriver just like a carpenter keep the screwdriver ?", "value": "35%" },
    { "name": "jason refrained from casting the spell", "value": "31%" },
    { "name": "andrew likes lard on his sandwiches", "value": "28%" },
    { "name": "who seemed to have left first ?", "value": "38%" },
    { "name": "ron asked that the potion was ready", "value": "15%" },
    { "name": "hierarchy of projections :", "value": "25%" },
    { "name": "we decided to paint the bathroom a lurid lime green colour .", "value": "35%" },
    { "name": "she kicked her", "value": "32%" },
    { "name": "he knows he .", "value": "31%" },
    { "name": "i believed there to be three books on the subject .", "value": "25%" },
    { "name": "the child wail", "value": "20%" },
    { "name": "which girl ate the cake ?", "value": "32%" },
    { "name": "that plato lived in the city of athens was well-known .", "value": "36%" },
    { "name": "collapsed harry .", "value": "22%" },
    { "name": "for you to do that would be a mistake .", "value": "35%" },
    { "name": "jason thinks who medea had poisoned .", "value": "25%" },
    { "name": "i believe she is pregnant", "value": "75%" },
    { "name": "no one expected him to to win .", "value": "20%" },
    { "name": "he 'll no can do it , can he ?", "value": "35%" },
    { "name": "which poem did you hear homer 's recital of last night ?", "value": "15%" },
    { "name": "raffi slept well , and gillian will too", "value": "75%" },
    { "name": "he 's bound to should do it", "value": "75%" },
    { "name": "it might have cracked open", "value": "75%" },
    { "name": "where did perseus see the gorgon ?", "value": "75%" },
    { "name": "the scissors are lost", "value": "75%" },
    { "name": "gilgamesh should be slowly tickling the mandrake", "value": "75%" },
    { "name": "agamemnon seems pro to be a maniac", "value": "20%" },
    { "name": "myself saw me", "value": "20%" },
    { "name": "i believed she was pregnant", "value": "75%" },
    { "name": "anson gave fluffy to jenny .", "value": "75%" },
    { "name": "the very old and extremely wise owl .", "value": "75%" },
    { "name": "who did that plato loved prove to be his undoing .", "value": "20%" },
    { "name": "what medea believed was jason to be a murderer .", "value": "20%" },
    { "name": "the owl hated the evil bat and loved the wise eagle .", "value": "75%" },
    { "name": "no one could remove the blood on the wall", "value": "75%" },
    { "name": "he can can go", "value": "15%" },
    { "name": "gillian has made pasta and david is too .", "value": "20%" },
    { "name": "jason intended for pro to learn magic .", "value": "20%" },
    { "name": "the boys should could all go", "value": "75%" },
    { "name": "i assumed to be innocent", "value": "20%" },
    { "name": "anson danced extremely frantically at trade .", "value": "75%" },
    { "name": "the gorgon is easy to believe the claim that perseus slew .", "value": "20%" },
    { "name": "she kicked itself", "value": "20%" },
    { "name": "julie became a fond of lloyd .", "value": "75%" },
    { "name": "lee 's youngest and dawn 's oldest son ran away .", "value": "75%" },
    { "name": "anson kicked the cat", "value": "75%" },
    { "name": "merlin is extremely evil .", "value": "75%" },
    { "name": "syntax is easy to pretend that you can teach .", "value": "75%" },
    { "name": "i want to eat macaroni", "value": "75%" },
    { "name": "which ode did which poet write ?", "value": "75%" },
    { "name": "what she thought that was the poison was neutralised", "value": "20%" },
    { "name": "who drank the poison ?", "value": "75%" },
    { "name": "what medea arranged was for her children to be poisoned .", "value": "75%" },
    { "name": "no one 's mother had baked anything .", "value": "75%" },
    { "name": "what kind of actor is he ?", "value": "75%" },
    { "name": "what did she eat ?", "value": "75%" },
    { "name": "frantically at , anson danced extremely trade", "value": "20%" },
    { "name": "i have often a cold .", "value": "75%" },
    { "name": "who did maria say that she 'd kiss and kick ?", "value": "75%" },
    { "name": "where did they go all for their holidays ?", "value": "75%" },
    { "name": "they came running over the hill and through the woods", "value": "75%" }
]

      },
      sample4: {
        ours: [
    { "name": "what place did john send the book ?", "value": "82%" },
    { "name": "who was the book sent by john .", "value": "25%" },
    { "name": "what place was the book sent by john ?", "value": "18%" },
    { "name": "only to the best students would he give this book .", "value": "75%" },
    { "name": "only the best students would he give this book .", "value": "29%" },
    { "name": "only to glasgow would he go by train .", "value": "80%" },
    { "name": "only glasgow would he travel by train .", "value": "20%" },
    { "name": "it is to the best students that he gives this book .", "value": "90%" },
    { "name": "it is the best students he gives this book .", "value": "35%" },
    { "name": "it is to ireland that he is going .", "value": "88%" },
    { "name": "it is ireland that he is going .", "value": "15%" },
    { "name": "he told her the whole story .", "value": "85%" },
    { "name": "she told him the whole story .", "value": "78%" },
    { "name": "the other plan she rejected out of hand .", "value": "67%" },
    { "name": "the vase got broken that sheila had brought all the way from .", "value": "84%" },
    { "name": "the plan was rejected out of hand that traffic should be banned .", "value": "76%" },
    { "name": "norman lemming jumped off the cliff and william lemming did so too .", "value": "65%" },
    { "name": "norman lemming jumped off the cliff and so did william lemming .", "value": "70%" },
    { "name": "harriet could n't marry mr knightley but emma could .", "value": "72%" },
    { "name": "what harriet did was marry mr martin .", "value": "80%" },
    { "name": "marry mr martin was what harriet did .", "value": "68%" },
    { "name": "emma insulted miss bates and annoyed mr knightley .", "value": "77%" },
    { "name": "harriet swooned .", "value": "62%" },
    { "name": "the book is astonishingly boring .", "value": "81%" },
    { "name": "the ethel we all know and love wishes to ask you some awkward questions .", "value": "84%" },
    { "name": "golfers can be good company .", "value": "75%" },
    { "name": "enthusiastic golfers with large handicaps can be good company .", "value": "88%" },
    { "name": "these enthusiastic golfers that i met at the nineteenth hole can be good company .", "value": "82%" },
    { "name": "golfer who is in training has a pretty powerful swing .", "value": "20%" },
    { "name": "memo ate the spaghetti .", "value": "85%" },
    { "name": "memo liked lasagna .", "value": "78%" },
    { "name": "emma made harriet her friend .", "value": "72%" },
    { "name": "the quiche and i were cooking .", "value": "83%" },
    { "name": "erika made her mother an omelet and the kitchen a mess .", "value": "76%" },
    { "name": "bill went to london on monday .", "value": "90%" },
    { "name": "bill went on monday to london .", "value": "87%" },
    { "name": "my brother lives near strasbourg .", "value": "72%" },
    { "name": "near strasbourg my brother lives .", "value": "85%" },
    { "name": "he planted the garden with roses last november .", "value": "88%" },
    { "name": "he planted the garden last november with roses .", "value": "90%" },
    { "name": "the baby chewed the biscuit .", "value": "82%" },
    { "name": "the baby is heavy .", "value": "70%" },
    { "name": "what the baby did was chew the biscuit .", "value": "76%" },
    { "name": "the baby was chewing the biscuit .", "value": "84%" },
    { "name": "chew the biscuit !", "value": "78%" },
    { "name": "hartfield house is in surrey .", "value": "85%" },
    { "name": "mr knightley rode to kingston .", "value": "80%" },
    { "name": "eleanor and marianne travelled from shropshire .", "value": "86%" },
    { "name": "frank gave a piano to jane fairfax .", "value": "90%" },
    { "name": "jane fairfax received a piano from frank .", "value": "88%" },
    { "name": "the thief smashed the window with a hammer .", "value": "80%" },
    { "name": "captain wentworth recovered the property for mrs smith .", "value": "85%" },
    { "name": "the window was broken by a hammer .", "value": "60%" },
    { "name": "wren built st paul 's cathedral .", "value": "90%" },
    { "name": "siobhan burnt a pattern on the piece of wood .", "value": "80%" },
    { "name": "the dog dug a hole in the lawn .", "value": "84%" },
    { "name": "the vase stood on the table in the hall .", "value": "78%" },
    { "name": "imogen took the vase to her mother 's .", "value": "75%" },
    { "name": "imogen broke the vase .", "value": "82%" },
    { "name": "sue knows the answer .", "value": "88%" },
    { "name": "the answer is known to sue .", "value": "70%" },
    { "name": "jim was happily chopping logs .", "value": "70%" },
    { "name": "jim was chopping logs when margaret left and was still at it when she got back .", "value": "85%" },
    { "name": "jim was enthusiastically chopping logs .", "value": "90%" },
    { "name": "captain oates died in order to save his comrades .", "value": "80%" },
    { "name": "this arch supports the weight of the tower .", "value": "75%" },
    { "name": "what this arch does is support the weight of the tower .", "value": "82%" },
    { "name": "this arch is supporting the weight of the tower .", "value": "86%" },
    { "name": "the computer is playing six simultaneous games of three dimensional chess .", "value": "90%" },
    { "name": "the intense cold killed the climbers .", "value": "87%" },
    { "name": "the climbers were killed by the intense cold .", "value": "88%" },
    { "name": "the climbers were killed with the intense cold .", "value": "80%" },
    { "name": "catriona opened the door with this key .", "value": "75%" },
    { "name": "the visas are with the passports .", "value": "88%" },
    { "name": "sally went to the party with andrew .", "value": "85%" },
    { "name": "alan made the loaf with strong white flour .", "value": "80%" },
    { "name": "the builders made the wall with concrete blocks .", "value": "90%" },
    { "name": "the gardener planted roses in the garden .", "value": "85%" },
    { "name": "it was roses that the gardener planted in the garden .", "value": "80%" },
    { "name": "it is the garden that the gardener planted with roses .", "value": "88%" },
    { "name": "roses are certain to be planted in the garden by the gardener .", "value": "82%" },
    { "name": "the garden is certain to be planted with roses by the gardener .", "value": "75%" },
    { "name": "helen sent a scarf to jim for margaret .", "value": "85%" },
    { "name": "what happened was they went home .", "value": "75%" },
    { "name": "what happened was they knew his parents .", "value": "30%" },
    { "name": "we are knowing this theory .", "value": "25%" },
    { "name": "they 're believing everything you say .", "value": "90%" },
    { "name": "you 'll soon be owning all the land round here .", "value": "88%" },
    { "name": "what she did was e-mail all her friends .", "value": "80%" },
    { "name": "what she did was know this theory .", "value": "25%" },
    { "name": "what she did was be very cold .", "value": "30%" },
    { "name": "what she did was own all the land round here .", "value": "20%" },
    { "name": "harriet talked to emma for hours .", "value": "82%" },
    { "name": "the dog chased the cat for days .", "value": "75%" },
    { "name": "harriet told emma the whole story .", "value": "87%" },
    { "name": "the dog caught the cat .", "value": "88%" },
    { "name": "the beaver built a dam .", "value": "90%" },
    { "name": "anne played the tune on the piano .", "value": "75%" },
    { "name": "jane was playing the piano .", "value": "84%" }
],
        zou: [
    { "name": "what place did john send the book ?", "value": "36%" },
    { "name": "who was the book sent by john .", "value": "15%" },
    { "name": "what place was the book sent by john ?", "value": "26%" },
    { "name": "only to the best students would he give this book .", "value": "66%" },
    { "name": "only the best students would he give this book .", "value": "48%" },
    { "name": "only to glasgow would he go by train .", "value": "40%" },
    { "name": "only glasgow would he travel by train .", "value": "21%" },
    { "name": "it is to the best students that he gives this book .", "value": "87%" },
    { "name": "it is the best students he gives this book .", "value": "32%" },
    { "name": "it is to ireland that he is going .", "value": "88%" },
    { "name": "it is ireland that he is going .", "value": "15%" },
    { "name": "he told her the whole story .", "value": "85%" },
    { "name": "she told him the whole story .", "value": "78%" },
    { "name": "the other plan she rejected out of hand .", "value": "67%" },
    { "name": "the vase got broken that sheila had brought all the way from .", "value": "84%" },
    { "name": "the plan was rejected out of hand that traffic should be banned .", "value": "76%" },
    { "name": "norman lemming jumped off the cliff and william lemming did so too .", "value": "65%" },
    { "name": "norman lemming jumped off the cliff and so did william lemming .", "value": "70%" },
    { "name": "harriet could n't marry mr knightley but emma could .", "value": "72%" },
    { "name": "what harriet did was marry mr martin .", "value": "80%" },
    { "name": "marry mr martin was what harriet did .", "value": "68%" },
    { "name": "emma insulted miss bates and annoyed mr knightley .", "value": "77%" },
    { "name": "harriet swooned .", "value": "62%" },
    { "name": "the book is astonishingly boring .", "value": "81%" },
    { "name": "the ethel we all know and love wishes to ask you some awkward questions .", "value": "84%" },
    { "name": "golfers can be good company .", "value": "75%" },
    { "name": "enthusiastic golfers with large handicaps can be good company .", "value": "88%" },
    { "name": "these enthusiastic golfers that i met at the nineteenth hole can be good company .", "value": "82%" },
    { "name": "golfer who is in training has a pretty powerful swing .", "value": "20%" },
    { "name": "memo ate the spaghetti .", "value": "85%" },
    { "name": "memo liked lasagna .", "value": "78%" },
    { "name": "emma made harriet her friend .", "value": "72%" },
    { "name": "the quiche and i were cooking .", "value": "83%" },
    { "name": "erika made her mother an omelet and the kitchen a mess .", "value": "76%" },
    { "name": "bill went to london on monday .", "value": "90%" },
    { "name": "bill went on monday to london .", "value": "87%" },
    { "name": "my brother lives near strasbourg .", "value": "72%" },
    { "name": "near strasbourg my brother lives .", "value": "85%" },
    { "name": "he planted the garden with roses last november .", "value": "88%" },
    { "name": "he planted the garden last november with roses .", "value": "90%" },
    { "name": "the baby chewed the biscuit .", "value": "82%" },
    { "name": "the baby is heavy .", "value": "70%" },
    { "name": "what the baby did was chew the biscuit .", "value": "76%" },
    { "name": "the baby was chewing the biscuit .", "value": "84%" },
    { "name": "chew the biscuit !", "value": "78%" },
    { "name": "hartfield house is in surrey .", "value": "85%" },
    { "name": "mr knightley rode to kingston .", "value": "80%" },
    { "name": "eleanor and marianne travelled from shropshire .", "value": "86%" },
    { "name": "frank gave a piano to jane fairfax .", "value": "90%" },
    { "name": "jane fairfax received a piano from frank .", "value": "88%" },
    { "name": "the thief smashed the window with a hammer .", "value": "80%" },
    { "name": "captain wentworth recovered the property for mrs smith .", "value": "85%" },
    { "name": "the window was broken by a hammer .", "value": "60%" },
    { "name": "wren built st paul 's cathedral .", "value": "90%" },
    { "name": "siobhan burnt a pattern on the piece of wood .", "value": "80%" },
    { "name": "the dog dug a hole in the lawn .", "value": "84%" },
    { "name": "the vase stood on the table in the hall .", "value": "78%" },
    { "name": "imogen took the vase to her mother 's .", "value": "75%" },
    { "name": "imogen broke the vase .", "value": "82%" },
    { "name": "sue knows the answer .", "value": "88%" },
    { "name": "the answer is known to sue .", "value": "70%" },
    { "name": "jim was happily chopping logs .", "value": "70%" },
    { "name": "jim was chopping logs when margaret left and was still at it when she got back .", "value": "85%" },
    { "name": "jim was enthusiastically chopping logs .", "value": "90%" },
    { "name": "captain oates died in order to save his comrades .", "value": "80%" },
    { "name": "this arch supports the weight of the tower .", "value": "75%" },
    { "name": "what this arch does is support the weight of the tower .", "value": "82%" },
    { "name": "this arch is supporting the weight of the tower .", "value": "86%" },
    { "name": "the computer is playing six simultaneous games of three dimensional chess .", "value": "90%" },
    { "name": "the intense cold killed the climbers .", "value": "87%" },
    { "name": "the climbers were killed by the intense cold .", "value": "88%" },
    { "name": "the climbers were killed with the intense cold .", "value": "80%" },
    { "name": "catriona opened the door with this key .", "value": "75%" },
    { "name": "the visas are with the passports .", "value": "88%" },
    { "name": "sally went to the party with andrew .", "value": "85%" },
    { "name": "alan made the loaf with strong white flour .", "value": "80%" },
    { "name": "the builders made the wall with concrete blocks .", "value": "90%" },
    { "name": "the gardener planted roses in the garden .", "value": "85%" },
    { "name": "it was roses that the gardener planted in the garden .", "value": "80%" },
    { "name": "it is the garden that the gardener planted with roses .", "value": "88%" },
    { "name": "roses are certain to be planted in the garden by the gardener .", "value": "82%" },
    { "name": "the garden is certain to be planted with roses by the gardener .", "value": "75%" },
    { "name": "helen sent a scarf to jim for margaret .", "value": "85%" },
    { "name": "what happened was they went home .", "value": "75%" },
    { "name": "what happened was they knew his parents .", "value": "30%" },
    { "name": "we are knowing this theory .", "value": "25%" },
    { "name": "they 're believing everything you say .", "value": "90%" },
    { "name": "you 'll soon be owning all the land round here .", "value": "88%" },
    { "name": "what she did was e-mail all her friends .", "value": "80%" },
    { "name": "what she did was know this theory .", "value": "25%" },
    { "name": "what she did was be very cold .", "value": "30%" },
    { "name": "what she did was own all the land round here .", "value": "20%" },
    { "name": "harriet talked to emma for hours .", "value": "82%" },
    { "name": "the dog chased the cat for days .", "value": "75%" },
    { "name": "harriet told emma the whole story .", "value": "87%" },
    { "name": "the dog caught the cat .", "value": "88%" },
    { "name": "the beaver built a dam .", "value": "90%" },
    { "name": "anne played the tune on the piano .", "value": "75%" },
    { "name": "jane was playing the piano .", "value": "84%" }
],
        fs_stega: [
    { "name": "what place did john send the book ?", "value": "77%" },
    { "name": "who was the book sent by john .", "value": "36%" },
    { "name": "what place was the book sent by john ?", "value": "12%" },
    { "name": "only to the best students would he give this book .", "value": "48%" },
    { "name": "only the best students would he give this book .", "value": "46%" },
    { "name": "only to glasgow would he go by train .", "value": "58%" },
    { "name": "only glasgow would he travel by train .", "value": "13%" },
    { "name": "it is to the best students that he gives this book .", "value": "82%" },
    { "name": "it is the best students he gives this book .", "value": "35%" },
    { "name": "it is to ireland that he is going .", "value": "88%" },
    { "name": "it is ireland that he is going .", "value": "15%" },
    { "name": "he told her the whole story .", "value": "85%" },
    { "name": "she told him the whole story .", "value": "78%" },
    { "name": "the other plan she rejected out of hand .", "value": "67%" },
    { "name": "the vase got broken that sheila had brought all the way from .", "value": "84%" },
    { "name": "the plan was rejected out of hand that traffic should be banned .", "value": "76%" },
    { "name": "norman lemming jumped off the cliff and william lemming did so too .", "value": "65%" },
    { "name": "norman lemming jumped off the cliff and so did william lemming .", "value": "70%" },
    { "name": "harriet could n't marry mr knightley but emma could .", "value": "72%" },
    { "name": "what harriet did was marry mr martin .", "value": "80%" },
    { "name": "marry mr martin was what harriet did .", "value": "68%" },
    { "name": "emma insulted miss bates and annoyed mr knightley .", "value": "77%" },
    { "name": "harriet swooned .", "value": "62%" },
    { "name": "the book is astonishingly boring .", "value": "81%" },
    { "name": "the ethel we all know and love wishes to ask you some awkward questions .", "value": "84%" },
    { "name": "golfers can be good company .", "value": "75%" },
    { "name": "enthusiastic golfers with large handicaps can be good company .", "value": "88%" },
    { "name": "these enthusiastic golfers that i met at the nineteenth hole can be good company .", "value": "82%" },
    { "name": "golfer who is in training has a pretty powerful swing .", "value": "20%" },
    { "name": "memo ate the spaghetti .", "value": "85%" },
    { "name": "memo liked lasagna .", "value": "78%" },
    { "name": "emma made harriet her friend .", "value": "72%" },
    { "name": "the quiche and i were cooking .", "value": "83%" },
    { "name": "erika made her mother an omelet and the kitchen a mess .", "value": "76%" },
    { "name": "bill went to london on monday .", "value": "90%" },
    { "name": "bill went on monday to london .", "value": "87%" },
    { "name": "my brother lives near strasbourg .", "value": "72%" },
    { "name": "near strasbourg my brother lives .", "value": "85%" },
    { "name": "he planted the garden with roses last november .", "value": "88%" },
    { "name": "he planted the garden last november with roses .", "value": "90%" },
    { "name": "the baby chewed the biscuit .", "value": "82%" },
    { "name": "the baby is heavy .", "value": "70%" },
    { "name": "what the baby did was chew the biscuit .", "value": "76%" },
    { "name": "the baby was chewing the biscuit .", "value": "84%" },
    { "name": "chew the biscuit !", "value": "78%" },
    { "name": "hartfield house is in surrey .", "value": "85%" },
    { "name": "mr knightley rode to kingston .", "value": "80%" },
    { "name": "eleanor and marianne travelled from shropshire .", "value": "86%" },
    { "name": "frank gave a piano to jane fairfax .", "value": "90%" },
    { "name": "jane fairfax received a piano from frank .", "value": "88%" },
    { "name": "the thief smashed the window with a hammer .", "value": "80%" },
    { "name": "captain wentworth recovered the property for mrs smith .", "value": "85%" },
    { "name": "the window was broken by a hammer .", "value": "60%" },
    { "name": "wren built st paul 's cathedral .", "value": "90%" },
    { "name": "siobhan burnt a pattern on the piece of wood .", "value": "80%" },
    { "name": "the dog dug a hole in the lawn .", "value": "84%" },
    { "name": "the vase stood on the table in the hall .", "value": "78%" },
    { "name": "imogen took the vase to her mother 's .", "value": "75%" },
    { "name": "imogen broke the vase .", "value": "82%" },
    { "name": "sue knows the answer .", "value": "88%" },
    { "name": "the answer is known to sue .", "value": "70%" },
    { "name": "jim was happily chopping logs .", "value": "70%" },
    { "name": "jim was chopping logs when margaret left and was still at it when she got back .", "value": "85%" },
    { "name": "jim was enthusiastically chopping logs .", "value": "90%" },
    { "name": "captain oates died in order to save his comrades .", "value": "80%" },
    { "name": "this arch supports the weight of the tower .", "value": "75%" },
    { "name": "what this arch does is support the weight of the tower .", "value": "82%" },
    { "name": "this arch is supporting the weight of the tower .", "value": "86%" },
    { "name": "the computer is playing six simultaneous games of three dimensional chess .", "value": "90%" },
    { "name": "the intense cold killed the climbers .", "value": "87%" },
    { "name": "the climbers were killed by the intense cold .", "value": "88%" },
    { "name": "the climbers were killed with the intense cold .", "value": "80%" },
    { "name": "catriona opened the door with this key .", "value": "75%" },
    { "name": "the visas are with the passports .", "value": "88%" },
    { "name": "sally went to the party with andrew .", "value": "85%" },
    { "name": "alan made the loaf with strong white flour .", "value": "80%" },
    { "name": "the builders made the wall with concrete blocks .", "value": "90%" },
    { "name": "the gardener planted roses in the garden .", "value": "85%" },
    { "name": "it was roses that the gardener planted in the garden .", "value": "80%" },
    { "name": "it is the garden that the gardener planted with roses .", "value": "88%" },
    { "name": "roses are certain to be planted in the garden by the gardener .", "value": "82%" },
    { "name": "the garden is certain to be planted with roses by the gardener .", "value": "75%" },
    { "name": "helen sent a scarf to jim for margaret .", "value": "85%" },
    { "name": "what happened was they went home .", "value": "75%" },
    { "name": "what happened was they knew his parents .", "value": "30%" },
    { "name": "we are knowing this theory .", "value": "25%" },
    { "name": "they 're believing everything you say .", "value": "90%" },
    { "name": "you 'll soon be owning all the land round here .", "value": "88%" },
    { "name": "what she did was e-mail all her friends .", "value": "80%" },
    { "name": "what she did was know this theory .", "value": "25%" },
    { "name": "what she did was be very cold .", "value": "30%" },
    { "name": "what she did was own all the land round here .", "value": "20%" },
    { "name": "harriet talked to emma for hours .", "value": "82%" },
    { "name": "the dog chased the cat for days .", "value": "75%" },
    { "name": "harriet told emma the whole story .", "value": "87%" },
    { "name": "the dog caught the cat .", "value": "88%" },
    { "name": "the beaver built a dam .", "value": "90%" },
    { "name": "anne played the tune on the piano .", "value": "75%" },
    { "name": "jane was playing the piano .", "value": "84%" }
]
,
        sesy: [
    { "name": "what place did john send the book ?", "value": "63%" },
    { "name": "who was the book sent by john .", "value": "32%" },
    { "name": "what place was the book sent by john ?", "value": "16%" },
    { "name": "only to the best students would he give this book .", "value": "33%" },
    { "name": "only the best students would he give this book .", "value": "47%" },
    { "name": "only to glasgow would he go by train .", "value": "79%" },
    { "name": "only glasgow would he travel by train .", "value": "22%" },
    { "name": "it is to the best students that he gives this book .", "value": "76%" },
    { "name": "it is the best students he gives this book .", "value": "27%" },
    { "name": "it is to ireland that he is going .", "value": "88%" },
    { "name": "it is ireland that he is going .", "value": "15%" },
    { "name": "he told her the whole story .", "value": "85%" },
    { "name": "she told him the whole story .", "value": "78%" },
    { "name": "the other plan she rejected out of hand .", "value": "67%" },
    { "name": "the vase got broken that sheila had brought all the way from .", "value": "84%" },
    { "name": "the plan was rejected out of hand that traffic should be banned .", "value": "76%" },
    { "name": "norman lemming jumped off the cliff and william lemming did so too .", "value": "65%" },
    { "name": "norman lemming jumped off the cliff and so did william lemming .", "value": "70%" },
    { "name": "harriet could n't marry mr knightley but emma could .", "value": "72%" },
    { "name": "what harriet did was marry mr martin .", "value": "80%" },
    { "name": "marry mr martin was what harriet did .", "value": "68%" },
    { "name": "emma insulted miss bates and annoyed mr knightley .", "value": "77%" },
    { "name": "harriet swooned .", "value": "62%" },
    { "name": "the book is astonishingly boring .", "value": "81%" },
    { "name": "the ethel we all know and love wishes to ask you some awkward questions .", "value": "84%" },
    { "name": "golfers can be good company .", "value": "75%" },
    { "name": "enthusiastic golfers with large handicaps can be good company .", "value": "88%" },
    { "name": "these enthusiastic golfers that i met at the nineteenth hole can be good company .", "value": "82%" },
    { "name": "golfer who is in training has a pretty powerful swing .", "value": "20%" },
    { "name": "memo ate the spaghetti .", "value": "85%" },
    { "name": "memo liked lasagna .", "value": "78%" },
    { "name": "emma made harriet her friend .", "value": "72%" },
    { "name": "the quiche and i were cooking .", "value": "83%" },
    { "name": "erika made her mother an omelet and the kitchen a mess .", "value": "76%" },
    { "name": "bill went to london on monday .", "value": "90%" },
    { "name": "bill went on monday to london .", "value": "87%" },
    { "name": "my brother lives near strasbourg .", "value": "72%" },
    { "name": "near strasbourg my brother lives .", "value": "85%" },
    { "name": "he planted the garden with roses last november .", "value": "88%" },
    { "name": "he planted the garden last november with roses .", "value": "90%" },
    { "name": "the baby chewed the biscuit .", "value": "82%" },
    { "name": "the baby is heavy .", "value": "70%" },
    { "name": "what the baby did was chew the biscuit .", "value": "76%" },
    { "name": "the baby was chewing the biscuit .", "value": "84%" },
    { "name": "chew the biscuit !", "value": "78%" },
    { "name": "hartfield house is in surrey .", "value": "85%" },
    { "name": "mr knightley rode to kingston .", "value": "80%" },
    { "name": "eleanor and marianne travelled from shropshire .", "value": "86%" },
    { "name": "frank gave a piano to jane fairfax .", "value": "90%" },
    { "name": "jane fairfax received a piano from frank .", "value": "88%" },
    { "name": "the thief smashed the window with a hammer .", "value": "80%" },
    { "name": "captain wentworth recovered the property for mrs smith .", "value": "85%" },
    { "name": "the window was broken by a hammer .", "value": "60%" },
    { "name": "wren built st paul 's cathedral .", "value": "90%" },
    { "name": "siobhan burnt a pattern on the piece of wood .", "value": "80%" },
    { "name": "the dog dug a hole in the lawn .", "value": "84%" },
    { "name": "the vase stood on the table in the hall .", "value": "78%" },
    { "name": "imogen took the vase to her mother 's .", "value": "75%" },
    { "name": "imogen broke the vase .", "value": "82%" },
    { "name": "sue knows the answer .", "value": "88%" },
    { "name": "the answer is known to sue .", "value": "70%" },
    { "name": "jim was happily chopping logs .", "value": "70%" },
    { "name": "jim was chopping logs when margaret left and was still at it when she got back .", "value": "85%" },
    { "name": "jim was enthusiastically chopping logs .", "value": "90%" },
    { "name": "captain oates died in order to save his comrades .", "value": "80%" },
    { "name": "this arch supports the weight of the tower .", "value": "75%" },
    { "name": "what this arch does is support the weight of the tower .", "value": "82%" },
    { "name": "this arch is supporting the weight of the tower .", "value": "86%" },
    { "name": "the computer is playing six simultaneous games of three dimensional chess .", "value": "90%" },
    { "name": "the intense cold killed the climbers .", "value": "87%" },
    { "name": "the climbers were killed by the intense cold .", "value": "88%" },
    { "name": "the climbers were killed with the intense cold .", "value": "80%" },
    { "name": "catriona opened the door with this key .", "value": "75%" },
    { "name": "the visas are with the passports .", "value": "88%" },
    { "name": "sally went to the party with andrew .", "value": "85%" },
    { "name": "alan made the loaf with strong white flour .", "value": "80%" },
    { "name": "the builders made the wall with concrete blocks .", "value": "90%" },
    { "name": "the gardener planted roses in the garden .", "value": "85%" },
    { "name": "it was roses that the gardener planted in the garden .", "value": "80%" },
    { "name": "it is the garden that the gardener planted with roses .", "value": "88%" },
    { "name": "roses are certain to be planted in the garden by the gardener .", "value": "82%" },
    { "name": "the garden is certain to be planted with roses by the gardener .", "value": "75%" },
    { "name": "helen sent a scarf to jim for margaret .", "value": "85%" },
    { "name": "what happened was they went home .", "value": "75%" },
    { "name": "what happened was they knew his parents .", "value": "30%" },
    { "name": "we are knowing this theory .", "value": "25%" },
    { "name": "they 're believing everything you say .", "value": "90%" },
    { "name": "you 'll soon be owning all the land round here .", "value": "88%" },
    { "name": "what she did was e-mail all her friends .", "value": "80%" },
    { "name": "what she did was know this theory .", "value": "25%" },
    { "name": "what she did was be very cold .", "value": "30%" },
    { "name": "what she did was own all the land round here .", "value": "20%" },
    { "name": "harriet talked to emma for hours .", "value": "82%" },
    { "name": "the dog chased the cat for days .", "value": "75%" },
    { "name": "harriet told emma the whole story .", "value": "87%" },
    { "name": "the dog caught the cat .", "value": "88%" },
    { "name": "the beaver built a dam .", "value": "90%" },
    { "name": "anne played the tune on the piano .", "value": "75%" },
    { "name": "jane was playing the piano .", "value": "84%" }
]

      }
    };

    // 更新 excelData
    this.excelData = dataMap[this.selectedSample][this.selectedMethod] || [];
  },

    updateChartData() {
      const dataMap = {
        sample1: {
          ours: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            { name: 'MC Dropout前向传播次数', value: 30 } // 仅在ours时出现
          ],
          zou: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ],
          fs_stega: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ],
          sesy: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ]
        },
        sample2: {
          ours: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            { name: 'MC Dropout前向传播次数', value: 30 } // 仅在ours时出现
          ],
          zou: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ],
          fs_stega: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ],
          sesy: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ]
        },
        sample3: {
          ours: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            { name: 'MC Dropout前向传播次数', value: 30 } // 仅在ours时出现
          ],
          zou: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ],
          fs_stega: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ],
          sesy: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ]
        },
        sample4: {
          ours: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            { name: 'MC Dropout前向传播次数', value: 30 } // 仅在ours时出现
          ],
          zou: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ],
          fs_stega: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ],
          sesy: [
            { name: '最大序列长度', value: 128 },
            { name: '每次随机选取的未标记样本量', value: 4096 },
            { name: '微调batch size', value: 4 },
            { name: '样本选择比', value: 25 },
            { name: '样本稳定性权重系数α', value: 0.1 },
            // 不包含MC Dropout前向传播次数
          ]
        },
        // 其他样本数据...
      };

      // 更新 chartData
      this.chartData = dataMap[this.selectedSample][this.selectedMethod] || [];
    },
    
    // fetchExcelData(sample, method) {
    //     getExcelData(sample, method) // 传递参数
    //         .then(response => {
    //           console.log("Response Data:", response);
    //             this.excelData = response.data.map(item => ({
    //                 name: item['sentence'], // 替换为实际的表头名称
    //                 value: item['label']   // 替换为实际的表头值
    //             }));
    //         })
    //         .catch(error => {
    //             console.error("Error fetching Excel data:", error);
    //         });
    // },
    getExcelFilePath(sample, method) {
      // 根据样本和方法构造 Excel 文件路径
      return `D:/日常/大学/竞赛/信安作品/RuoYi-Vue-master/RuoYi-Vue-master/train.xlsx`; // 假设文件名格式为 sample_method.xlsx
    },

    fetchExcelData(filePath) {
      axios.get(filePath, { responseType: 'arraybuffer' })
        .then(response => {
          const data = new Uint8Array(response.data);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          // 处理 JSON 数据，将其转换为适合你表格的数据结构
          // 假设第一列为 name，第二列为 value
          this.excelData = jsonData.slice(1).map(row => ({ name: row[0], value: row[1] }));
        })
        .catch(error => {
          console.error("Error fetching Excel file:", error);
        });
    },

    
    getValueClass(value) {
      if (value.endsWith('%')) {
        const percentage = parseInt(value, 10);
        if (percentage > 70) {
          return 'red'; // 70%以上显示为红色
        } else if (percentage < 30) {
          return 'green'; // 30%以下显示为绿色
        } else {
          return 'darkgray'; // 其他显示为深灰色
        }
      }
      return ''; // 如果不是百分比，返回空类
    },
    
    initPieChart() {
      const chartDom = this.$refs.pieChart;
      this.myChart = echarts.init(chartDom);
      this.updatePieChart(); // 初始化时更新饼图
    },
    
    updatePieChart() {
      // 根据选中的样本和方法更新饼图数据
      const dataMap = {
        sample1: { ours: [644, 20], zou: [400, 20], fs_stega: [300, 150], sesy: [200, 50] },
        sample2: { ours: [500, 300], zou: [320, 60], fs_stega: [400, 50], sesy: [250, 100] },
        sample3: { ours: [600, 50], zou: [350, 30], fs_stega: [450, 60], sesy: [270, 70] },
        sample4: { ours: [246, 264], zou: [312, 188], fs_stega: [334, 166], sesy: [178, 322] },
      };

      const sampleData = dataMap[this.selectedSample][this.selectedMethod];

      const option = {
        title: {
          left: 'center',
          text: `${this.selectedSample} - ${this.selectedMethod}`
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '隐写文本',
            type: 'pie',
            radius: '50%',
            data: [
              { value: sampleData[0], name: '正常文本' },
              { value: sampleData[1], name: '隐写文本' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ],
        color: ['#00FF00', '#FF0000']
      };

      this.myChart.setOption(option); // 更新饼图
    },
    
    updateImages() {
      // 根据样本和方法选择更新图片路径
      const imageMap = {
        sample1: {
          ours: {
            wordCloud: require('@/assets/images/wordcloud.png'),
            visualization: require('@/assets/images/ours1.png')
          },
          zou: {
            wordCloud: require('@/assets/images/wordcloud2.png'),
            visualization: require('@/assets/images/z1.png')
          },
          fs_stega: {
            wordCloud: require('@/assets/images/wordcloud3.png'),
            visualization: require('@/assets/images/fs1.png')
          },
          sesy: {
            wordCloud: require('@/assets/images/wordcloud4.png'),
            visualization: require('@/assets/images/sesy1.png')
          }
        },
        sample2: {
          ours: {
            wordCloud: require('@/assets/images/wordcloud.png'),
            visualization: require('@/assets/images/ours2.png')
          },
          zou: {
            wordCloud: require('@/assets/images/wordcloud2.png'),
            visualization: require('@/assets/images/z2.png')
          },
          fs_stega: {
            wordCloud: require('@/assets/images/wordcloud3.png'),
            visualization: require('@/assets/images/fs2.png')
          },
          sesy: {
            wordCloud: require('@/assets/images/wordcloud4.png'),
            visualization: require('@/assets/images/sesy2.png')
          }
        },
        sample3: {
          ours: {
            wordCloud: require('@/assets/images/wordcloud.png'),
            visualization: require('@/assets/images/ours3.png')
          },
          zou: {
            wordCloud: require('@/assets/images/wordcloud2.png'),
            visualization: require('@/assets/images/z3.png')
          },
          fs_stega: {
            wordCloud: require('@/assets/images/wordcloud3.png'),
            visualization: require('@/assets/images/fs3.png')
          },
          sesy: {
            wordCloud: require('@/assets/images/wordcloud4.png'),
            visualization: require('@/assets/images/sesy3.png')
          }
        },
        sample4: {
          ours: {
            wordCloud: require('@/assets/images/cloud1.png'),
            visualization: require('@/assets/images/ours4.png')
          },
          zou: {
            wordCloud: require('@/assets/images/cloud2.png'),
            visualization: require('@/assets/images/z4.png')
          },
          fs_stega: {
            wordCloud: require('@/assets/images/cloud3.png'),
            visualization: require('@/assets/images/fs4.png')
          },
          sesy: {
            wordCloud: require('@/assets/images/cloud4.png'),
            visualization: require('@/assets/images/sesy4.png')
          }
        },
      };

      // 更新词云和模型隐写检测效果可视化图片路径
      this.wordCloudImage = imageMap[this.selectedSample][this.selectedMethod].wordCloud;
      this.visualizationImage = imageMap[this.selectedSample][this.selectedMethod].visualization;
    },

    initWordCloud() {
      // 如果需要使用词云图表，则在此初始化
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
            // 词云数据...
          ]
        }]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.chart {
  width: 100%; /* 确保宽度为100% */
  height: 100%; /* 设置固定高度 */
}

.container {
  display: flex;
  flex-direction: column; /* 使容器为垂直方向 */
  height: 100vh; /* 高度占满视口 */
}

.header-box {
  height: 10%; /* 高度占 10% */
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px; 
  padding: 10px; /* 内边距 */
  display: flex; /* 使用 Flexbox */
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中 */
}

.main-content {
  display: flex; /* 使用 Flexbox 进行排版 */
  flex: 1; /* 剩余空间 */
  overflow: hidden; /* 防止溢出 */
}

.left {
  flex: 7; /* 左半部分占 70% */
  display: flex;
  flex-direction: column; /* 垂直排列 */
}

.right {
  flex: 3; /* 右半部分占 30% */
  display: flex;
  flex-direction: column; /* 垂直排列 */
}

.left-top-box {
  flex: 1; /* 占据剩余空间 */
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px;
  display: flex; /* 使用 Flexbox */
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中 */
}

.right-top-box {
  flex: 1; /* 占据剩余空间 */
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px;
  display: flex; /* 使用 Flexbox */
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中 */
}

.bottom-boxes {
  flex: 2; /* 占据更多空间 */
  display: flex; /* 使用 Flexbox */
  margin: 10px; /* 外边距 */
}

.left-box {
  flex: 1; /* 左侧框体占据一半 */
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px;
  display: flex; /* 使用 Flexbox */
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中 */
}

.right-box {
  flex: 1; /* 右侧框体占据一半 */
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px;
  display: flex; /* 使用 Flexbox */
  flex-direction: column; /* 垂直排列 */
  align-items: center; /* 水平居中 */
}

.box-title {
  font-weight: bold; /* 加粗 */
  text-align: center; /* 水平居中 */
  margin: 10px 0; /* 上下间距 */
}

.left-image {
  max-width: 80%; /* 确保图片最大宽度为80% */
  max-height: 80%; /* 确保图片最大高度为80% */
  object-fit: contain; /* 保持比例缩放 */
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px; /* 圆角 */
  overflow: hidden; /* 确保圆角效果 */
}

.data-table th,
.data-table td {
  border: 1px solid #ccc;
  padding: 12px; /* 增加内边距 */
  text-align: center;
}

.data-table th {
  background-color: #f2f2f2; /* 表头背景色 */
}

.data-table tr:nth-child(even) {
  background-color: #f9f9f9; /* 隔行颜色 */
}

.data-table tr:nth-child(odd) {
  background-color: #ffffff; /* 隔行颜色 */
}

.bottom-box {
  flex: 1;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 10px;
  overflow-y: auto; /* 添加垂直滚动条 */
}

.hidden {
  display: none; /* 隐藏类 */
}

.red {
  color: red; /* 70%以上 */
}

.green {
  color: green; /* 30%以下 */
}

.darkgray {
  color: darkgray; /* 其他 */
}

.dropdown-container {
  display: flex; /* 使用Flexbox进行排列 */
  align-items: center; /* 垂直居中对齐 */
}

.dropdown {
  margin-right: 10px; /* 下拉菜单之间的间距 */
  padding: 5px; /* 内边距 */
  border-radius: 5px; /* 圆角 */
  border: 1px solid #ccc; /* 边框 */
  background-color: #f9f9f9; /* 背景色 */
}

.view-button {
  padding: 5px 10px; /* 内边距 */
  border-radius: 5px; /* 圆角 */
  border: none; /* 无边框 */
  background-color: #007bff; /* 按钮背景色 */
  color: white; /* 按钮文本颜色 */
  cursor: pointer; /* 指针样式 */
}

.view-button:hover {
  background-color: #0056b3; /* 悬停效果 */
}
</style>

