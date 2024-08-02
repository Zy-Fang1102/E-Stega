package com.example.fzy.controll;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fzy.entity.History;
import com.example.fzy.mapper.HistoryMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.python.core.Py;
import org.python.core.PyFunction;
import org.python.core.PyObject;
import org.python.core.PyString;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.python.util.PythonInterpreter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@CrossOrigin
public class receiveController {
    @Autowired
    private HistoryMapper historyMapper;

    List<String> results = new ArrayList<>();
    @RequestMapping(value = "/upload",method = RequestMethod.POST)
    public void PostM(@RequestPart("file")MultipartFile file, HttpServletRequest request){
            History history = new History();
            String name = file.getOriginalFilename();
            System.out.println("正在处理文件:"+name+" 所属文件类型："+file.getContentType());
            history.setFilename(name);
            String result = handleFile(file);
            history.setResult(result);
            insert(history);
            //将文件原始名称与python判断结果作为最终结果加入数组
            results.add(file.getOriginalFilename() + ":" + result);

    }

    private String handleFile(MultipartFile file) {
        try {
            // 将上传的文件保存到临时目录
            String tempFilePath = saveToTempFile(file);
            System.out.println(tempFilePath);
            // 调用 Python 脚本处理临时文件
            String result = callPythonScript(tempFilePath);
            return result;
        } catch (Exception e) {
            // 处理异常
            e.printStackTrace();
            return "Error occurred";
        }
    }

    private String saveToTempFile(MultipartFile file) throws IOException {
        // 创建临时文件
        File tempFile = File.createTempFile("detect", ".g729a",new File("D:\\日常\\大学\\竞赛\\信安作品\\tmp"));
        // 将上传的文件内容写入临时文件
        file.transferTo(tempFile);
        //结束时自动删除文件
        tempFile.deleteOnExit();
        // 返回临时文件的路径
        return tempFile.getAbsolutePath();
    }

    private String callPythonScript(String filePath) {
        PythonInterpreter interpreter = new PythonInterpreter();
        //调用的python脚本的路径
        interpreter.execfile("D:\\tmp\\CL_test_QIM.py");
        //调用的py脚本中的函数
        PyFunction function = interpreter.get("test", PyFunction.class);
        //将文件路径作为参数传入
        PyString path_py = Py.newStringOrUnicode(filePath);
        PyObject pyObject = function.__call__(path_py);
        return pyObject.toString();
    }

    private String insert(History history){
        Long timeStamp = System.currentTimeMillis();  //获取当前时间戳
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String sd = sdf.format(new Date(Long.parseLong(String.valueOf(timeStamp))));
        history.setTime(sd);
        int i = historyMapper.insert(history);
        if (i > 0){
            return "插入成功";
        }
        else{
            return "插入失败";
        }
    }

    @RequestMapping(value = "/getResults",method = RequestMethod.POST,consumes = "application/json", produces = "application/json")
    public ResponseEntity<List<String>> SendM(){
        System.out.println("结果已发送");
        ResponseEntity<List<String>> responseEntity = ResponseEntity.ok(new ArrayList<>(results));
        return responseEntity;
    }

    @RequestMapping(value = "/clear",method = RequestMethod.GET)
    public ResponseEntity<List<String>> ClearM(){
        results.clear();
        System.out.println("结果已清除");
        ResponseEntity<List<String>> responseEntity = ResponseEntity.ok(new ArrayList<>(results));
        return responseEntity;
    }
    @PostMapping("/delete")
    public int delete(@RequestBody Map<String, String> payload){
        results.clear();
        String time = payload.get("date");
        if(time == null){
            return 0;
        }
        time = time.substring(0, 10);
        System.out.println(time);
        QueryWrapper<History> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("time", time);
        int c= historyMapper.delete(queryWrapper);
        System.out.println(c);
        return c;
    }
}
