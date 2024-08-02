package com.ruoyi.system.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ruoyi.system.mapper.CrawlMapper;
import com.ruoyi.system.domain.Crawl;
import com.ruoyi.system.service.ICrawlService;

/**
 * 【请填写功能名称】Service业务层处理
 * 
 * @author ruoyi
 * @date 2024-07-29
 */
@Service
public class CrawlServiceImpl implements ICrawlService 
{
    @Autowired
    private CrawlMapper crawlMapper;

    /**
     * 查询【请填写功能名称】
     * 
     * @param id 【请填写功能名称】主键
     * @return 【请填写功能名称】
     */
    @Override
    public Crawl selectCrawlById(Long id)
    {
        return crawlMapper.selectCrawlById(id);
    }

    /**
     * 查询【请填写功能名称】列表
     * 
     * @param crawl 【请填写功能名称】
     * @return 【请填写功能名称】
     */
    @Override
    public List<Crawl> selectCrawlList(Crawl crawl)
    {
        return crawlMapper.selectCrawlList(crawl);
    }

    /**
     * 新增【请填写功能名称】
     * 
     * @param crawl 【请填写功能名称】
     * @return 结果
     */
    @Override
    public int insertCrawl(Crawl crawl)
    {
        return crawlMapper.insertCrawl(crawl);
    }

    /**
     * 修改【请填写功能名称】
     * 
     * @param crawl 【请填写功能名称】
     * @return 结果
     */
    @Override
    public int updateCrawl(Crawl crawl)
    {
        return crawlMapper.updateCrawl(crawl);
    }

    /**
     * 批量删除【请填写功能名称】
     * 
     * @param ids 需要删除的【请填写功能名称】主键
     * @return 结果
     */
    @Override
    public int deleteCrawlByIds(Long[] ids)
    {
        return crawlMapper.deleteCrawlByIds(ids);
    }

    /**
     * 删除【请填写功能名称】信息
     * 
     * @param id 【请填写功能名称】主键
     * @return 结果
     */
    @Override
    public int deleteCrawlById(Long id)
    {
        return crawlMapper.deleteCrawlById(id);
    }
}
