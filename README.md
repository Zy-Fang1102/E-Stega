

# E-Stega

**E-Stega：基于RuoYi框架的高性能恶意隐写载体检测系统**

<!-- PROJECT SHIELDS -->

[![Contributors][contributors-shield]][contributors-url][![watchers][watchers-shield]][watchers-url][![Forks][forks-shield]][forks-url][![Stargazers][stars-shield]][stars-url][![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/Zy-Fang1102/E-Stega/">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">E-Stega</h3>
  <p align="center">
    基于RuoYi框架的高性能恶意隐写载体检测系统
    <br />
    <a href="https://github.com/Zy-Fang1102/E-Stega/"><strong>探索本项目的文档 »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Zy-Fang1102/E-Stega/blob/master/README_En">English</a>
    ·
    <a href="https://github.com/Zy-Fang1102/E-Stega/blob/master/README.md">中文</a>

  </p>

</p>

### 项目愿景

​	密码学作为一门历史悠久的学科，现代加解密技术已经非常成熟，且相关的工具和平台在网络上层出不穷，功能也逐步趋于完善。然而，隐写术直到近几年生成式人工智能技术的兴起才迎来了快速发展的契机。

​	因此，我们决定着手开发一套面向普通用户、具有高性能隐写分析能力的系统。我们相信，这一系统的研发够为广大用户提供易用且功能强大的隐写检测工具。目前，该项目仍在不断完善中，但我们坚信，**迈出第一步，就会有第二步、第三步......**。

### 项目目标

- **开发一套高效、易用的隐写分析工具**，帮助普通用户检测和分析隐写信息。
- **借助深度学习技术**，提升隐写检测的精度和效率。
- **提供可视化的分析界面**，使得用户能够直观地理解隐写信息的存在与潜在威胁。
- **面向广泛应用场景**，涵盖图像、音频、文本等多种载体，解决不同用户需求。



### 系统简介

​	**E-Stega** 是一套高性能恶意隐写载体检测系统。系统由**基础模型、数据预处理模块、MC Dropout近似贝叶斯模块、信息增益计算模块、局部采样器模块和半监督模型微调模块**等关键模块组成，确保了系统可以高效完成对恶意隐写载体的检测，同时大大降低系统实现成本，特别是数据标注成本。

### 设计与实现

- [技术设计说明](https://github.com/Zy-Fang1102/E-Stega/blob/master/技术设计说明.pdf)
- [系统实现说明](https://github.com/Zy-Fang1102/E-Stega/tree/master/系统实现说明)

### 系统功能

- **检测总览显示**：针对每日检测情况做可视化总览分析。
- **系统状态实时监控**：实时监控系统的缓存、CPU使用率、GPU负载等信息，预防恶意攻击。
- **目标隐写检测**：使用训练好的小样本学习模型完成对载体目标的高精度隐写分析。
- **信息爬取**：对指定社交媒体网站爬取信息载体，如音频、图像、文本等。
- **检测结果分析**：包括但不限于词云分析，恶意概率分析，检测模型可视化等。

### 部署与使用说明

本系统有**网页端**和**APP端**两种部署模式。

0. **克隆仓库**：

```cmd
git clone  https://github.com/Zy-Fang1102/E-Stega.git
cd E-Stega
```

#### 网页端

1. **安装依赖**：

```cmd
pip install -r requirements.txt
```

2. **启动redis服务**：

```cmd
 .\redis-server.exe .\redis.windows.conf
```

3. **在frontend目录下启动前端服务**：

```cmd
npm run dev
```

4. **在backend目录下启动后端服务**：

```cmd
mvn spring-boot:run
```

5. 部署完成后，我们提供了使用演示视频以供参考，详情见于[Web端系统演示](https://pan.baidu.com/s/118QCpemKKjNa3ayCxTY9hA?pwd=ge9y)。

#### APP端

下载[APP](https://github.com/your_project_url)即可。

### 模型参数说明

| 最大序列长度 | 每次随机选取的未标记样本数量 |   学习率    | 微调epoch | 微调batch size | 自训练epoch | 自训练batch size | MC Dropout前向传播次数 | 样本选择比 | 样本稳定性权重系数 $$\alpha$$ |
| :----------: | :--------------------------: | :---------: | :-------: | :------------: | :---------: | :--------------: | :--------------------: | :--------: | :---------------------------: |
|     128      |             4096             | 3$$e^{-5}$$ |    100    |       4        |     25      |        32        |           30           |     25     |              0.1              |



### 如何参与开源项目

贡献使开源社区成为一个学习、激励和创造的绝佳场所。你所作的任何贡献都是**非常感谢**的。


1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 作者

[fangzy@bupt.edu.cn](mailto:fangzy@bupt.edu.cn)

qq: 1577322025

 *您也可以在贡献者名单中参看所有参与该项目的开发者。*

### 版权说明

该项目签署了MIT 授权许可，详情请参阅 [LICENSE](https://github.com/Zy-Fang1102/E-Stega/blob/master/LICENSE)。

<!-- links -->

[contributors-shield]: https://img.shields.io/github/contributors/Zy-Fang1102/E-Stega.svg?style=flat-square
[contributors-url]: https://github.com/Zy-Fang1102/E-Stega/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Zy-Fang1102/E-Stega.svg?style=flat-square
[forks-url]: https://github.com/Zy-Fang1102/E-Stega/network/members
[stars-shield]: https://img.shields.io/github/stars/Zy-Fang1102/E-Stega.svg?style=flat-square
[stars-url]: https://github.com/Zy-Fang1102/E-Stega/stargazers
[license-shield]: https://img.shields.io/github/license/Zy-Fang1102/E-Stega.svg?style=flat-square
[license-url]: https://github.com/Zy-Fang1102/E-Stega/blob/master/LICENSE.txt
[watchers-shield]: https://img.shields.io/github/watchers/Zy-Fang1102/E-Stega.svg?style=flat-square
[watchers-url]: https://github.com/Zy-Fang1102/E-Stega/watchers

