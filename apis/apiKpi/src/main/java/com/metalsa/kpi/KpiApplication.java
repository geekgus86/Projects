package com.metalsa.kpi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class KpiApplication {

	public static void main(String[] args) {
		SpringApplication.run(KpiApplication.class, args);
	}
}
