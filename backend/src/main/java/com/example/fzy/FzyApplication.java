package com.example.fzy;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.example.fzy.mapper")
public class FzyApplication {

    public static void main(String[] args) {
        SpringApplication.run(FzyApplication.class, args);
    }

}
