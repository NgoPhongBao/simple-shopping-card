 --database_name: dien_lanh_duy_nhat
CREATE TABLE CategoryProduct (
    ID int IDENTITY(1,1) ,
    Name nvarchar(250),
    CreatedDate varchar(255),
    Address Datetime,
    Enable bit
);
go
CREATE TABLE Product (
    ID int IDENTITY(1,1) ,
    Name nvarchar(250),
    ProductCatagoryID int,
    BrandId int,
    Price decimal,
    Description nvarchar(max),
	Title nvarchar(500),
	Images nvarchar(500),
	CreatedDate datetime,
	ModifyDate datetime,
	ModifyUser nvarchar(50),
	CreatedUser nvarchar(50),
	status int,
);
go
CREATE TABLE ProductImage (
    ID int IDENTITY(1,1) ,
    ProductID int,
	Status int,
	Images nvarchar(500),
	CreatedDate datetime,
	ModifyDate datetime,
	ModifyUser nvarchar(50),
	CreatedUser nvarchar(50),
);
go 
CREATE TABLE Store (
    ID int IDENTITY(1,1) ,
	Name nvarchar(300),
	Images nvarchar(200),
	Address nvarchar(300),
	TaxCode nvarchar(100),
	Email nvarchar(100),
	Phone nvarchar(100),
	Description nvarchar(500),
	Title nvarchar(200),
	Logo nvarchar(200),
	Maps nvarchar(1000),
	CreatedDate datetime,
	ModifyDate datetime,
	ModifyUser nvarchar(50),
	CreatedUser nvarchar(50),
);
go 
CREATE TABLE Brand (
    ID int IDENTITY(1,1) ,
	BrandName nvarchar(500),
	CreatedDate datetime,
	ModifyDate datetime,
	ModifyUser nvarchar(50),
	CreatedUser nvarchar(50),
);
go 
CREATE TABLE News (
    ID int IDENTITY(1,1) ,
	Title nvarchar(300),
	Image nvarchar(200),
	Description nvarchar(MAX),
	HotNum int,
	CreatedDate datetime,
	ModifyDate datetime,
	ModifyUser nvarchar(50),
	CreatedUser nvarchar(50),
);
go 
CREATE TABLE CusOrder (
    ID int IDENTITY(1,1) ,
	Phone nvarchar(200),
	CusName nvarchar(200),
	Status int,
	CreatedDate datetime,
	ModifyDate datetime,
	ModifyUser nvarchar(50),
);
go 
CREATE TABLE OderDetail (
    ID int IDENTITY(1,1) ,
	OrderID int,
	ProductID int,
	Price decimal,
	ProductTotal int,
	Status int,
	CreatedDate datetime,
	ModifyDate datetime,
	ModifyUser nvarchar(50),
);
go 
CREATE TABLE Banner (
    ID int IDENTITY(1,1) ,
	Image nvarchar(300),
	Url nvarchar(300),
	BannerType int,
	Enable bit,
	ProductTotal int,
	Status int,
	CreatedDate datetime,
	ModifyDate datetime,
	ModifyUser nvarchar(50),
	CreatedUser nvarchar(50),
);
go 
CREATE TABLE UserAccount (
    ID int IDENTITY(1,1) ,
	FullName nvarchar(300),
	UserName nvarchar(100),
	PassWord nvarchar(500),
	GroupRuleID int,
	CreatedDate datetime,
	ModifyDate datetime,
	ModifyUser nvarchar(50),
	CreatedUser nvarchar(50),
);
go 
CREATE TABLE GroupRule (
    ID int IDENTITY(1,1) ,
	Name nvarchar(300),
	CreatedDate datetime,
	ModifyDate datetime,
	ModifyUser nvarchar(50),
	CreatedUser nvarchar(50),
);
go 
