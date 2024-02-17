--SQL script to drop tables

SET foreign_key_checks = 0;

DROP Table Customers;

DROP Table Invoices;

DROP Table Invoice_Items;

DROP Table Menu_Items;               

DROP Table Products;                 
DROP Table Sales;                   
DROP Table Sales_Items;             
DROP Table Vendors;                  
DROP Table actor;                    
DROP Table address;                  
DROP Table category;                 
DROP Table city;                     
DROP Table country;                  
DROP Table customer;                 
DROP Table film;                     
DROP Table film_actor;               
DROP Table film_category;            
DROP Table film_text;                
DROP Table inventory;                
DROP Table language;                 
DROP Table payment;                  
DROP Table rental;                   
DROP Table staff;                   
DROP Table store; 

SET foreign_key_checks = 1;