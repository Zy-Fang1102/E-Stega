package com.ruoyi.framework.config;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import com.ruoyi.common.utils.ServletUtils;

/**
 * 服务相关配置
 * 
 * @author ruoyi
 */
@Component
@Configuration
public class SecurityConfig
{
    /**
     * 自定义用户认证逻辑
     */
    @Autowired
    private UserDetailsService userDetailsService;
    
    /**
     * 认证失败处理类
     */
    @Autowired
    private AuthenticationEntryPointImpl unauthorizedHandler;

    /**
     * 退出处理类
     */
    @Autowired
    private LogoutSuccessHandlerImpl logoutSuccessHandler;

    /**
     * token认证过滤器
     */
    @Autowired
    private JwtAuthenticationTokenFilter authenticationTokenFilter;
