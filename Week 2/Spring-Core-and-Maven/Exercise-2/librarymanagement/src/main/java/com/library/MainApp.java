package com.library;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.library.service.BookService;

public class MainApp {

    public static void main(String[] args) {

        // Load the Spring configuration file
        ApplicationContext context =
                new ClassPathXmlApplicationContext("applicationContext.xml");

        // Get the bean from the Spring container
        BookService service = context.getBean("bookService", BookService.class);

        // Call the service method
        service.displayService();

        // Close the context
        ((ClassPathXmlApplicationContext) context).close();
    }
}