package com.ruoyi.system.domain;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import com.ruoyi.common.annotation.Excel;
import com.ruoyi.common.core.domain.BaseEntity;

/**
 * 【请填写功能名称】对象 crawl
 * 
 * @author ruoyi
 * @date 2024-07-29
 */
public class Crawl extends BaseEntity
{
    private static final long serialVersionUID = 1L;

    /** 编号 */
    private Long id;

    /** 爬取文件 */
    @Excel(name = "爬取文件")
    private String filename;

    /** 爬取地址 */
    @Excel(name = "爬取地址")
    private String sourcePath;

    /** 下载地址 */
    @Excel(name = "下载地址")
    private String targetPath;

    /** 爬取时间 */
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Excel(name = "爬取时间", width = 30, dateFormat = "yyyy-MM-dd")
    private Date time;

    public void setId(Long id) 
    {
        this.id = id;
    }

    public Long getId() 
    {
        return id;
    }
    public void setFilename(String filename) 
    {
        this.filename = filename;
    }

    public String getFilename() 
    {
        return filename;
    }
    public void setSourcePath(String sourcePath) 
    {
        this.sourcePath = sourcePath;
    }

    public String getSourcePath() 
    {
        return sourcePath;
    }
    public void setTargetPath(String targetPath) 
    {
        this.targetPath = targetPath;
    }

    public String getTargetPath() 
    {
        return targetPath;
    }
    public void setTime(Date time) 
    {
        this.time = time;
    }

    public Date getTime() 
    {
        return time;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this,ToStringStyle.MULTI_LINE_STYLE)
            .append("id", getId())
            .append("filename", getFilename())
            .append("sourcePath", getSourcePath())
            .append("targetPath", getTargetPath())
            .append("time", getTime())
            .toString();
    }
}
