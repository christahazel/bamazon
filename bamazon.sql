CREATE TABLE departments (
	    id integer auto_increment not null, 
	    department_name varchar(20) not null,
	    department_name varchar(20) not null,
	    primary key(id)
    );

CREATE TABLE products (
		id int auto_increment not null primary key unique,  
		product_name varchar(20) not null,  
		department_id int, 
		price decimal(10,2) not null, 
		stock_quantity int not null, foreign key(department_id) references departments(id) 
	);

CREATE TABLE sales (
	   id INTEGER(11) AUTO_INCREMENT NOT NULL,
	   product_id INTEGER NOT NULL,
	   quantity_purchased INTEGER NOT NULL,
	   created_at datetime NOT NULL DEFAULT NOW(),
	   PRIMARY KEY(id),
	   FOREIGN KEY(product_id) references products(id)
   );


INSERT INTO departments (id, department_name, over_head_costs) 
	VALUES ('makeup', 5000), ('skincare', 5000), ('fragrance', 5000);


INSERT INTO products (product_name, department_id, price, stock_quantity) 
	VALUES 
		('Lipstick', 1, "25.00", 15), 
		('Bronzer', 1, "12.00", 15), 
		('Mascara', 1, "12.00", 15), 
		('Highlighter', 1, "25.00", 15), 
		('Face Wash', 2, "32.00", 15), 
		('Face Masks', 2, "30.00", 15), 
		('Daily Moisturizer', 2, "45.00", 15), 
		('Maison Margiela', 3, "25.00", 15), 
		('Stella McCartney', 3, "25.00", 15), 
		('Escada', 3, "25.00", 15);
