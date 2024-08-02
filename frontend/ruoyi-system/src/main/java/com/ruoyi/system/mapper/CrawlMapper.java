package com.ruoyi.system.mapper;

import java.util.List;
import com.ruoyi.system.domain.Crawl;

/**
 * 【请填写功能名称】Mapper接口
 * 
 * @author ruoyi
 * @date 2024-07-29
 */
public interface CrawlMapper 
{
    /**
     * 查询【请填写功能名称】
     * 
     * @param id 【请填写功能名称】主键
     * @return 【请填写功能名称】
     */
    public Crawl selectCrawlById(Long id);

    /**
     * 查询【请填写功能名称】列表
     * 
     * @param crawl 【请填写功能名称】
     * @return 【请填写功能名称】集合
     */
    public List<Crawl> selectCrawlList(Crawl crawl);

    /**
     * 新增【请填写功能名称】
     * 
     * @param crawl 【请填写功能名称】
     * @return 结果
     */
    public int insertCrawl(Crawl crawl);

    /**
     * 修改【请填写功能名称】
     * 
     * @param crawl 【请填写功能名称】
     * @return 结果
     */
    public int updateCrawl(Crawl crawl);

    /**
     * 删除【请填写功能名称】
     * 
     * @param id 【请填写功能名称】主键
     * @return 结果
     */
    public int deleteCrawlById(Long id);

    /**
     * 批量删除【请填写功能名称】
     * 
     * @param ids 需要删除的数据主键集合
     * @return 结果
     */
    public int deleteCrawlByIds(Long[] ids);
}
