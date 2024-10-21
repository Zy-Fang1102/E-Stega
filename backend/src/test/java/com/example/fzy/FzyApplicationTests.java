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
    void checkSpecificBeanPresence() {
        // Verify if a specific bean exists in the application context
        String beanName = "exampleBeanName"; // Replace with an actual bean name
        boolean isBeanPresent = applicationContext.containsBean(beanName);
        assertTrue(isBeanPresent, () -> "Bean '" + beanName + "' should be present in the application context, but it is not found.");
        System.out.printf("Bean '%s' is present in the application context.%n", beanName);
    }
    
    @Test
    void verifyEnvironmentProperty() {
        // Verify that a specific environment property is loaded correctly
        String propertyKey = "spring.application.name";
        String expectedPropertyValue = "fzy-application"; // Replace with expected value
        String actualPropertyValue = applicationContext.getEnvironment().getProperty(propertyKey);
    
        assertNotNull(actualPropertyValue, () -> "Property '" + propertyKey + "' should not be null.");
        assertEquals(expectedPropertyValue, actualPropertyValue, 
            () -> String.format("Property '%s' expected to be '%s', but was '%s'.", propertyKey, expectedPropertyValue, actualPropertyValue));
    
        System.out.printf("Property '%s' has the expected value: '%s'.%n", propertyKey, actualPropertyValue);
    }
    
}