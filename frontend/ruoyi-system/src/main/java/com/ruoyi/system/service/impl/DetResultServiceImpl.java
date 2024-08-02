package com.ruoyi.system.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.system.mapper.DetResultMapper;
import com.ruoyi.system.domain.DetResult;
import com.ruoyi.system.service.IDetResultService;

/**
 * 【请填写功能名称】Service业务层处理
 * 
 * @author ruoyi
 * @date 2024-07-28
 */
@Service
public class DetResultServiceImpl implements IDetResultService 
{
    @Autowired
    private DetResultMapper detResultMapper;

    /**
     * 查询【请填写功能名称】
     * 
     * @param id 【请填写功能名称】主键
     * @return 【请填写功能名称】
     */
    @Override
    public DetResult selectDetResultById(Long id)
    {
        return detResultMapper.selectDetResultById(id);
    }

    /**
     * 查询【请填写功能名称】列表
     * 
     * @param detResult 【请填写功能名称】
     * @return 【请填写功能名称】
     */
    @Override
    public List<DetResult> selectDetResultList(DetResult detResult)
    {
        return detResultMapper.selectDetResultList(detResult);
    }

    /**
     * 新增【请填写功能名称】
     * 
     * @param detResult 【请填写功能名称】
     * @return 结果
     */
    @Override
    public int insertDetResult(DetResult detResult)
    {
        return detResultMapper.insertDetResult(detResult);
    }

    @Override
    public String importDetResult(DetResult detResult, double sleepTime, double memory) {
        detResultMapper.insertDetResult(detResult);
        return ("检测成功！<br>本次检测用时：" + sleepTime + " 秒 <br>本次检测占用内存：" + memory + "MB");
    }
    

    /**
     * 修改【请填写功能名称】
     * 
     * @param detResult 【请填写功能名称】
     * @return 结果
     */
    @Override
    public int updateDetResult(DetResult detResult)
    {
        return detResultMapper.updateDetResult(detResult);
    }

    /**
     * 批量删除【请填写功能名称】
     * 
     * @param ids 需要删除的【请填写功能名称】主键
     * @return 结果
     */
    @Override
    public int deleteDetResultByIds(Long[] ids)
    {
        return detResultMapper.deleteDetResultByIds(ids);
    }

    /**
     * 删除【请填写功能名称】信息
     * 
     * @param id 【请填写功能名称】主键
     * @return 结果
     */
    @Override
    public int deleteDetResultById(Long id)
    {
        return detResultMapper.deleteDetResultById(id);
    }
}
