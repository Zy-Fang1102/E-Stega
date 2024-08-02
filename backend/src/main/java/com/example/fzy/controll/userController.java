package com.example.fzy.controll;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.fzy.entity.History;
import com.example.fzy.mapper.HistoryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class userController {

    @Autowired
    private HistoryMapper historyMapper;

    @PostMapping("/history")
    public List query(@RequestBody Map<String, String> payload){
        List<History> historyList= historyMapper.selectList(null);
        System.out.println(historyList);
        return historyList;
    }
    @PostMapping("/time")
    public List<History> time(@RequestBody Map<String, String> payload){
        String time = payload.get("date");
        time = time.substring(0, 10);
        System.out.println(time);
        QueryWrapper<History> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("time", time);
        List<History> historyList= historyMapper.selectList(queryWrapper);
        System.out.println(historyList);
        return historyList;
    }


}
