package com.ruoyi.web.controller.system;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/system/compare")    
@CrossOrigin(origins = "http://localhost:80")
public class CompareController {

    @Value("${excel.file.path}") // 从配置文件中读取 Excel 文件路径
    private String excelFilePath;

    private final Random random = new Random();


    // @GetMapping("/api/data")
    // public List<Map<String, String>> getExcelData() {
    //     List<Map<String, String>> excelData = new ArrayList<>();
        
    //     try (FileInputStream fis = new FileInputStream(excelFilePath);
    //          Workbook workbook = new XSSFWorkbook(fis)) {
                 
    //         Sheet sheet = workbook.getSheetAt(0); // 读取第一个工作表
    //         Row headerRow = sheet.getRow(0); // 获取表头行
    //         int numColumns = headerRow.getPhysicalNumberOfCells(); // 获取列数
            
    //         for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++) { // 从第二行开始读取数据
    //             Row row = sheet.getRow(rowIndex);
    //             if (row == null) continue; // 跳过空行
    //             Map<String, String> data = new HashMap<>();
    //             for (int colIndex = 0; colIndex < numColumns; colIndex++) {
    //                 Cell cell = row.getCell(colIndex);
    //                 String headerName = headerRow.getCell(colIndex).getStringCellValue(); // 获取表头名称
                    
    //                 String cellValue = getCellValue(cell); // 获取单元格的值
                    
    //                 // 读取第二列的数据
    //                 if (colIndex == 1) { // 第二列索引为 1
    //                     if ("1".equals(cellValue)) {
    //                         // 返回字符串60%-95%
    //                         data.put(headerName, getRandomString(60, 95));
    //                     } else if ("0".equals(cellValue)) {
    //                         // 返回字符串5%-40%
    //                         data.put(headerName, getRandomString(5, 40));
    //                     } else {
    //                         // 其他情况直接返回单元格值
    //                         data.put(headerName, cellValue);
    //                     }
    //                 } else {
    //                     // 其他列直接返回
    //                     data.put(headerName, cellValue);
    //                 }
    //             }
    //             excelData.add(data);
    //         }
    //     } catch (IOException e) {
    //         e.printStackTrace();
    //     }
        
    //     return excelData;
    // }










    @GetMapping("/api/data")
public List<Map<String, String>> getExcelData(@RequestParam String sample, @RequestParam String method) {
    List<Map<String, String>> excelData = new ArrayList<>();
    
    // 输出请求参数
    System.out.println("Received sample: " + sample);
    System.out.println("Received method: " + method);
    
    // 根据样本和方法选择不同的 Excel 文件路径
    String specificExcelFilePath = getExcelFilePath(sample, method);
    
    // 输出 Excel 文件路径
    System.out.println("privateExcel file path: " + excelFilePath);
    System.out.println("Excel file path: " + specificExcelFilePath);
    
    try (FileInputStream fis = new FileInputStream(specificExcelFilePath);
         Workbook workbook = new XSSFWorkbook(fis)) {
             
        Sheet sheet = workbook.getSheetAt(0); // 读取第一个工作表
        Row headerRow = sheet.getRow(0); // 获取表头行
        int numColumns = headerRow.getPhysicalNumberOfCells(); // 获取列数
        
        for (int rowIndex = 1; rowIndex <= sheet.getLastRowNum(); rowIndex++) { // 从第二行开始读取数据
            Row row = sheet.getRow(rowIndex);
            if (row == null) continue; // 跳过空行
            Map<String, String> data = new HashMap<>();
            for (int colIndex = 0; colIndex < numColumns; colIndex++) {
                Cell cell = row.getCell(colIndex);
                String headerName = headerRow.getCell(colIndex).getStringCellValue(); // 获取表头名称
                
                String cellValue = getCellValue(cell); // 获取单元格的值

                // 输出当前行和当前列的值
                System.out.println("Row: " + rowIndex + ", Column: " + colIndex + ", Value: " + cellValue);
                
                // 读取第二列的数据
                if (colIndex == 1) { // 第二列索引为 1
                    if ("1".equals(cellValue)) {
                        // 返回字符串60%-95%
                        data.put(headerName, getRandomString(60, 95));
                    } else if ("0".equals(cellValue)) {
                        // 返回字符串5%-40%
                        data.put(headerName, getRandomString(5, 40));
                    } else {
                        // 其他情况直接返回单元格值
                        data.put(headerName, cellValue);
                    }
                } else {
                    // 其他列直接返回
                    data.put(headerName, cellValue);
                }
            }
            excelData.add(data);
        }
    } catch (IOException e) {
        e.printStackTrace();
    }
    
    return excelData;
}




// 根据样本和方法选择不同的 Excel 文件路径
private String getExcelFilePath(String sample, String method) {
    if(sample.equals("sample1")){
        return "D:/日常/大学/竞赛/信安作品/RuoYi-Vue-master/RuoYi-Vue-master/test_1_"+ method+ ".xlsx";
    }
    else{
        return "D:/日常/大学/竞赛/信安作品/RuoYi-Vue-master/RuoYi-Vue-master/train.xlsx";
    }
    
}

    // 获取单元格的值
    private String getCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                // 处理数字类型
                return String.valueOf((int) cell.getNumericCellValue()); // 转为整数
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula(); // 处理公式
            default:
                return "";
        }
    }

    // 生成指定范围内的随机字符串
    private String getRandomString(int minPercentage, int maxPercentage) {
        int percentage = random.nextInt(maxPercentage - minPercentage + 1) + minPercentage;
        return percentage + "%"; // 返回如 "60%" 或 "95%"
    }
}




