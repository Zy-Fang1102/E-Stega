

# E-Stega

**E-Stega: A High-Performance Malicious Steganography Carrier Detection System Based on the RuoYi Framework**

<!-- PROJECT SHIELDS -->

[![watchers][watchers-shield]][watchers-url] [![Forks][forks-shield]][forks-url] [![Stargazers][stars-shield]][stars-url] [![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />

<p align="center">
  <a href="https://github.com/Zy-Fang1102/E-Stega/">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">E-Stega</h3>
  <p align="center">
    A High-Performance Malicious Steganography Carrier Detection System Based on the RuoYi Framework
    <br />
    <a href="https://github.com/Zy-Fang1102/E-Stega/"><strong>Explore the documentation of this project »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Zy-Fang1102/E-Stega/blob/master/README_En.md">English</a>
    ·
    <a href="https://github.com/Zy-Fang1102/E-Stega/blob/master/README.md">中文</a>


  </p>

</p>

### Project vision

​	Cryptography, as a discipline with a long history, has seen modern encryption and decryption technologies become very mature, with numerous related tools and platforms emerging online, gradually improving in functionality. However, steganography only found its rapid development opportunity with the rise of generative artificial intelligence technologies in recent years.

​	Therefore, we decided to develop a system aimed at ordinary users, with high-performance steganalysis capabilities. We believe that the development of this system will provide users with an easy-to-use and powerful steganography detection tool. Currently, the project is still under continuous improvement, but we firmly believe that **once the first step is taken, the second and third steps will follow...**.

### Project Objectives

- **Develop an efficient and user-friendly steganalysis tool** to help ordinary users detect and analyze steganographic information.
- **Leverage deep learning technology** to improve the accuracy and efficiency of steganography detection.
- **Provide a visual analysis interface** that allows users to intuitively understand the existence of steganographic information and its potential threats.
- **Target a wide range of application scenarios**, covering various mediums such as images, audio, and text, to address the needs of different users.



### System Introduction

​	**E-Stega** is a high-performance malicious steganography carrier detection system. The system consists of key modules such as **Basic Model, Data Preprocessing Module, MC Dropout Approximate Bayesian Module, Information Gain Calculation Module, Local Sampler Module, and Semi-supervised Model Fine-tuning Module**, ensuring that the system can efficiently detect malicious steganography carriers while significantly reducing system implementation costs, particularly the cost of data labeling.

### Design and Implementation

- [Technical Design Specification](https://github.com/Zy-Fang1102/E-Stega/blob/master/技术设计说明.pdf)

- [System Implementation Specification](https://github.com/Zy-Fang1102/E-Stega/tree/master/系统实现说明.pdf)

### System Functions

- **Detection Overview Display**: Provides a visual overview analysis of daily detection results.
- **Real-time System Monitoring**: Monitors system cache, CPU usage, GPU load, and other information in real time to prevent malicious attacks.
- **Target Steganography Detection**: Uses a trained small sample learning model to perform high-precision steganography analysis on target carriers.
- **Information Crawling**: Crawls information carriers such as audio, images, text, etc., from specified social media websites.
- **Detection Result Analysis**: Includes but is not limited to word cloud analysis, malicious probability analysis, detection model visualization, etc.

### Deployment and Usage Instructions

This system has two deployment modes: **Web version** and **App version**.

0. **Clone the repository**：

```cmd
git clone  https://github.com/Zy-Fang1102/E-Stega.git
cd E-Stega
```

#### Web version

1. **Install dependencies**：

```cmd
pip install -r requirements.txt
```

2. **Start the Redis service**：

```cmd
 .\redis-server.exe .\redis.windows.conf
```

3. **Start the frontend service in the `frontend` directory**：

```cmd
npm run dev
```

4. **Start the backend service in the `backend` directory**：

```cmd
mvn spring-boot:run
```

5. After the deployment is complete, we provide a demo video for reference. For details, see [Web version system demo](https://pan.baidu.com/s/118QCpemKKjNa3ayCxTY9hA?pwd=ge9y).

#### App version

Download the [APP](https://github.com/Zy-Fang1102/E-Stega/blob/master/APP/E-Stega.exe).

### Model Parameter Explanation

| Max sequence length | Number of unlabeled samples randomly selected each time | Learning rate | Fine-tuning epoch | Fine-tuning batch size | self-training epoch | self-training batch size | Number of MC Dropout forward passes | Sample selection rate | Sample stability weight coefficient $$\alpha$$ |
| :-----------------: | :-----------------------------------------------------: | :-----------: | :---------------: | :--------------------: | :-----------------: | :----------------------: | :---------------------------------: | :-------------------: | :--------------------------------------------: |
|         128         |                          4096                           |  3$$e^{-5}$$  |        100        |           4            |         25          |            32            |                 30                  |          25           |                      0.1                       |



### How to contribute to open source projects

Contributions make the open source community an excellent place for learning, inspiration, and creation. Any contribution you make is **greatly appreciated**.


1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Author

[fangzy@bupt.edu.cn](mailto:fangzy@bupt.edu.cn)

qq: 1577322025

*You can also view all the developers who contributed to the project in the list of contributors.*

### Copyright Notice

This project is licensed under the MIT License. For more details, please refer to the [LICENSE](https://github.com/Zy-Fang1102/E-Stega/blob/master/LICENSE).

<!-- links -->

[forks-shield]: https://img.shields.io/github/forks/Zy-Fang1102/E-Stega.svg?style=flat-square
[forks-url]: https://github.com/Zy-Fang1102/E-Stega/network/members
[stars-shield]: https://img.shields.io/github/stars/Zy-Fang1102/E-Stega.svg?style=flat-square
[stars-url]: https://github.com/Zy-Fang1102/E-Stega/stargazers
[license-shield]: https://img.shields.io/github/license/Zy-Fang1102/E-Stega.svg?style=flat-square
[license-url]: https://github.com/Zy-Fang1102/E-Stega/blob/master/LICENSE.txt

[watchers-shield]: https://img.shields.io/github/watchers/Zy-Fang1102/E-Stega.svg?style=flat-square
[watchers-url]: https://github.com/Zy-Fang1102/E-Stega/watchers
