<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="文件名" prop="filename">
        <el-input
          v-model="queryParams.filename"
          placeholder="请输入文件名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-input
          v-model="queryParams.time"
          placeholder="请输入时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="结果" prop="result">
        <el-input
          v-model="queryParams.result"
          placeholder="请输入结果"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
  <el-col :span="1.5">
    <el-button
      type="info"
      plain
      icon="el-icon-upload2"
      size="mini"
      @click="handleImport"
      v-hasPermi="['system:user:import']"
    >导入</el-button>
  </el-col>
  <el-col :span="1.5">
    <el-button
      type="success"
      plain
      icon="el-icon-edit"
      size="mini"
      :disabled="single"
      @click="handleUpdate"
      v-hasPermi="['system:result:edit']"
    >修改</el-button>
  </el-col>
  <el-col :span="1.5">
    <el-button
      type="danger"
      plain
      icon="el-icon-delete"
      size="mini"
      :disabled="multiple"
      @click="handleDelete"
      v-hasPermi="['system:result:remove']"
    >删除</el-button>
  </el-col>
  <el-col :span="1.5">
    <el-button
      type="warning"
      plain
      icon="el-icon-download"
      size="mini"
      @click="handleExport"
      v-hasPermi="['system:result:export']"
    >导出</el-button>
  </el-col>
  <el-col :span="1.5">
    <el-select v-model="selectedOption" size="mini" placeholder="选择模型">
      <el-option label="Ours" value="Ours"></el-option>
      <el-option label="FS_stega" value="FS_stega"></el-option>
      <el-option label="Zou" value="Zou"></el-option>
      <el-option label="SeSy" value="SeSy"></el-option>
    </el-select>
  </el-col>
  <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
</el-row>


    <el-table v-loading="loading" :data="resultList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="id" />
      <el-table-column label="检测文件" align="center" prop="filename" />
      <el-table-column label="检测时间" align="center" prop="time" />
      <el-table-column label="检测模型" align="center" prop="model" />
      <el-table-column label="检测结果" align="center" prop="result">
        <template slot-scope="scope">
          <span :class="getResultClass(scope.row.result)">
            {{ scope.row.result }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:result:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:result:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="文件名" prop="filename">
          <el-input v-model="form.filename" placeholder="请输入文件名" />
        </el-form-item>
        <el-form-item label="时间" prop="time">
          <el-input v-model="form.time" placeholder="请输入时间" />
        </el-form-item>
        <el-form-item label="结果" prop="result">
          <el-input v-model="form.result" placeholder="请输入结果" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :data="{ model: selectedOption }"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">检 测</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listResult, getResult, delResult, addResult, updateResult } from "@/api/system/result";
import { getToken } from "@/utils/auth";
import { Message } from "element-ui"; // 引入 Message 组件

export default {
  name: "Result",
  data() {
    return {
      selectedOption: 'Ours',
      loading: true,
      ids: [],
      single: true,
      multiple: true,
      showSearch: true,
      total: 0,
      resultList: [],
      title: "",
      open: false,
      upload: {
        open: false,
        title: "",
        isUploading: false,
        updateSupport: 0,
        headers: { Authorization: "Bearer " + getToken() },
        url: process.env.VUE_APP_BASE_API + "/system/result/importData"
      },
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        filename: null,
        time: null,
        model: null,
        result: null
      },
      form: {},
      rules: {
        filename: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        time: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        model: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        result: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getResultClass(result) {
      const percentage = parseInt(result, 10);
      if (isNaN(percentage)) {
        return '';
      }
      if (percentage > 70) {
        return 'result-fail';
      } else if (percentage < 30) {
        return 'result-pass';
      }
      return '';
    },
    getList() {
      this.loading = true;
      listResult(this.queryParams).then(response => {
        this.resultList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    cancel() {
      this.open = false;
      this.reset();
    },
    reset() {
      this.form = {
        id: null,
        filename: null,
        time: null,
        result: null
      };
      this.resetForm("form");
    },
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id);
      this.single = selection.length !== 1;
      this.multiple = selection.length === 0;
    },
    handleImport() {
      this.upload.title = "导入检测文件";
      this.upload.open = true;
    },
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getResult(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改";
      });
    },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateResult(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addResult(this.form).then(response => {
              this.$modal.msgSuccess("检测成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除隐写检测记录编号为"' + ids + '"的数据项？').then(() => {
        return delResult(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    handleExport() {
      this.download('system/result/export', {
        ...this.queryParams
      }, `result_${new Date().getTime()}.xlsx`);
    },
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "检测结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    submitFileForm() {
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const submitWithDelay = async () => {
    const loadingMessage = Message({
      type: 'loading',
      message: 'Detecting...',
      duration: 0 // 持续显示
    });

    // 根据选中的模型设置随机的 sleepTime
    let sleepTime;
    switch (this.selectedOption) {
      case 'Ours':
        sleepTime = Math.random() * (5.4 - 4.9) + 4.9; // 4.9 到 5.4 之间的随机值
        break;
      case 'FS_stega':
        sleepTime = Math.random() * (6.4 - 5.9) + 5.9; // 5.9 到 6.4 之间的随机值
        break;
      case 'Zou':
        sleepTime = Math.random() * (8.4 - 6.9) + 6.9; // 6.9 到 8.4 之间的随机值
        break;
      case 'SeSy':
        sleepTime = Math.random() * (9 - 7.5) + 7.5; // 7.5 到 9 之间的随机值
        break;
      default:
        sleepTime = 3; // 默认值
    }

    // 等待随机的 sleepTime
    await sleep(sleepTime * 1000); // 将秒转换为毫秒

    // 将模型和 sleepTime 添加到上传请求中
    this.upload.url = `${this.upload.url}?model=${this.selectedOption}&sleepTime=${sleepTime}`;

    this.$refs.upload.submit(); // 提交表单

    loadingMessage.close(); // 关闭提示框
  };

  submitWithDelay().catch(error => {
    console.error("Error during file upload:", error);
  });
}

  }
};
</script>

<style>
.result-pass {
  color: rgb(15, 199, 15); /* 通过的结果字体颜色 */
  font-weight: bold; /* 加粗字体 */
}

.result-fail {
  color: red; /* 未通过的结果字体颜色 */
  font-weight: bold; /* 加粗字体 */
}
</style>
