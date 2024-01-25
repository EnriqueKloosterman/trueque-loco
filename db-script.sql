
create database truequeLoco;
use truequeLoco;

create table if not exists users(
	user_id varchar(50) primary key not null unique,
	user_name varchar(100) not null,
	user_email varchar(100) not null unique,
	user_password varchar(20) not null,
	user_adress varchar(100) not null,
	user_phone int not null,
	user_avatar varchar(50),
	cratedAt datetime,
	updatedAt datetime
);

create table if not exists products(
	product_id varchar(50) primary key not null unique,
	product_name varchar(80) not null,
	price decimal not null,
	id_stock varchar(50) not null,
	id_user varchar(50) not null,
	createdAt datetime,
	updatedAt datetime
);

create table if not exists description(
	description_id varchar(50) primary key not null unique,
	description text not null,
	id_product varchar(50) not null,
	createdAt datetime,
	updatedAt datetime
);

create table if not exists category(
	category_id varchar(50) primary key not null unique,
	category varchar(50) not null,
	id_product varchar(50) not null,
	createdAt datetime,
	updatedAt datetime
);

create table if not exists productImage(
	image_id varchar(50) primary key not null unique,
	image varchar(50) not null,
	id_product varchar(50) not null,
	createdAt datetime,
	updatedAt datetime
);

create table if not exists coments(
	coment_id varchar(50) primary key not null unique,
	coment text not null,
	id_product varchar(50) not null,
	id_user varchar(50) not null,
	createdAt datetime,
	updatedAt datetime
);

create table if not exists stock(
	stock_id varchar(50) primary key not null unique,
	in_stock bool not null,
	stock tinyint not null,
	createdAt datetime,
	updatedAt datetime
);

alter table products 
add foreign key (id_user) references users(user_id);

alter table products 
add foreign key (id_stock) references stock(stock_id);

alter table description 
add foreign key (id_product) references products(product_id);

alter table category 
add foreign key (id_product) references products(product_id);

alter table productImage 
add foreign key (id_product) references products(product_id);

alter table coments
add foreign key (id_product) references products(product_id);

alter table coments
add foreign key (id_user) references users(user_id);



