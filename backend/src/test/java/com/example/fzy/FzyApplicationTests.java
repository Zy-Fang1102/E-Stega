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
        assertTrue(isBeanPresent, "Bean '" + beanName + "' should be present in the application context");
        System.out.println("Bean '" + beanName + "' is present in the application context.");
    }

    @Test
    void verifyEnvironmentProperty() {
        // Verify that a specific environment property is loaded correctly
        String expectedPropertyValue = "fzy-application"; // Replace with expected value
        String actualPropertyValue = applicationContext.getEnvironment().getProperty("spring.application.name");
        assertEquals(expectedPropertyValue, actualPropertyValue, "Property 'spring.application.name' should match the expected value.");
        System.out.println("Property 'spring.application.name' has the expected value: " + actualPropertyValue);
    }

    @Test
    void checkApplicationBeansCount() {
        // Verify that the application context contains a positive number of beans
        int beanCount = applicationContext.getBeanDefinitionCount();
        assertTrue(beanCount > 0, () -> "Expected at least one bean in the application context, but found: " + beanCount);
        System.out.printf("Application context contains %d beans.%n", beanCount);
    }
}