/*
This T-SQL script creates a MS MSQL database with sample data

Tables:

-----------
| AppUser |
-----------
------------
| Category |
------------
    1|
     |
	M|
------------	 
| Product  |
------------

------------
| Link     |
------------
    1|
     |
	M|
------------	 
| Topic    |
------------


*/

/****** Object:  Table YOUR_STUDENT_NUMBER.AppUser ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE YOUR_STUDENT_NUMBER.AppUser(
	id int IDENTITY(1,1) NOT NULL,
	firstName nvarchar(255) NULL,
	lastName nvarchar(255) NULL,
	email nvarchar(255) NOT NULL,
	password nvarchar(255) NOT NULL,
	role nvarchar(10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	id ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table Category ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE YOUR_STUDENT_NUMBER.Category(
	id int IDENTITY(1,1) NOT NULL,
	categoryName nvarchar(255) NOT NULL,
	description nvarchar(255) NULL,
PRIMARY KEY CLUSTERED 
(
	id ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table YOUR_STUDENT_NUMBER.Product ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE YOUR_STUDENT_NUMBER.Product(
	id int IDENTITY(1,1) NOT NULL,
	categoryId int NULL,
	productName nvarchar(255) NOT NULL,
	description nvarchar(255) NULL,
	stock int NOT NULL,
	price decimal(10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	id ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT YOUR_STUDENT_NUMBER.AppUser ON 
GO
INSERT YOUR_STUDENT_NUMBER.AppUser (id, firstName, lastName, email, password, role) VALUES (1, 'Alice', 'Admin', 'alice@web.com', 'password', 'admin')
GO
INSERT YOUR_STUDENT_NUMBER.AppUser (id, firstName, lastName, email, password, role) VALUES (2, 'Bob', 'User', 'bob@web.com', 'password', 'user')
GO
INSERT YOUR_STUDENT_NUMBER.AppUser (id, firstName, lastName, email, password, role) VALUES (3, 'Eve', 'User', 'eve@web.com', 'password', 'user')
GO
SET IDENTITY_INSERT YOUR_STUDENT_NUMBER.AppUser OFF
GO
SET IDENTITY_INSERT YOUR_STUDENT_NUMBER.Category ON 
GO
INSERT YOUR_STUDENT_NUMBER.Category (id, categoryName, description) VALUES (1, 'Books', 'Paper and hard cover, fiction and non-fiction')
GO
INSERT YOUR_STUDENT_NUMBER.Category (id, categoryName, description) VALUES (2, 'Computer', 'Desktop, laptops, and accessories')
GO
INSERT YOUR_STUDENT_NUMBER.Category (id, categoryName, description) VALUES (3, 'Entertainment', 'Home electronicsa, TV, HiFi, etc.')
GO
INSERT YOUR_STUDENT_NUMBER.Category (id, categoryName, description) VALUES (4, 'Kitchen', 'Kitchen + cooking appliances')
GO
INSERT YOUR_STUDENT_NUMBER.Category (id, categoryName, description) VALUES (5, 'Laundry', 'Clothes washers, dryers, and accesories')
GO
INSERT YOUR_STUDENT_NUMBER.Category (id, categoryName, description) VALUES (6, 'Mobile Devices', 'Mobile phones, tablets, and accessories')
GO
INSERT YOUR_STUDENT_NUMBER.Category (id, categoryName, description) VALUES (7, 'Furniture', 'Home and home office furniture')
GO
SET IDENTITY_INSERT YOUR_STUDENT_NUMBER.Category OFF
GO
SET IDENTITY_INSERT YOUR_STUDENT_NUMBER.Product ON 
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (1, 4, 'Kettle', 'Steel Electric Kettle', 100, CAST(55.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (2, 4, 'Fridge freezer', 'Fridge + freezer large', 45, CAST(799.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (3, 2, 'Microsoft Surface Laptop 2', '8GB ram, 512GB ssd', 5, CAST(1299.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (4, 2, '13 inch Laptop', 'HP laptop,8GB RAM, 250GB SSD', 45, CAST(799.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (5, 6, 'Samsung 10 inch Tablet', 'Android 6GB ram, 128GB storage, 10 inch screen', 5, CAST(99.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (6, 3, '60 inch TV', 'Sony 4K, OLED,Smart TV', 12, CAST(2799.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (7, 5, 'Clothes Washing Machine', '1600rpm spin, A+++ rated, 10KG', 50, CAST(699.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (8, 6, 'iPhone XS', '128GB', 5, CAST(850.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (9, 1, 'Azure Web Apps', 'Paperback, January 2019, Cloud publishing', 50, CAST(19.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (10, 1, 'SQL and No SQL for beginners', 'Paperback, Oct 2018, Cloud publishing', 10, CAST(399.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (11, 7, 'Bed', 'Super King size,super comfort mattress', 5, CAST(899.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (12, 2, 'Learning JavaScript', 'Become a JavaScript expert in 2 hours!', 10, CAST(12.00 AS Decimal(10, 2)))
GO
INSERT YOUR_STUDENT_NUMBER.Product (id, categoryId, productName, description, stock, price) VALUES (13, 7, 'Desk', 'Small computer desk', 5, CAST(99.00 AS Decimal(10, 2)))
GO
SET IDENTITY_INSERT YOUR_STUDENT_NUMBER.Product OFF
GO
ALTER TABLE YOUR_STUDENT_NUMBER.Product ADD  DEFAULT ((0)) FOR stock
GO
ALTER TABLE YOUR_STUDENT_NUMBER.Product ADD  DEFAULT ((0.00)) FOR price
GO
ALTER TABLE YOUR_STUDENT_NUMBER.Product  WITH CHECK ADD FOREIGN KEY(CategoryId)
REFERENCES YOUR_STUDENT_NUMBER.Category (id)
GO

/****** Object:  Table YOUR_STUDENT_NUMBER.Picture ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE YOUR_STUDENT_NUMBER.Picture(
	id int IDENTITY(1,1) NOT NULL,
	productId int NOT NULL,
    pictureName text NOT NULL,
    picture varbinary(MAX) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	id ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table YOUR_STUDENT_NUMBER.Topic ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE YOUR_STUDENT_NUMBER.Topic(
	id int IDENTITY(1,1) NOT NULL,
	topicName nvarchar(255) NOT NULL,
	description nvarchar(255) NULL,
PRIMARY KEY CLUSTERED 
(
	id ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table YOUR_STUDENT_NUMBER.Link ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE YOUR_STUDENT_NUMBER.Link(
	id int IDENTITY(1,1) NOT NULL,
	topicId int NULL,
	linkDate datetime NULL,
	linkName nvarchar(255) NULL,
	description nvarchar(255) NULL,
	notes nvarchar(255) NULL,
	linkURL nvarchar(255) NULL,
PRIMARY KEY CLUSTERED 
(
	id ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE YOUR_STUDENT_NUMBER.Link  WITH CHECK ADD FOREIGN KEY(TopicId)
REFERENCES YOUR_STUDENT_NUMBER.Topic (id)
GO
