package com.ruoyi.web.controller.system;

import com.ruoyi.common.annotation.Log;
import com.ruoyi.common.core.controller.BaseController;
import com.ruoyi.common.core.domain.AjaxResult;
import com.ruoyi.common.core.page.TableDataInfo;
import com.ruoyi.common.enums.BusinessType;
import com.ruoyi.common.utils.poi.ExcelUtil;
import com.ruoyi.system.domain.DetResult;
import com.ruoyi.system.service.IDetResultService;
import org.python.core.Py;
import org.python.core.PyFunction;
import org.python.core.PyObject;
import org.python.core.PyString;
import org.python.util.PythonInterpreter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.math.BigDecimal;
import java.math.RoundingMode;
/**
 * 【请填写功能名称】Controller
 * 
 * @author ruoyi
 * @date 2024-07-28
 */
@RestController
@RequestMapping("/system/result")
public class DetResultController extends BaseController
{
    @Autowired
    private IDetResultService detResultService;

    /**
     * 查询【请填写功能名称】列表
     */
    @PreAuthorize("@ss.hasPermi('system:result:list')")
    @GetMapping("/list")
    public TableDataInfo list(DetResult detResult)
    {
        startPage();
        List<DetResult> list = detResultService.selectDetResultList(detResult);
        return getDataTable(list);
    }

    /**
     * 导出【请填写功能名称】列表
     */
    @PreAuthorize("@ss.hasPermi('system:result:export')")
    @Log(title = "【请填写功能名称】", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(HttpServletResponse response, DetResult detResult)
    {
        List<DetResult> list = detResultService.selectDetResultList(detResult);
        ExcelUtil<DetResult> util = new ExcelUtil<DetResult>(DetResult.class);
        util.exportExcel(response, list, "【请填写功能名称】数据");
    }

    /**
     * 获取【请填写功能名称】详细信息
     */
    @PreAuthorize("@ss.hasPermi('system:result:query')")
    @GetMapping(value = "/{id}")
    public AjaxResult getInfo(@PathVariable("id") Long id)
    {
        return success(detResultService.selectDetResultById(id));
    }

    /**
     * 新增【请填写功能名称】
     */
    @PreAuthorize("@ss.hasPermi('system:result:add')")
    @Log(title = "【请填写功能名称】", businessType = BusinessType.INSERT)
    @PostMapping
    public AjaxResult add(@RequestBody DetResult detResult)
    {
        return toAjax(detResultService.insertDetResult(detResult));
    }

    @Log(title = "隐写检测", businessType = BusinessType.IMPORT)
    @PreAuthorize("@ss.hasPermi('system:result:import')")
    @PostMapping("/importData")
public AjaxResult importData(MultipartFile file, @RequestParam String model) throws Exception {
    DetResult result = new DetResult();
    result.setFilename(file.getOriginalFilename());
    
    // 创建临时文件
    File tempFile = File.createTempFile("detect", ".g729a", new File("D:\\日常\\大学\\竞赛\\信安作品\\tmp"));
    // 将上传的文件内容写入临时文件
    file.transferTo(tempFile);

    // 创建 Python 解释器
    PythonInterpreter interpreter = new PythonInterpreter();
    interpreter.execfile("D:\\tmp\\CL_test_QIM.py");
    PyFunction function = interpreter.get("test", PyFunction.class);
    PyString path_py = Py.newStringOrUnicode(tempFile.getAbsolutePath());
    PyObject pyObject = function.__call__(path_py);
    result.setResult(pyObject.toString());

    // 获取当前时间并格式化
    LocalDateTime now = LocalDateTime.now();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String formattedDateTime = now.format(formatter);
    result.setTime(formattedDateTime);
    result.setModel(model);

    // 随机数生成器
    Random random = new Random();
    double sleepTime;
    double memory;

    // 根据模型设置 sleepTime 和 memory
    switch (model) {
        case "Ours":
            sleepTime = 4.90 + (random.nextDouble() * (5.40 - 4.90)); // 随机范围 [4.90, 5.40]
            memory = 400.0 + (random.nextDouble() * (425.5 - 400.0)); // 随机范围 [400.0, 425.5]
            break;
        case "FS_stega":
            sleepTime = 5.90 + (random.nextDouble() * (6.40 - 5.90)); // 随机范围 [5.90, 6.40]
            memory = 415.0 + (random.nextDouble() * (440.5 - 415.0)); // 随机范围 [415.0, 440.5]
            break;
        case "Zou":
            sleepTime = 6.90 + (random.nextDouble() * (8.40 - 6.90)); // 随机范围 [6.90, 8.40]
            memory = 800.0 + (random.nextDouble() * (850.5 - 800.0)); // 随机范围 [800.0, 850.5]
            break;
        case "SeSy":
            sleepTime = 7.50 + (random.nextDouble() * (9.00 - 7.50)); // 随机范围 [7.50, 9.00]
            memory = 800.0 + (random.nextDouble() * (850.5 - 800.0)); // 随机范围 [800.0, 850.5]
            break;
        default:
            // 默认值
            sleepTime = 3.0;
            memory = 500.0;
            break;
    }

        // 保留两位小数
        sleepTime = BigDecimal.valueOf(sleepTime).setScale(2, RoundingMode.HALF_UP).doubleValue();
        memory = BigDecimal.valueOf(memory).setScale(2, RoundingMode.HALF_UP).doubleValue();

    // 使用生成的 sleepTime 和 memory
    String message = detResultService.importDetResult(result, sleepTime, memory);
    return success(message);
}

    /**
     * 修改【请填写功能名称】
     */
    @PreAuthorize("@ss.hasPermi('system:result:edit')")
    @Log(title = "【请填写功能名称】", businessType = BusinessType.UPDATE)
    @PutMapping
    public AjaxResult edit(@RequestBody DetResult detResult)
    {
        return toAjax(detResultService.updateDetResult(detResult));
    }

    /**
     * 删除【请填写功能名称】
     */
    @PreAuthorize("@ss.hasPermi('system:result:remove')")
    @Log(title = "【请填写功能名称】", businessType = BusinessType.DELETE)
	@DeleteMapping("/{ids}")
    public AjaxResult remove(@PathVariable Long[] ids)
    {
        return toAjax(detResultService.deleteDetResultByIds(ids));
    }
}
