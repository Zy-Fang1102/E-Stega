package com.example.fzy;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FzyApplicationTests {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    void contextLoads() {
        // Check if the application context loads successfully
        assertNotNull(applicationContext, "Application context should not be null");
        System.out.println("Application context loaded successfully.");
    }

    @Test
    void beanLoadingTest() {
        // Check if a specific bean is loaded in the context
        boolean isBeanPresent = applicationContext.containsBean("exampleBeanName");
        assertTrue(isBeanPresent, "Example bean should be present in the application context");
        System.out.println("Bean 'exampleBeanName' is loaded in the context.");
    }

    @Test
    void propertiesTest() {
        // Check if the application loads the correct property values
        String propertyValue = applicationContext.getEnvironment().getProperty("spring.application.name");
        assertEquals("fzy-application", propertyValue, "Application name should match 'fzy-application'");
        System.out.println("Application property 'spring.application.name' is correctly set.");
    }
}