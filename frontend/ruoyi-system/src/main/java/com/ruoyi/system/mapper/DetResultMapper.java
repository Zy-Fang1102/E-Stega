package com.ruoyi.system.mapper;

import java.util.List;
import com.ruoyi.system.domain.DetResult;

/**
 * 【请填写功能名称】Mapper接口
 * 
 * @author ruoyi
 * @date 2024-07-28
 */
public interface DetResultMapper 
{
    /**
     * 查询【请填写功能名称】
     * 
     * @param id 【请填写功能名称】主键
     * @return 【请填写功能名称】
     */
    public DetResult selectDetResultById(Long id);

    /**
     * 查询【请填写功能名称】列表
     * 
     * @param detResult 【请填写功能名称】
     * @return 【请填写功能名称】集合
     */
    public List<DetResult> selectDetResultList(DetResult detResult);

    /**
     * 新增【请填写功能名称】
     * 
     * @param detResult 【请填写功能名称】
     * @return 结果
     */
    public int insertDetResult(DetResult detResult);

    /**
     * 修改【请填写功能名称】
     * 
     * @param detResult 【请填写功能名称】
     * @return 结果
     */
    public int updateDetResult(DetResult detResult);

    /**
     * 删除【请填写功能名称】
     * 
     * @param id 【请填写功能名称】主键
     * @return 结果
     */
    public int deleteDetResultById(Long id);

    /**
     * 批量删除【请填写功能名称】
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteDetResultByIds(Long[] ids);
}
