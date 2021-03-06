USE [master]
GO
/****** Object:  Database [BAO_TEST]    Script Date: 4/18/2022 1:46:06 PM ******/
CREATE DATABASE [BAO_TEST]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BAO_TEST', FILENAME = N'/var/opt/mssql/data\BAO_TEST.ndf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BAO_TEST_log', FILENAME = N'/var/opt/mssql/data\BAO_TEST_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [BAO_TEST] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BAO_TEST].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BAO_TEST] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BAO_TEST] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BAO_TEST] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BAO_TEST] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BAO_TEST] SET ARITHABORT OFF 
GO
ALTER DATABASE [BAO_TEST] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [BAO_TEST] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BAO_TEST] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BAO_TEST] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BAO_TEST] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BAO_TEST] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BAO_TEST] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BAO_TEST] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BAO_TEST] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BAO_TEST] SET  ENABLE_BROKER 
GO
ALTER DATABASE [BAO_TEST] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BAO_TEST] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BAO_TEST] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BAO_TEST] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BAO_TEST] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BAO_TEST] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BAO_TEST] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BAO_TEST] SET RECOVERY FULL 
GO
ALTER DATABASE [BAO_TEST] SET  MULTI_USER 
GO
ALTER DATABASE [BAO_TEST] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BAO_TEST] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BAO_TEST] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BAO_TEST] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BAO_TEST] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BAO_TEST] SET QUERY_STORE = OFF
GO
USE [BAO_TEST]
GO
/****** Object:  UserDefinedFunction [dbo].[F_STRINGLIST_TO_TABLE]    Script Date: 4/18/2022 1:46:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[F_STRINGLIST_TO_TABLE] ( @LIST NVARCHAR(MAX), @CHAR nvarchar(1) )
RETURNS @PARSEDLIST TABLE ( ITEM NVARCHAR(128) )
AS
    BEGIN
        INSERT  @PARSEDLIST
                SELECT  t.c.value('.', 'NVARCHAR(128)')
                FROM    ( SELECT    x = CAST('<t>' + REPLACE(@LIST, @CHAR,
                                                             '</t><t>')
                                    + '</t>' AS XML)
                        ) a
                        CROSS APPLY x.nodes('/t') t ( c );
        RETURN;
    END;


	--select * from f_StringList2Table_char('1,2,3',',')
GO
/****** Object:  Table [dbo].[About]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[About](
	[AboutId] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](500) NULL,
	[ImageUrl] [nvarchar](250) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [varchar](50) NULL,
	[CreatedUser] [varchar](50) NULL,
	[Content] [nvarchar](max) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Attribute]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Attribute](
	[AttributeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [varchar](50) NULL,
	[CreatedUser] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AttributeValue]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AttributeValue](
	[AttributeValueId] [int] IDENTITY(1,1) NOT NULL,
	[AttributeId] [int] NULL,
	[ProductId] [int] NULL,
	[AttValue] [nvarchar](500) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Banner]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Banner](
	[BannerId] [int] IDENTITY(1,1) NOT NULL,
	[ImageUrl] [varchar](300) NULL,
	[Link] [varchar](300) NULL,
	[Enable] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [varchar](50) NULL,
	[CreatedUser] [varchar](50) NULL,
	[BannerType] [varchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Brand]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Brand](
	[BrandId] [int] IDENTITY(1,1) NOT NULL,
	[BrandName] [nvarchar](500) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [nvarchar](50) NULL,
	[CreatedUser] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CusOrder]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CusOrder](
	[OrderId] [int] IDENTITY(1,1) NOT NULL,
	[PhoneNumber] [nvarchar](200) NULL,
	[FullName] [nvarchar](200) NULL,
	[Status] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [varchar](50) NULL,
	[CreatedUser] [varchar](50) NULL,
	[Address] [nvarchar](500) NULL,
	[Note] [nvarchar](1000) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[News]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[News](
	[NewsId] [int] IDENTITY(1,1) NOT NULL,
	[NewsTitle] [nvarchar](300) NULL,
	[ImageUrl] [nvarchar](200) NULL,
	[NewsDescription] [nvarchar](1000) NULL,
	[IsHot] [bit] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [nvarchar](50) NULL,
	[CreatedUser] [nvarchar](50) NULL,
	[OrderIndex] [int] NULL,
	[Content] [nvarchar](max) NULL,
	[Enable] [bit] NULL,
	[Url] [varchar](255) NULL,
	[Title] [nvarchar](255) NULL,
	[Keywords] [nvarchar](255) NULL,
	[Description] [nvarchar](1000) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderDetail]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetail](
	[OrderDetailId] [int] IDENTITY(1,1) NOT NULL,
	[OrderId] [int] NULL,
	[ProductId] [int] NULL,
	[Price] [decimal](18, 0) NULL,
	[Number] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [varchar](50) NULL,
	[CreatedUer] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Permission]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Permission](
	[PermissionId] [int] IDENTITY(1,1) NOT NULL,
	[PermissionName] [nvarchar](300) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [varchar](50) NULL,
	[CreatedUser] [varchar](50) NULL,
	[PermissionType] [varchar](255) NULL,
	[PermissionKey] [varchar](255) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PermissionGroup]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PermissionGroup](
	[PermissionGroupId] [int] IDENTITY(1,1) NOT NULL,
	[PermissionGroupName] [nvarchar](300) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [varchar](50) NULL,
	[CreatedUser] [varchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PermissionGroupPermisstion]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PermissionGroupPermisstion](
	[PermissionGroupPermissionId] [int] IDENTITY(1,1) NOT NULL,
	[PermissionGroupId] [int] NULL,
	[PermissionId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](250) NULL,
	[ProductCategoryId] [int] NULL,
	[BrandId] [int] NULL,
	[Price] [decimal](18, 0) NULL,
	[ProductDescription] [nvarchar](max) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [nvarchar](50) NULL,
	[CreatedUser] [nvarchar](50) NULL,
	[Enable] [bit] NULL,
	[ShortDescription] [nvarchar](1000) NULL,
	[IsTopSale] [bit] NULL,
	[IsNew] [bit] NULL,
	[Url] [varchar](255) NULL,
	[Title] [nvarchar](255) NULL,
	[Keywords] [nvarchar](255) NULL,
	[Description] [nvarchar](1000) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductCategory]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductCategory](
	[ProductCategoryId] [int] IDENTITY(1,1) NOT NULL,
	[ProductCategoryName] [nvarchar](250) NULL,
	[CreatedDate] [datetime] NULL,
	[Enable] [bit] NULL,
	[CreatedUer] [varchar](50) NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [varchar](50) NULL,
	[OrderIndex] [int] NULL,
	[Url] [varchar](255) NULL,
	[Title] [nvarchar](255) NULL,
	[Keywords] [nvarchar](255) NULL,
	[Description] [nvarchar](1000) NULL,
	[IsTopCategory] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProductImage]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProductImage](
	[ProductImageId] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NULL,
	[ImageUrl] [nvarchar](500) NULL,
	[IsDefault] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SeoPage]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SeoPage](
	[SeoPageId] [int] IDENTITY(1,1) NOT NULL,
	[Url] [varchar](255) NULL,
	[Title] [nvarchar](255) NULL,
	[Keywords] [nvarchar](255) NULL,
	[Description] [nvarchar](1000) NULL,
	[Page] [varchar](50) NULL,
	[CreatedUser] [varchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyUser] [varchar](50) NULL,
	[ModifyDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Store]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Store](
	[StoreId] [int] IDENTITY(1,1) NOT NULL,
	[StoreName] [nvarchar](300) NULL,
	[ImageUrl] [nvarchar](250) NULL,
	[Address] [nvarchar](300) NULL,
	[TaxCode] [nvarchar](100) NULL,
	[Email] [nvarchar](100) NULL,
	[PhoneNumber] [nvarchar](100) NULL,
	[LogoUrl] [varchar](250) NULL,
	[Maps] [nvarchar](1000) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [varchar](50) NULL,
	[CreatedUser] [varchar](50) NULL,
	[OpenTime] [nvarchar](300) NULL,
	[ShortDescription] [nvarchar](1000) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Url]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Url](
	[UrlId] [int] IDENTITY(1,1) NOT NULL,
	[Url] [varchar](255) NULL,
	[Type] [varchar](255) NULL,
	[SiteId] [int] NULL,
 CONSTRAINT [PK__Seo__3214EC0705DAF623] PRIMARY KEY CLUSTERED 
(
	[UrlId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserAccount]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserAccount](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](300) NULL,
	[Username] [nvarchar](100) NOT NULL,
	[Password] [nvarchar](300) NULL,
	[PermissionGroupid] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifyDate] [datetime] NULL,
	[ModifyUser] [varchar](50) NULL,
	[CreatedUser] [varchar](50) NULL,
	[Enable] [bit] NULL,
	[PhoneNumber] [varchar](50) NULL,
	[IsAdmin] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ViewNum]    Script Date: 4/18/2022 1:46:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ViewNum](
	[ViewNumId] [int] IDENTITY(1,1) NOT NULL,
	[ViewNumber] [int] NULL,
	[ViewDate] [datetime] NULL,
 CONSTRAINT [PK__Seo__3214EC0705DAF623_copy1] PRIMARY KEY CLUSTERED 
(
	[ViewNumId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[About] ON 

INSERT [dbo].[About] ([AboutId], [Title], [ImageUrl], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Content]) VALUES (5, N'Tổng quan về chúng tôi.', N'http://localhost:3003/upload/b27cb301-3fd8-47a9-bc0d-1a4ad956e6fe.png', CAST(N'2022-04-02T00:48:58.193' AS DateTime), CAST(N'2022-04-02T01:01:06.160' AS DateTime), NULL, NULL, N'<p>THUỶ SINH XANH được thành lập từ ngày 07/09/2020. Hiên tại, Cửa hàng chúng tôi đang hoạt động chính ở khu vực Tp. Hồ Chí Minh và một số tỉnh ở miền nam Việt Nam. Chúng tôi kinh doanh, phân phối các thiết bị liên quan đến Thuỷ sinh, nuôi cá cảnh, tép cảnh. Thuỷ sinh xanh còn nhận tư vấn, lắp đặt các bể cá thuỷ sinh trong nhà, ngoài trời. Lắp đặt và xây dựng bể cá koi, cá rồng trong nhà, quán cà phê, nhà hàng, khách sạn.</p>
<p>Mong muốn của chúng tôi là mang thiên nhiên đến gần bạn hơn, giúp cuộc sống của bạn trở nên thực sự thư giản, thoải mái sau những giờ làm việc cực nhọc. Chúng tôi luôn làm việc với triết lý ” thuỷ sinh phục vụ cuộc sống”, chính vì vậy mà sản phẩm của chúng tôi tạo ra luôn đơn giản, dễ sử dụng nhất nhưng cũng rất đẹp dành cho khách hàng của mình.</p>')
SET IDENTITY_INSERT [dbo].[About] OFF
GO
SET IDENTITY_INSERT [dbo].[Attribute] ON 

INSERT [dbo].[Attribute] ([AttributeId], [Name], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser]) VALUES (2, N'Cân nặng', CAST(N'2022-04-16T16:45:41.540' AS DateTime), CAST(N'2022-04-18T09:22:47.460' AS DateTime), N'bao', N'admin')
INSERT [dbo].[Attribute] ([AttributeId], [Name], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser]) VALUES (3, N'Chiều cao', CAST(N'2022-04-18T09:22:57.613' AS DateTime), NULL, NULL, N'bao')
INSERT [dbo].[Attribute] ([AttributeId], [Name], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser]) VALUES (4, N'Chiều rộng', CAST(N'2022-04-18T09:23:05.430' AS DateTime), NULL, NULL, N'bao')
SET IDENTITY_INSERT [dbo].[Attribute] OFF
GO
SET IDENTITY_INSERT [dbo].[AttributeValue] ON 

INSERT [dbo].[AttributeValue] ([AttributeValueId], [AttributeId], [ProductId], [AttValue]) VALUES (7, 2, 10, N'25kg')
INSERT [dbo].[AttributeValue] ([AttributeValueId], [AttributeId], [ProductId], [AttValue]) VALUES (8, 4, 10, N'0.5m')
INSERT [dbo].[AttributeValue] ([AttributeValueId], [AttributeId], [ProductId], [AttValue]) VALUES (9, 2, 6, N'100kg')
INSERT [dbo].[AttributeValue] ([AttributeValueId], [AttributeId], [ProductId], [AttValue]) VALUES (10, 3, 6, N'1m5')
INSERT [dbo].[AttributeValue] ([AttributeValueId], [AttributeId], [ProductId], [AttValue]) VALUES (11, 4, 6, N'1m')
SET IDENTITY_INSERT [dbo].[AttributeValue] OFF
GO
SET IDENTITY_INSERT [dbo].[Banner] ON 

INSERT [dbo].[Banner] ([BannerId], [ImageUrl], [Link], [Enable], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [BannerType]) VALUES (19, N'http://localhost:3003/upload/6782314a-047c-4ced-bb47-b09465949430.jpeg', N'', 1, CAST(N'2022-04-03T15:19:37.210' AS DateTime), CAST(N'2022-04-03T18:32:14.137' AS DateTime), N'bao', N'bao', N'main-banner')
INSERT [dbo].[Banner] ([BannerId], [ImageUrl], [Link], [Enable], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [BannerType]) VALUES (14, N'http://localhost:3003/upload/c7d09f8b-e389-4cf1-8483-dfb4583d3cfc.jpeg', N'', 0, CAST(N'2022-04-02T22:50:40.570' AS DateTime), NULL, NULL, N'admin', N'sub-banner')
SET IDENTITY_INSERT [dbo].[Banner] OFF
GO
SET IDENTITY_INSERT [dbo].[Brand] ON 

INSERT [dbo].[Brand] ([BrandId], [BrandName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser]) VALUES (1, N'Suzuki', CAST(N'2022-03-29T00:31:55.300' AS DateTime), NULL, NULL, N'bao')
INSERT [dbo].[Brand] ([BrandId], [BrandName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser]) VALUES (2, N'Toshiba', CAST(N'2022-03-29T00:33:29.583' AS DateTime), NULL, NULL, N'bao')
SET IDENTITY_INSERT [dbo].[Brand] OFF
GO
SET IDENTITY_INSERT [dbo].[CusOrder] ON 

INSERT [dbo].[CusOrder] ([OrderId], [PhoneNumber], [FullName], [Status], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Address], [Note]) VALUES (2, N'0977478228', N'Ngô Phong Bảo', 99, CAST(N'2022-04-02T11:52:00.383' AS DateTime), CAST(N'2022-04-02T17:09:54.410' AS DateTime), N'admin', N'Ngô Phong B?o', N'62/25/7 Lâm Van Bền', N'2131313132')
INSERT [dbo].[CusOrder] ([OrderId], [PhoneNumber], [FullName], [Status], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Address], [Note]) VALUES (3, N'0977478228', N'Ngô Phong Bảo', 1, CAST(N'2022-04-02T11:54:56.327' AS DateTime), CAST(N'2022-04-02T19:11:20.240' AS DateTime), N'admin', N'Ngô Phong B?o', N'62/25/7 Lâm Văn Bền, P. Tân Kiểng , Quận 7, TPHCM', N'1231231231312')
INSERT [dbo].[CusOrder] ([OrderId], [PhoneNumber], [FullName], [Status], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Address], [Note]) VALUES (4, N'0764277772', N'Ngô Phong Bảo', 4, CAST(N'2022-04-02T12:23:08.630' AS DateTime), CAST(N'2022-04-10T21:59:36.827' AS DateTime), N'bao', N'Customner', N'', NULL)
INSERT [dbo].[CusOrder] ([OrderId], [PhoneNumber], [FullName], [Status], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Address], [Note]) VALUES (5, N'0906463698', N'Thinh', 4, CAST(N'2022-04-02T14:03:57.027' AS DateTime), CAST(N'2022-04-10T21:42:49.840' AS DateTime), N'bao', N'Customner', N'13131231', N'13131313131313131')
SET IDENTITY_INSERT [dbo].[CusOrder] OFF
GO
SET IDENTITY_INSERT [dbo].[News] ON 

INSERT [dbo].[News] ([NewsId], [NewsTitle], [ImageUrl], [NewsDescription], [IsHot], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [OrderIndex], [Content], [Enable], [Url], [Title], [Keywords], [Description]) VALUES (158, N'Thông tin thêm về vụ tai nạn trên cao tốc Thành phố Hồ Chí Minh - Trung Lương', N'http://localhost:3003/upload/8a1d65fa-9c29-4e01-9865-cfd072ef7278.jpeg', N'Liên quan đến vụ tai nạn trên cao tốc Thành phố Hồ Chí Minh – Trung Lương, trưa 29-3, Văn phòng Ủy ban nhân dân Thành phố Hồ Chí Minh đã có thông tin chính thức về vụ việc.', 0, CAST(N'2022-03-30T08:43:17.907' AS DateTime), CAST(N'2022-04-01T01:26:14.490' AS DateTime), N'bao', N'bao', 0, N'<p>Cụ thể, vào lúc 7 giờ 20 phút ngày 29-3, tại km21+700 cao tốc Thành phố Hồ Chí Minh - Trung Lương hướng Thành phố Hồ Chí Minh đi Trung Lương (thuộc xã Thạnh Đức, huyện Bến Lức, tỉnh Long An), xe ô tô của ông Lê Hòa Bình, Phó chủ tịch Thường trực UBND Thành phố Hồ Chí Minh trên đường đi công tác đã gặp tai nạn.</p>
<p><img src="http://localhost:3003/upload/f7f4d1d3-adc1-409a-98d7-a57a2a427fd6.png" alt="" width="415" height="382" /></p>
<p>Mặc dù đã được các bác sĩ tại Bệnh viện đa khoa Long An, Bệnh viện Chợ Rẫy phối hợp cấp cứu kịp thời nhưng ông Lê Hòa Bình đã qua đời.</p>', 1, N'thong-tin-them-ve-vu-tai-nan-tren-cao-toc-thanh-pho-ho-chi-minh-trung-luong', N'', N'', N'')
SET IDENTITY_INSERT [dbo].[News] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderDetail] ON 

INSERT [dbo].[OrderDetail] ([OrderDetailId], [OrderId], [ProductId], [Price], [Number], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUer]) VALUES (1, 2, 8, CAST(20000000 AS Decimal(18, 0)), 1, NULL, NULL, NULL, NULL)
INSERT [dbo].[OrderDetail] ([OrderDetailId], [OrderId], [ProductId], [Price], [Number], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUer]) VALUES (2, 2, 7, CAST(15000000 AS Decimal(18, 0)), 2, NULL, NULL, NULL, NULL)
INSERT [dbo].[OrderDetail] ([OrderDetailId], [OrderId], [ProductId], [Price], [Number], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUer]) VALUES (3, 3, 5, CAST(40000 AS Decimal(18, 0)), 2, NULL, NULL, NULL, NULL)
INSERT [dbo].[OrderDetail] ([OrderDetailId], [OrderId], [ProductId], [Price], [Number], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUer]) VALUES (4, 4, 3, CAST(5000000 AS Decimal(18, 0)), 1, NULL, NULL, NULL, NULL)
INSERT [dbo].[OrderDetail] ([OrderDetailId], [OrderId], [ProductId], [Price], [Number], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUer]) VALUES (5, 5, 7, CAST(15000000 AS Decimal(18, 0)), 1, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[OrderDetail] OFF
GO
SET IDENTITY_INSERT [dbo].[Permission] ON 

INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (1, N'Thêm mới bài viết', CAST(N'2022-03-25T14:36:11.533' AS DateTime), NULL, NULL, N'admin', N'news', N'NEWS_ADD')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (2, N'Xem bài viết', CAST(N'2022-03-25T14:45:38.893' AS DateTime), NULL, NULL, N'admin', N'news', N'NEWS_VIEW')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (3, N'Sửa bài viết', CAST(N'2022-03-25T14:54:41.930' AS DateTime), CAST(N'2022-03-25T14:54:53.450' AS DateTime), N'admin', N'admin', N'news', N'NEWS_EDIT')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (4, N'Xóa bài viết', CAST(N'2022-03-25T14:55:15.737' AS DateTime), NULL, NULL, N'admin', N'news', N'NEWS_DELETE')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (5, N'Xem user', CAST(N'2022-03-25T14:55:53.917' AS DateTime), NULL, NULL, N'admin', N'user', N'USERACCOUNT_VIEW')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (6, N'Thêm mới user', CAST(N'2022-03-25T14:56:11.877' AS DateTime), NULL, NULL, N'admin', N'user', N'USERACCOUNT_ADD')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (7, N'Sửa user', CAST(N'2022-03-25T14:56:25.727' AS DateTime), NULL, NULL, N'admin', N'user', N'USERACCOUNT_EDIT')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (8, N'Xóa user', CAST(N'2022-03-25T14:56:43.300' AS DateTime), NULL, NULL, N'admin', N'user', N'USERACCOUNT_DELETE')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (9, N'Sửa thông tin cửa hàng', CAST(N'2022-03-25T14:59:12.183' AS DateTime), NULL, NULL, N'admin', N'store', N'STORE_EDIT')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (10, N'Xem sản phẩm', CAST(N'2022-03-25T15:14:57.020' AS DateTime), NULL, NULL, N'bao', N'product', N'PRODUCT_VEW')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (11, N'Thêm mới sản phẩm', CAST(N'2022-03-25T15:15:24.307' AS DateTime), NULL, NULL, N'bao', N'product', N'PRODUCT_ADD')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (12, N'Sửa sản phẩm', CAST(N'2022-03-25T15:15:43.840' AS DateTime), CAST(N'2022-03-30T08:53:52.023' AS DateTime), N'bao', N'bao', N'product', N'PRODUCT_EDIT')
INSERT [dbo].[Permission] ([PermissionId], [PermissionName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [PermissionType], [PermissionKey]) VALUES (13, N'Xóa sản phẩm', CAST(N'2022-03-25T15:15:55.573' AS DateTime), NULL, NULL, N'bao', N'product', N'PRODUCT_DELETE')
SET IDENTITY_INSERT [dbo].[Permission] OFF
GO
SET IDENTITY_INSERT [dbo].[PermissionGroup] ON 

INSERT [dbo].[PermissionGroup] ([PermissionGroupId], [PermissionGroupName], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser]) VALUES (19, N'Quyền quản lý sp', CAST(N'2022-03-25T17:38:40.040' AS DateTime), CAST(N'2022-03-25T18:33:23.890' AS DateTime), N'bao', N'bao')
SET IDENTITY_INSERT [dbo].[PermissionGroup] OFF
GO
SET IDENTITY_INSERT [dbo].[PermissionGroupPermisstion] ON 

INSERT [dbo].[PermissionGroupPermisstion] ([PermissionGroupPermissionId], [PermissionGroupId], [PermissionId]) VALUES (63, 19, 11)
INSERT [dbo].[PermissionGroupPermisstion] ([PermissionGroupPermissionId], [PermissionGroupId], [PermissionId]) VALUES (64, 19, 12)
INSERT [dbo].[PermissionGroupPermisstion] ([PermissionGroupPermissionId], [PermissionGroupId], [PermissionId]) VALUES (65, 19, 10)
INSERT [dbo].[PermissionGroupPermisstion] ([PermissionGroupPermissionId], [PermissionGroupId], [PermissionId]) VALUES (66, 19, 13)
SET IDENTITY_INSERT [dbo].[PermissionGroupPermisstion] OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([ProductId], [ProductName], [ProductCategoryId], [BrandId], [Price], [ProductDescription], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Enable], [ShortDescription], [IsTopSale], [IsNew], [Url], [Title], [Keywords], [Description]) VALUES (3, N'Tủ lạnh like new', 11, 1, CAST(5000000 AS Decimal(18, 0)), N'<p>Mô tả sản phẩm</p>', CAST(N'2022-03-29T02:50:37.017' AS DateTime), CAST(N'2022-03-29T23:55:06.730' AS DateTime), N'bao', N'bao', 1, N'', 0, 1, N'tu-lanh-like-new', N'', N'', N'')
INSERT [dbo].[Product] ([ProductId], [ProductName], [ProductCategoryId], [BrandId], [Price], [ProductDescription], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Enable], [ShortDescription], [IsTopSale], [IsNew], [Url], [Title], [Keywords], [Description]) VALUES (4, N'Tivi 24in', 10, NULL, CAST(2000000 AS Decimal(18, 0)), N'<p>Mô tả sản phẩmMô tả sản phẩmMô tả sản phẩm</p>', CAST(N'2022-03-29T14:05:08.233' AS DateTime), CAST(N'2022-03-29T23:15:32.830' AS DateTime), N'bao', N'bao', 1, N'Mô tả ngắn', 1, 0, N'tivi-24in', N'', N'', N'')
INSERT [dbo].[Product] ([ProductId], [ProductName], [ProductCategoryId], [BrandId], [Price], [ProductDescription], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Enable], [ShortDescription], [IsTopSale], [IsNew], [Url], [Title], [Keywords], [Description]) VALUES (5, N'Laptop MSI Gaming GF63 Thin 11UD i7', 10, NULL, CAST(40000 AS Decimal(18, 0)), N'<h3 class="article__content__title">Thông tin sản phẩm</h3>
<h3>Sở hữu một vẻ ngoài độc đáo, mạnh mẽ phù hợp với mọi game thủ, chiếc <a title="Xem thêm laptop MSI Gaming GF63 Thin 11UD i7 11800H (648VN) đang bán tại thegioididong.com" href="https://www.thegioididong.com/laptop/msi-gaming-gf63-thin-11ud-i7-648vn" target="_blank" rel="noopener">laptop MSI Gaming GF63 Thin 11UD i7 11800H (648VN)</a> được trang bị dòng chip Intel thế hệ 11 hiệu năng mạnh mẽ vượt trội khi đi cùng card màn hình rời RTX 3050 Ti Max-Q sẵn sàng chiến mượt bất kì tựa game phổ biến hay thiết kế đồ họa chuyên sâu.</h3>
<p>• Sở hữu<strong> CPU Intel Core i7 11800H</strong> kết hợp cùng card màn hình <strong>NVIDIA GeForce RTX 3050Ti Max-Q 4 GB</strong> mang lại trải nghiệm giải trí cực đã với các tựa game đình đám như GTA V, CS:GO, FIFA,... Bên cạnh đó khả năng xử lý đồ họa chuyên sâu cũng sẽ là lợi thế của dòng card <strong>RTX</strong> này.</p>
<p>• <a title="Xem thêm laptop MSI đang bán tại thegioididong.com" href="https://www.thegioididong.com/laptop-msi" target="_blank" rel="noopener">Laptop MSI</a> được trang bị bộ nhớ <strong>SSD 512 GB</strong> kết hợp<strong> RAM 8 GB</strong> cho khả năng lưu trữ dữ liệu đủ dùng, tốc độ truy xuất dữ liệu, ghi chép dữ liệu cũng như khởi động máy nhanh chóng.</p>', CAST(N'2022-03-30T11:19:07.693' AS DateTime), NULL, NULL, N'bao', 1, N'Sở hữu một vẻ ngoài độc đáo, mạnh mẽ phù hợp với mọi game thủ', 1, 1, N'laptop-msi-gaming-gf63-thin-11ud-i7', N'', N'', N'')
INSERT [dbo].[Product] ([ProductId], [ProductName], [ProductCategoryId], [BrandId], [Price], [ProductDescription], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Enable], [ShortDescription], [IsTopSale], [IsNew], [Url], [Title], [Keywords], [Description]) VALUES (10, N'Tủ lạnh ABC', 11, 2, CAST(50000 AS Decimal(18, 0)), N'<p>Mô tả sản phẩm<span class="text-red-6">*</span></p>', CAST(N'2022-04-18T10:29:08.803' AS DateTime), CAST(N'2022-04-18T10:31:13.743' AS DateTime), N'bao', N'bao', 1, N'Mô tả ngắn', 0, 0, N'tu-lanh-abc', N'', N'', N'')
INSERT [dbo].[Product] ([ProductId], [ProductName], [ProductCategoryId], [BrandId], [Price], [ProductDescription], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Enable], [ShortDescription], [IsTopSale], [IsNew], [Url], [Title], [Keywords], [Description]) VALUES (6, N'Laptop Apple MacBook Air M1 2020 16GB/256GB/7-core GPU (Z124000DE)', 10, NULL, CAST(12000000 AS Decimal(18, 0)), N'<h3 class="article__content__title">Thông tin sản phẩm</h3>
<h3><a title="Laptop Apple MacBook Air M1 2020" href="https://www.thegioididong.com/laptop/apple-macbook-air-m1-2020-z124000de" target="_blank" rel="noopener">Laptop Apple MacBook Air M1 2020</a> có thiết kế đẹp, sang trọng với CPU M1 độc quyền từ Apple cho hiệu năng đồ họa cao, màn hình Retina hiển thị siêu nét cùng với hệ thống bảo mật tối ưu.</h3>
<h3>Hiệu năng ấn tượng đến từ chip M1</h3>
<p><a title="Tìm hiểu về chip Apple M1: Con chip ARM 5nm đầu tiên dành cho máy Mac" href="https://www.thegioididong.com/hoi-dap/tim-hieu-ve-chip-apple-m1-con-chip-arm-5nm-dau-tien-danh-1305955" target="_blank" rel="noopener">Chip M1</a> được Apple thiết kế dành riêng cho <a title="Xem thêm một số mẫu MacBook đang được bán tại Thegioididong.com" href="https://www.thegioididong.com/laptop-apple-macbook" target="_blank" rel="noopener">MacBook</a> mang đến hiệu năng vượt trội. Thực hiện tốt các tác vụ văn phòng trên các phần mềm như Word, Excel, Powerpoint,... Thiết kế đồ hoạ cũng chuyên nghiệp không kém, cho phép bạn chỉnh sửa hình ảnh với dung lượng lớn, kết xuất 2D mượt mà trên các phần mềm Photoshop, AI, Figma,...</p>
<p>Card đồ họa <strong>GPU 7 nhân</strong> đem lại hiệu suất cao đáng kinh ngạc, đồ họa cao hơn gấp 5 lần, thảo sức sáng tạo nội dung, kết xuất 3D ổn định, render video, phát trực tiếp với chất lượng cao với chất ảnh sắc nét cùng độ phân giải lên đến 4K.</p>', CAST(N'2022-03-30T11:21:38.017' AS DateTime), CAST(N'2022-04-18T10:49:44.407' AS DateTime), N'bao', N'bao', 1, N'Hiệu năng ấn tượng đến từ chip M1', 1, 1, N'laptop-apple-macbook-air-m1-2020-16gb256gb7-core-gpu-z124000de', N'', N'', N'')
INSERT [dbo].[Product] ([ProductId], [ProductName], [ProductCategoryId], [BrandId], [Price], [ProductDescription], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Enable], [ShortDescription], [IsTopSale], [IsNew], [Url], [Title], [Keywords], [Description]) VALUES (7, N'Laptop Apple MacBook Air M1 2020 16GB/512GB/7-core GPU (Z12A00050) ', 10, NULL, CAST(15000000 AS Decimal(18, 0)), N'<h3 class="article__content__title">Thông tin sản phẩm</h3>
<h3><a title="Laptop Apple MacBook Air M1 2020 (Z12A00050)" href="https://www.thegioididong.com/laptop/apple-macbook-air-m1-2020-z12a00050" target="_blank" rel="noopener" type="Laptop Apple MacBook Air M1 2020 (Z12A00050)">Laptop Apple MacBook Air M1 2020 (Z12A00050)</a> mang nét thanh lịch sang trọng với thiết kế kim loại nguyên khối cùng hiệu năng vượt trội nhờ chip M1 độc quyền của “nhà Táo” sẽ mang đến cho bạn những trải nghiệm riêng biệt mà chỉ dòng máy MacBook mới có được.</h3>
<h3>Thiết kế kim loại nguyên khối mỏng, nhẹ</h3>
<p><strong><a title="Xem thêm một số sản phẩm laptop có chip M1 đang bán tại thegioididong.com" href="https://www.thegioididong.com/laptop-apple-macbook-m1" target="_blank" rel="noopener" type="Xem thêm một số sản phẩm laptop có chip M1 đang bán tại thegioididong.com">Macbook M1</a></strong> được bao bọc bởi lớp <strong>kim loại nguyên khối</strong> cứng cáp nhưng chỉ nhẹ <strong>1.29 kg</strong> và mỏng <strong>16.1 mm</strong> đảm bảo tính linh động cho chiếc máy của bạn lại không kém phần sang trọng.</p>', CAST(N'2022-03-30T11:22:44.187' AS DateTime), CAST(N'2022-04-01T00:22:34.837' AS DateTime), N'bao', N'bao', 1, N'Thiết kế kim loại nguyên khối mỏng, nhẹ', 1, 1, N'laptop-apple-macbook-air-m1-2020-16gb512gb7-core-gpu-z12a00050', N'', N'', N'')
INSERT [dbo].[Product] ([ProductId], [ProductName], [ProductCategoryId], [BrandId], [Price], [ProductDescription], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Enable], [ShortDescription], [IsTopSale], [IsNew], [Url], [Title], [Keywords], [Description]) VALUES (8, N'Laptop Dell Vostro 3405 R5 3500U/8GB/512GB/Office H&S/Win11 (V4R53500U003W1) ', 10, NULL, CAST(20000000 AS Decimal(18, 0)), N'<h3 class="article__content__title">Thông tin sản phẩm</h3>
<h3>Dell Vostro 3405 R5 (V4R53500U003W1) là phiên bản laptop phổ thông với mức giá tầm trung dành cho học sinh, sinh viên hay dân văn phòng bởi thiết kế vẻ ngoài thanh lịch, sang trọng cùng bộ cấu hình ổn định nhờ con <a title="Xem thêm các mẫu Laptop có chip AMD hiện đang kinh doanh tại thegioididong.com" href="https://www.thegioididong.com/laptop-cpu-amd" target="_blank" rel="noopener">chip AMD</a>, đáp ứng tối ưu mọi nhu cầu thiết yếu hằng ngày cho người dùng.</h3>
<h3>Ngoại hình thanh lịch, trẻ trung, năng động</h3>
<p>Lớp vỏ nhựa cứng cáp cùng chiếc áo gam màu đen nhám và những đường nét sắc sảo trên máy đã mang đến cho <a title="Xem thêm các mẫu Laptop Dell Vostro hiện đang kinh doanh tại thegioididong.com" href="https://www.thegioididong.com/laptop-dell-vostro" target="_blank" rel="noopener">laptop Dell Vostro</a> một phong thái sang trọng, cuốn hút mọi ánh nhìn của những người xung quanh. Trọng lượng <strong>1.7 kg</strong> vẫn có thể gọn gàng cất vào balo và cùng bạn linh hoạt di chuyển đến mọi nơi để phục vụ cho mọi nhu cầu công việc cần thiết.</p>', CAST(N'2022-03-30T11:24:36.283' AS DateTime), CAST(N'2022-04-16T14:46:37.730' AS DateTime), N'admin', N'bao', 1, N'Ngoại hình thanh lịch, trẻ trung, năng động', 1, 1, N'laptop-dell-vostro-3405-r5-3500u8gb512gboffice-hswin11-v4r53500u003w1', N'', N'', N'')
INSERT [dbo].[Product] ([ProductId], [ProductName], [ProductCategoryId], [BrandId], [Price], [ProductDescription], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Enable], [ShortDescription], [IsTopSale], [IsNew], [Url], [Title], [Keywords], [Description]) VALUES (9, N'Laptop Acer Swift 3 SF314 511 55QE i5 1135G7/16GB/512GB/Win11 (NX.ABNSV.003) ', 10, NULL, CAST(0 AS Decimal(18, 0)), N'<h4 class="article__content__title">Thông tin sản phẩm</h4>
<h4><a title="Laptop Acer Swift 3 SF314 511 55QE i5 1135G7/16GB/512GB/Win11 (NX.ABNSV.003)" href="https://www.thegioididong.com/laptop/acer-swift-3-sf314-511-55qe-i5-nxabnsv003" target="_blank" rel="noopener">Laptop Acer Swift 3 SF314 511 55QE i5 (NX.ABNSV.003)</a> sở hữu kiểu dáng thanh lịch cùng hiệu năng mạnh mẽ, cùng bạn giải quyết mọi tác vụ hằng ngày.</h4>
<p>• Bộ vi xử lý <strong>Intel Core i5 Tiger Lake 1135G7</strong><strong> </strong>kết hợp cùng card tích hợp <strong>Intel Iris Xe Graphics</strong>, không những hỗ trợ bạn thao tác các công việc văn phòng đơn giản cùng Word, Excel,... một cách trơn tru trên chiếc <a title="Một số laptop Acer Swift đang kinh doanh tại thegioididong.com" href="https://www.thegioididong.com/laptop-acer-swift" target="_blank" rel="noopener">laptop Acer Swift</a> này mà còn cho phép bạn thỏa sức thiết kế cùng các ứng dụng nhà Adobe.</p>
<p>• Phiên bản <a title="Một số laptop học tập - văn phòng đang được kinh doanh tại thegioididong.com" href="https://www.thegioididong.com/laptop?g=hoc-tap-van-phong" target="_blank" rel="noopener">laptop học tập - văn phòng</a> này còn được trang bị <strong>RAM 16 GB</strong> và <strong>SSD 512 GB</strong> cho khả năng đa nhiệm vượt trội, tốc độ phản hồi nhanh chóng, tạo không gian lưu trữ tốt.</p>
<p>• Chiếc <a title="Một số laptop tại thegioididong.com" href="https://www.thegioididong.com/laptop" target="_blank" rel="noopener">laptop</a> này sở hữu trọng lượng nhẹ chỉ <strong>1.19 kg</strong> và mỏng <strong>15.9 mm,</strong> với lớp vỏ được thiết kế từ kim loại cao cấp, dễ dàng đồng hành cùng bạn đến bất kỳ đâu.</p>', CAST(N'2022-03-30T11:26:31.497' AS DateTime), CAST(N'2022-04-16T14:40:32.533' AS DateTime), N'admin', N'bao', 1, N'Laptop Acer Swift 3 SF314 511 55QE i5 (NX.ABNSV.003) sở hữu kiểu dáng thanh lịch cùng hiệu năng mạnh mẽ, cùng bạn giải quyết mọi tác vụ hằng ngày.', 1, 1, N'laptop-acer-swift-3-sf314-511-55qe-i5-1135g716gb512gbwin11-nxabnsv003', N'', N'', N'')
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductCategory] ON 

INSERT [dbo].[ProductCategory] ([ProductCategoryId], [ProductCategoryName], [CreatedDate], [Enable], [CreatedUer], [ModifyDate], [ModifyUser], [OrderIndex], [Url], [Title], [Keywords], [Description], [IsTopCategory]) VALUES (10, N'Máy tính', CAST(N'2022-03-29T22:04:06.873' AS DateTime), 1, N'bao', CAST(N'2022-04-18T10:27:45.180' AS DateTime), N'bao', NULL, N'may-tinh-1', N'', N'', N'', 1)
INSERT [dbo].[ProductCategory] ([ProductCategoryId], [ProductCategoryName], [CreatedDate], [Enable], [CreatedUer], [ModifyDate], [ModifyUser], [OrderIndex], [Url], [Title], [Keywords], [Description], [IsTopCategory]) VALUES (11, N'Máy lạnh', CAST(N'2022-03-29T22:19:33.400' AS DateTime), 1, N'bao', NULL, NULL, NULL, N'may-lanh', N'', N'', N'', 0)
INSERT [dbo].[ProductCategory] ([ProductCategoryId], [ProductCategoryName], [CreatedDate], [Enable], [CreatedUer], [ModifyDate], [ModifyUser], [OrderIndex], [Url], [Title], [Keywords], [Description], [IsTopCategory]) VALUES (12, N'Máy giặt', CAST(N'2022-03-29T22:19:46.727' AS DateTime), 1, N'bao', NULL, NULL, NULL, N'may-giat', N'', N'', N'', 0)
SET IDENTITY_INSERT [dbo].[ProductCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductImage] ON 

INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (34, 3, N'http://localhost:3003/upload/05a66057-b753-44b8-8bd1-1a2340f3f35e.png', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (35, 3, N'http://localhost:3003/upload/0f4c2dec-2e67-49d2-8099-501f97b253fc.png', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (36, 3, N'http://localhost:3003/upload/75e08d89-cb50-4401-83fe-29780f3eb57e.png', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (37, 3, N'http://localhost:3003/upload/b4186181-d054-4534-922b-19377fdf4bdd.png', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (105, 10, N'http://localhost:3003/upload/75b1973f-feff-409f-916e-fb83053968a1.png', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (70, 7, N'http://localhost:3003/upload/e1555454-dba4-437d-a43b-b8262d8fbca6.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (71, 7, N'http://localhost:3003/upload/4badb6e8-286e-4427-8051-d3459f78776d.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (28, 4, N'http://localhost:3003/upload/76bd6fb3-d726-48fb-ae69-c2e013f71acc.png', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (29, 4, N'http://localhost:3003/upload/897a752a-74d1-4998-8387-b90b330c171a.png', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (38, 5, N'http://localhost:3003/upload/48ba3922-b6f9-45ab-87ce-e93ef7495ca4.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (39, 5, N'http://localhost:3003/upload/4745df7a-d719-48d2-860b-1328b424403d.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (40, 5, N'http://localhost:3003/upload/cbb8e28c-45a1-4f4a-a82d-ff3509296d87.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (100, 9, N'http://localhost:3003/upload/9b72654a-5f12-4974-bb39-3e9197cf6dfd.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (101, 9, N'http://localhost:3003/upload/74ddcb86-aa03-490c-aa30-1102fca6ebe1.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (106, 6, N'http://localhost:3003/upload/710378c2-b37c-4b5a-b1aa-0ad962688eb8.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (107, 6, N'http://localhost:3003/upload/1ab1dec5-c848-4f59-ae39-75665a093337.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (108, 6, N'http://localhost:3003/upload/5234aab6-4b2d-437c-80a7-0df3115d277a.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (109, 6, N'http://localhost:3003/upload/f645de33-8906-44ee-bc8a-fc558dd7e2ea.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (110, 6, N'http://localhost:3003/upload/b336f9d0-f553-41b0-9c3c-430b7d5ce802.jpeg', NULL)
INSERT [dbo].[ProductImage] ([ProductImageId], [ProductId], [ImageUrl], [IsDefault]) VALUES (102, 8, N'http://localhost:3003/upload/63dfdc1b-cdf3-4e0c-8afa-5b94f14cf42d.jpeg', NULL)
SET IDENTITY_INSERT [dbo].[ProductImage] OFF
GO
SET IDENTITY_INSERT [dbo].[SeoPage] ON 

INSERT [dbo].[SeoPage] ([SeoPageId], [Url], [Title], [Keywords], [Description], [Page], [CreatedUser], [CreatedDate], [ModifyUser], [ModifyDate]) VALUES (128, N'', N'', N'', N'', NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[SeoPage] ([SeoPageId], [Url], [Title], [Keywords], [Description], [Page], [CreatedUser], [CreatedDate], [ModifyUser], [ModifyDate]) VALUES (154, NULL, N'title mac dinh', N'keywords mac dinh', N'Description mac dinh', N'default', NULL, CAST(N'2022-03-22T18:53:33.430' AS DateTime), NULL, CAST(N'2022-03-23T17:53:19.557' AS DateTime))
INSERT [dbo].[SeoPage] ([SeoPageId], [Url], [Title], [Keywords], [Description], [Page], [CreatedUser], [CreatedDate], [ModifyUser], [ModifyDate]) VALUES (155, NULL, N'Title tin tuc', N'Keywords tin tuc', N'Description tin tuc', N'news', NULL, CAST(N'2022-03-22T19:10:44.227' AS DateTime), NULL, CAST(N'2022-03-23T00:58:17.483' AS DateTime))
INSERT [dbo].[SeoPage] ([SeoPageId], [Url], [Title], [Keywords], [Description], [Page], [CreatedUser], [CreatedDate], [ModifyUser], [ModifyDate]) VALUES (156, NULL, N'Title danh mục sản phẩm', N'Keywords danh mục sản phẩm', N'Description danh mục sản phẩm', N'product-category', NULL, CAST(N'2022-03-23T00:52:44.710' AS DateTime), NULL, CAST(N'2022-03-23T10:46:05.143' AS DateTime))
INSERT [dbo].[SeoPage] ([SeoPageId], [Url], [Title], [Keywords], [Description], [Page], [CreatedUser], [CreatedDate], [ModifyUser], [ModifyDate]) VALUES (157, NULL, N'Title giới thiệu', N'Keywords giới thiệu', N'Description giới thiệu', N'about', NULL, CAST(N'2022-03-23T00:53:28.693' AS DateTime), NULL, CAST(N'2022-03-23T10:46:07.237' AS DateTime))
INSERT [dbo].[SeoPage] ([SeoPageId], [Url], [Title], [Keywords], [Description], [Page], [CreatedUser], [CreatedDate], [ModifyUser], [ModifyDate]) VALUES (158, NULL, N'Title liên hệ edited', N'Keywords liên hệ', N'Description liên hệ', N'contact', NULL, CAST(N'2022-03-23T00:53:58.553' AS DateTime), NULL, CAST(N'2022-03-24T10:30:56.260' AS DateTime))
SET IDENTITY_INSERT [dbo].[SeoPage] OFF
GO
SET IDENTITY_INSERT [dbo].[Store] ON 

INSERT [dbo].[Store] ([StoreId], [StoreName], [ImageUrl], [Address], [TaxCode], [Email], [PhoneNumber], [LogoUrl], [Maps], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [OpenTime], [ShortDescription]) VALUES (2, N'Điện lạnh duy nhất', N'http://localhost:3003/upload/8f9173ac-7e9b-4be0-92d2-3af209d52d28.png', N'316 Đỗ Xuân Hợp, Quận 9, TP.Thủ Đức, TP.HCM', N'201265', N'dienlanhduynhat@gmail.com', N'0975666236', N'http://localhost:3003/upload/d952cbb6-16ec-44eb-ba3f-866b561fb96f.png', N'<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d55861.836175181146!2d106.67998440940018!3d10.817096394677595!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529a0b52d2d11%3A0xd8cce397afb955d6!2zQ2jhu6MgSOG6oW5oIFRow7RuZyBUw6J5!5e0!3m2!1svi!2s!4v1648630301340!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>', CAST(N'2022-03-20T15:23:05.817' AS DateTime), CAST(N'2022-04-07T23:01:07.763' AS DateTime), NULL, N'', N'8:30 AM - 10:00 PM', N'Cửa hàng Điện Lạnh Duy Nhất chuyên mua bán các sản phẩm về điện lạnh, đồ gia dụng.')
SET IDENTITY_INSERT [dbo].[Store] OFF
GO
SET IDENTITY_INSERT [dbo].[Url] ON 

INSERT [dbo].[Url] ([UrlId], [Url], [Type], [SiteId]) VALUES (132, N'tu-lanh-like-new', N'PRODUCTDETAIL', 3)
INSERT [dbo].[Url] ([UrlId], [Url], [Type], [SiteId]) VALUES (134, N'tivi-24in', N'PRODUCTDETAIL', 4)
INSERT [dbo].[Url] ([UrlId], [Url], [Type], [SiteId]) VALUES (136, N'may-tinh-1', N'PRODUCTCATEGORY', 10)
INSERT [dbo].[Url] ([UrlId], [Url], [Type], [SiteId]) VALUES (137, N'may-lanh', N'PRODUCTCATEGORY', 11)
INSERT [dbo].[Url] ([UrlId], [Url], [Type], [SiteId]) VALUES (138, N'may-giat', N'PRODUCTCATEGORY', 12)
INSERT [dbo].[Url] ([UrlId], [Url], [Type], [SiteId]) VALUES (139, N'thong-tin-them-ve-vu-tai-nan-tren-cao-toc-thanh-pho-ho-chi-minh-trung-luong', N'NEWSDETAIL', 158)
INSERT [dbo].[Url] ([UrlId], [Url], [Type], [SiteId]) VALUES (140, N'laptop-msi-gaming-gf63-thin-11ud-i7', N'PRODUCTDETAIL', 5)
INSERT [dbo].[Url] ([UrlId], [Url], [Type], [SiteId]) VALUES (141, N'laptop-apple-macbook-air-m1-2020-16gb256gb7-core-gpu-z124000de', N'PRODUCTDETAIL', 6)
INSERT [dbo].[Url] ([UrlId], [Url], [Type], [SiteId]) VALUES (142, N'laptop-apple-macbook-air-m1-2020-16gb512gb7-core-gpu-z12a00050', N'PRODUCTDETAIL', 7)
INSERT [dbo].[Url] ([UrlId], [Url], [Type], [SiteId]) VALUES (143, N'laptop-dell-vostro-3405-r5-3500u8gb512gboffice-hswin11-v4r53500u003w1', N'PRODUCTDETAIL', 8)
INSERT [dbo].[Url] ([UrlId], [Url], [Type], [SiteId]) VALUES (144, N'laptop-acer-swift-3-sf314-511-55qe-i5-1135g716gb512gbwin11-nxabnsv003', N'PRODUCTDETAIL', 9)
SET IDENTITY_INSERT [dbo].[Url] OFF
GO
SET IDENTITY_INSERT [dbo].[UserAccount] ON 

INSERT [dbo].[UserAccount] ([UserId], [FullName], [Username], [Password], [PermissionGroupid], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Enable], [PhoneNumber], [IsAdmin]) VALUES (3, N'Admin', N'admin', N'$2b$10$qHPyodZ7L1qmiQ/C8jRtOOd6XsZkU4iYuU72HsmPWKXkpdDNqKXpW', NULL, CAST(N'2022-03-24T17:22:33.470' AS DateTime), NULL, NULL, NULL, 1, N'', 1)
INSERT [dbo].[UserAccount] ([UserId], [FullName], [Username], [Password], [PermissionGroupid], [CreatedDate], [ModifyDate], [ModifyUser], [CreatedUser], [Enable], [PhoneNumber], [IsAdmin]) VALUES (5, N'Ngô Phong bảo', N'bao', N'$2b$10$Aw5SJJOswOTt0PQ.HtXq5u0ncSNj9q.YI1YWzeCt/EyzwuwTx95di', NULL, CAST(N'2022-03-25T15:13:05.503' AS DateTime), CAST(N'2022-04-17T18:36:55.577' AS DateTime), N'bao', N'admin', 1, N'', 1)
SET IDENTITY_INSERT [dbo].[UserAccount] OFF
GO
SET IDENTITY_INSERT [dbo].[ViewNum] ON 

INSERT [dbo].[ViewNum] ([ViewNumId], [ViewNumber], [ViewDate]) VALUES (145, 2, CAST(N'2022-01-01T22:00:31.000' AS DateTime))
INSERT [dbo].[ViewNum] ([ViewNumId], [ViewNumber], [ViewDate]) VALUES (146, 3, CAST(N'2022-02-01T22:04:21.000' AS DateTime))
INSERT [dbo].[ViewNum] ([ViewNumId], [ViewNumber], [ViewDate]) VALUES (147, 3, CAST(N'2022-04-17T22:04:22.403' AS DateTime))
INSERT [dbo].[ViewNum] ([ViewNumId], [ViewNumber], [ViewDate]) VALUES (148, 15, CAST(N'2022-05-01T22:04:23.000' AS DateTime))
INSERT [dbo].[ViewNum] ([ViewNumId], [ViewNumber], [ViewDate]) VALUES (149, 1, CAST(N'2022-06-01T22:04:24.000' AS DateTime))
INSERT [dbo].[ViewNum] ([ViewNumId], [ViewNumber], [ViewDate]) VALUES (150, 6, CAST(N'2022-07-01T22:04:24.000' AS DateTime))
INSERT [dbo].[ViewNum] ([ViewNumId], [ViewNumber], [ViewDate]) VALUES (151, 10, CAST(N'2022-12-01T22:04:25.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[ViewNum] OFF
GO
/****** Object:  StoredProcedure [dbo].[About_CreateOrUpdate_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[About_CreateOrUpdate_Admin]
	@aboutId int = null,
	@title nvarchar(500) = null,
	@content nvarchar(max) = null,
	@imageUrl nvarchar(250) = null,
	@createdUser varchar(50) = null
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM About WHERE AboutId = @aboutId) 
		BEGIN
			INSERT INTO About
			(
				title,
				content,
				ImageUrl,
				CreatedUser,
				CreatedDate
			)
			VALUES
			(
				@title,
				@content,
				@imageUrl,
				@createdUser,
				getdate()
			)
		END
	ELSE 
		BEGIN
			UPDATE About 
			SET title = @title,
				content = @content,
				imageUrl = @imageUrl,
				ModifyUser = @createdUser,
				ModifyDate = getdate()
			WHERE aboutId = @aboutId
		END
END
GO
/****** Object:  StoredProcedure [dbo].[About_GetOne_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[About_GetOne_Admin]
AS
BEGIN
	SELECT TOP 1 
		aboutId,
		title,
		content,
		imageUrl
	FROM About
END
GO
/****** Object:  StoredProcedure [dbo].[About_GetOne_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[About_GetOne_Web]
AS
BEGIN
	SELECT TOP 1 
		aboutId,
		title,
		content,
		imageUrl
	FROM About
END
GO
/****** Object:  StoredProcedure [dbo].[Attribute_CreateOrUpdate_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Attribute_CreateOrUpdate_Admin]        
 @AttributeId int = null,        
 @Name nvarchar(500) = null,        
 @CreatedUser nvarchar(50) = null,        
 @ModifyUser nvarchar(50) = null    
AS         
BEGIN        
        
 -- Nếu không tìm thấy thì thêm mới        
 IF NOT EXISTS (SELECT 1 FROM dbo.Attribute WHERE AttributeId = @AttributeId)         
  BEGIN          
   INSERT INTO dbo.Attribute    
   (    
       Name,    
       CreatedDate,    
       CreatedUser    
   )    
   VALUES    
   (   @Name,       -- BrandName - nvarchar(500)    
       GETDATE(), -- CreatedDate - datetime    
       @CreatedUser       -- CreatedUser - nvarchar(50)    
       )        
 END        
  -- Nếu tìm thấy thì chỉnh sửa        
 ELSE        
   BEGIN        
     UPDATE dbo.Attribute        
     SET Name = @Name,        
       ModifyDate = GETDATE(),        
       ModifyUser = @CreatedUser     
     WHERE AttributeId = @AttributeId        
   END        
END
GO
/****** Object:  StoredProcedure [dbo].[Attribute_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Attribute_Delete_Admin]      
 @AttributeId int = null      
AS      
BEGIN      
      
-- Xoa news      
 DELETE FROM dbo.Attribute WHERE AttributeId = @AttributeId       
       
END
GO
/****** Object:  StoredProcedure [dbo].[Attribute_GetAll_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Attribute_GetAll_Admin]        
AS        
BEGIN        
           
 SELECT        
 attributeId,  
 name  
 FROM dbo.Attribute           
         
END
GO
/****** Object:  StoredProcedure [dbo].[Attribute_GetDetail_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Attribute_GetDetail_Admin]          
 @AttributeId int = null          
AS          
BEGIN          
          
-- Lay chi tiet          
 SELECT          
 attributeId,    
 name    
 FROM dbo.Attribute          
 WHERE AttributeId = @AttributeId          
           
END
GO
/****** Object:  StoredProcedure [dbo].[Attribute_GetList_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Attribute_GetList_Admin]      
 @PageIndex int = 1,      
 @PageSize int = 10,      
 @Keyword nvarchar(250) = NULL   
AS      
BEGIN      
       
 SET NOCOUNT ON;      
 SELECT       
  COUNT (1) OVER() TotalItems,  
  att.attributeId ,    
  att.name ,    
  U.FullName AS CreatedUser,      
  FORMAT(att.CreatedDate, 'dd/MM/yyyy') CreatedDate   
 FROM dbo.Attribute att     
 LEFT JOIN UserAccount U ON U.UserName = att.CreatedUser      
 WHERE (@keyword IS NULL OR att.name LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI)        
 ORDER BY att.CreatedDate desc     
 OFFSET  @pageSize * (@pageIndex - 1) ROWS      
 FETCH NEXT @pageSize ROWS ONLY       
       
END
GO
/****** Object:  StoredProcedure [dbo].[AttributeValue_Create_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AttributeValue_Create_Admin]  
 @AttributeId int = null,  
 @ProductId int = null,  
 @AttValue nvarchar(500) = null  
   
AS   
BEGIN  
 BEGIN  
   INSERT INTO AttributeValue
    (  
     AttributeId,  
     ProductId,
	 AttValue  
    )  
   VALUES  
    (  
     @AttributeId,  
     @ProductId,
	 @AttValue 
    )  
 END  
END
GO
/****** Object:  StoredProcedure [dbo].[AttributeValue_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AttributeValue_Delete_Admin]  
 @ProductId int = null  
AS   
BEGIN  
 BEGIN  
   DELETE FROM  AttributeValue WHERE ProductId = @ProductId  
      
 END  
END
GO
/****** Object:  StoredProcedure [dbo].[Banner_CreateOrUpdate_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Banner_CreateOrUpdate_Admin]    
    @BannerId INT = -1,    
    @ImageUrl VARCHAR(300) = NULL,    
    @Link VARCHAR(300) = NULL,    
    @BannerType VARCHAR(100) = '',    
    @Enable BIT = NULL,    
    @CreatedUser VARCHAR(50) = ''    
AS    
BEGIN    
    
    -- Nếu không tìm thấy thì thêm mới        
    IF NOT EXISTS (SELECT 1 FROM dbo.Banner WHERE BannerId = @BannerId)    
    BEGIN    
        --   Them banner         
        INSERT INTO dbo.Banner    
        (    
            ImageUrl,    
            Link,    
            BannerType,    
            Enable,    
            CreatedDate,        
            CreatedUser    
        )    
        VALUES    
        (   @ImageUrl,     -- ImageUrl - varchar(300)    
            @Link,         -- Link - varchar(300)    
            @BannerType,   -- BannerType  
            @Enable,       -- Enable - bit    
            GETDATE(),     -- CreatedDate - datetime    
            @CreatedUser             -- CreatedUser - varchar(50)    
            );    
    END;    
    -- Nếu tìm thấy thì chỉnh sửa        
    ELSE    
    BEGIN    
        --     Cap nhat tin tuc        
        UPDATE dbo.Banner    
        SET BannerType = @BannerType,    
            ImageUrl = @ImageUrl,    
            Link = @Link,    
            ModifyDate = GETDATE(),    
            ModifyUser = @CreatedUser,    
            Enable = @Enable    
        WHERE BannerId = @BannerId;		
    END;    
END;
GO
/****** Object:  StoredProcedure [dbo].[Banner_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Banner_Delete_Admin]    
 @BannerId int = null    
AS    
BEGIN    
    
    
-- Xoa news    
 DELETE FROM dbo.Banner WHERE BannerId = @BannerId     
     
END
GO
/****** Object:  StoredProcedure [dbo].[Banner_GetBanner_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Banner_GetBanner_Web]          
AS          
BEGIN          
                
 SELECT           
    imageUrl,    
    link   
 FROM dbo.Banner    
 WHERE BannerType = 'main-banner' 
 AND Enable = 1
 ORDER BY CreatedDate DESC
 
 SELECT TOP 2         
    imageUrl,    
    link   
 FROM dbo.Banner    
 WHERE BannerType = 'sub-banner' 
 AND Enable = 1
 ORDER BY CreatedDate DESC
 
  SELECT TOP 1      
    imageUrl,    
    link   
 FROM dbo.Banner    
 WHERE BannerType = 'middle-banner' 
 AND Enable = 1
 ORDER BY CreatedDate DESC
 
END
GO
/****** Object:  StoredProcedure [dbo].[Banner_GetDetail_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Banner_GetDetail_Admin]          
 @BannerId int = null          
AS          
BEGIN          
          
-- Lay chi tiet          
 SELECT           
    imageUrl,    
    link,    
    bannerType,    
    enable,    
    createdDate,    
    modifyDate,    
    modifyUser,    
    createdUser    
 FROM dbo.Banner    
 WHERE BannerId = @BannerId          
           END
GO
/****** Object:  StoredProcedure [dbo].[Banner_GetList_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Banner_GetList_Admin]        
 @PageIndex int = 1,        
 @PageSize int = 10,        
 @BannerType varchar(100) = 'product',        
 @Enable int = NULL        
AS        
BEGIN        
         
IF(@BannerType = '')
BEGIN
SET @BannerType= NULL;
END
 SET NOCOUNT ON;        
 SELECT         
  COUNT (1) OVER() TotalItems,        
  B.BannerId,    
  B.ImageUrl,    
  B.BannerType,    
  B.Link,    
  U.FullName AS CreatedUser,        
  FORMAT(B.CreatedDate, 'dd/MM/yyyy') CreatedDate,        
  B.Enable        
 FROM dbo.Banner B       
 LEFT JOIN UserAccount U ON U.UserName = B.CreatedUser        
 WHERE (@BannerType IS NULL OR B.BannerType = @BannerType )    
 AND (@Enable IS NULL OR B.Enable = @Enable)        
 ORDER BY B.CreatedDate desc      
 OFFSET  @pageSize * (@pageIndex - 1) ROWS        
 FETCH NEXT @pageSize ROWS ONLY         
         
END
GO
/****** Object:  StoredProcedure [dbo].[Brand_CreateOrUpdate_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Brand_CreateOrUpdate_Admin]    
 @BrandId int = null,    
 @BrandName nvarchar(500) = null,    
 @CreatedUser nvarchar(50) = null,    
 @ModifyUser nvarchar(50) = null
AS     
BEGIN    
    
 -- Nếu không tìm thấy thì thêm mới    
 IF NOT EXISTS (SELECT 1 FROM dbo.Brand WHERE BrandId = @BrandId)     
  BEGIN      
   INSERT INTO dbo.Brand
   (
       BrandName,
       CreatedDate,
       CreatedUser
   )
   VALUES
   (   @BrandName,       -- BrandName - nvarchar(500)
       GETDATE(), -- CreatedDate - datetime
       @CreatedUser       -- CreatedUser - nvarchar(50)
       )    
 END    
  -- Nếu tìm thấy thì chỉnh sửa    
 ELSE    
   BEGIN    
     UPDATE dbo.Brand    
     SET BrandName = @BrandName,    
       ModifyDate = GETDATE(),    
       ModifyUser = @CreatedUser 
     WHERE BrandId = @BrandId    
   END    
END
GO
/****** Object:  StoredProcedure [dbo].[Brand_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Brand_Delete_Admin]    
 @BrandId int = null    
AS    
BEGIN    
    
-- Xoa news    
 DELETE FROM dbo.Brand WHERE BrandId = @BrandId     
     
END
GO
/****** Object:  StoredProcedure [dbo].[Brand_Get_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Brand_Get_Web]      
AS      
BEGIN      
         
 SELECT      
	brandId,
	brandName
 FROM dbo.Brand
 WHERE EXISTS (
	SELECT 1 FROM Product
	WHERE Product.brandId = Brand.brandId
	AND Product.Enable = 1
 ) 
       
END
GO
/****** Object:  StoredProcedure [dbo].[Brand_GetAll_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Brand_GetAll_Admin]      
AS      
BEGIN      
         
 SELECT      
	brandId,
	brandName
 FROM dbo.Brand         
       
END
GO
/****** Object:  StoredProcedure [dbo].[Brand_GetDetail_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Brand_GetDetail_Admin]      
 @BrandId int = null      
AS      
BEGIN      
      
-- Lay chi tiet      
 SELECT      
	brandId,
	brandName
 FROM dbo.Brand      
 WHERE BrandId = @BrandId      
       
END
GO
/****** Object:  StoredProcedure [dbo].[Brand_GetList_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Brand_GetList_Admin]    
 @PageIndex int = 1,    
 @PageSize int = 10,    
 @Keyword nvarchar(250) = NULL 
AS    
BEGIN    
     
 SET NOCOUNT ON;    
 SELECT     
  COUNT (1) OVER() TotalItems,
	Br.brandId ,  
  Br.brandName ,  
  U.FullName AS CreatedUser,    
  FORMAT(Br.CreatedDate, 'dd/MM/yyyy') CreatedDate 
 FROM dbo.Brand Br   
 LEFT JOIN UserAccount U ON U.UserName = Br.CreatedUser    
 WHERE (@keyword IS NULL OR Br.BrandName LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI)      
 ORDER BY Br.CreatedDate desc   
 OFFSET  @pageSize * (@pageIndex - 1) ROWS    
 FETCH NEXT @pageSize ROWS ONLY     
     
END
GO
/****** Object:  StoredProcedure [dbo].[CusOrder_Create_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CusOrder_Create_Web]
	@fullName nvarchar(50) = null,
	@phoneNumber nvarchar(50) = null,
	@address nvarchar(500) = null
AS
BEGIN
	INSERT INTO CusOrder 
	(
		FullName,
		PhoneNumber,
		Address,
		Status,
		CreatedUser,
		CreatedDate
	)
	VALUES
	(
		@fullName,
		@phoneNumber,
		@address,
		1,
		'Customner',
		getdate()
	)
	SELECT SCOPE_IDENTITY() AS orderId
END
GO
/****** Object:  StoredProcedure [dbo].[CusOrder_GetDetail_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CusOrder_GetDetail_Admin]            
 @OrderId int = null            
AS            
BEGIN            
            
-- Lay chi tiet            
 SELECT            
 orderId,      
 fullName,    
 phoneNumber,    
 address  ,  
 status , 
 note   
 FROM dbo.CusOrder  WHERE OrderId = @OrderId    
    
 SELECT      
 od.productId,    
 od.price,    
 pd.productName,    
 (SELECT TOP 1 ImageUrl FROM dbo.ProductImage WHERE ProductId = od.ProductId) AS urlImage,    
 number    
 FROM dbo.OrderDetail od    
 LEFT JOIN dbo.Product pd ON  od.ProductId = pd.ProductId    
 WHERE od.OrderId = @OrderId    
             
END
GO
/****** Object:  StoredProcedure [dbo].[CusOrder_GetList_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CusOrder_GetList_Admin]          
 @PageIndex int = 1,          
 @PageSize int = 10,          
 @Keyword nvarchar(250) = NULL,    
 @status int = NULL       
AS          
BEGIN          
           
 SET NOCOUNT ON;          
 SELECT           
  COUNT (1) OVER() totalItems,      
 CO.orderId,          
 CO.phoneNumber,          
 CO.fullName cusName,          
 CO.status,          
 CO.address,          
 U.fullName AS modifyUser,                
 FORMAT(CO.CreatedDate , 'dd/MM/yyyy') createdDate,          
 FORMAT(CO.ModifyDate , 'dd/MM/yyyy') modifyDate          
 FROM dbo.CusOrder CO         
 LEFT JOIN UserAccount U ON U.Username = CO.modifyUser          
 WHERE (@keyword IS NULL   
 OR Co.FullName LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI  
 OR Co.PhoneNumber LIKE '%' + @Keyword + '%'  
 ) AND ( Co.Status  = @status OR @status IS NULL)        
 ORDER BY CO.Status          
 OFFSET  @pageSize * (@pageIndex - 1) ROWS          
 FETCH NEXT @pageSize ROWS ONLY           
           
END
GO
/****** Object:  StoredProcedure [dbo].[CusOrder_Update_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CusOrder_Update_Admin]            
 @orderId int = null ,    
 @status int = NULL,    
 @modifyUser VARCHAR(50) = 'admin',    
 @phoneNumber VARCHAR(200) = '',    
 @fullName NVARCHAR(200) = '',    
 @address NVARCHAR(500) = '',    
 @note NVARCHAR(1000) = ''    
AS            
BEGIN            
 UPDATE dbo.CusOrder    
 SET Status = @Status    
 ,ModifyUser = @ModifyUser    
 ,PhoneNumber = @phoneNumber    
 ,FullName = @fullName    
 ,Address = @address    
 ,note = @note    
 ,ModifyDate = GETDATE()    
 WHERE OrderId =@OrderId            
END
GO
/****** Object:  StoredProcedure [dbo].[GetStatistic_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetStatistic_Admin]
AS
BEGIN

	SELECT 
		COUNT(1) numberOrder
	FROM CusOrder
	WHERE Status = 4
	
	
	SELECT 
		SUM (OrderDetail.Price * OrderDetail.Number) numberTurnover
	FROM OrderDetail 
	JOIN CusOrder ON OrderDetail.OrderId = CusOrder.OrderId
	WHERE CusOrder.Status = 4
	
	SELECT 
		SUM (ViewNumber) numberView
	FROM ViewNum 
	
END
GO
/****** Object:  StoredProcedure [dbo].[News_CreateOrUpdate_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[News_CreateOrUpdate_Admin]  
 @NewsId int = null,  
 @NewsTitle nvarchar(300) = null,  
 @ImageUrl nvarchar(200) = null,  
 @NewsDescription nvarchar(1000) = null,  
 @IsHot bit = 0,  
 @CreatedUser nvarchar(50) = null,  
 @OrderIndex int = 0,  
 @Content nvarchar(max) = null,  
 @Enable bit = 1,  
   
--  Seo  
 @Url varchar(255) = null,  
  @Title varchar(255) = null,  
  @Keywords nvarchar(255) = null,  
  @Description nvarchar(1000) = null  
  
AS   
BEGIN  
  
 -- Nếu không tìm thấy thì thêm mới  
 IF NOT EXISTS (SELECT 1 FROM News WHERE NewsId = @NewsId)   
  BEGIN  
--   Them tin tuc   
   INSERT INTO News  
    (  
     NewsTitle,  
     ImageUrl,  
     NewsDescription,  
     IsHot,  
     CreatedDate,  
     CreatedUser,  
     OrderIndex,  
     Content,  
     Enable,  
     Url,  
     Title,  
     Keywords,  
     Description  
    )  
   VALUES  
    (  
     @NewsTitle,  
     @ImageUrl,  
     @NewsDescription,   
     @IsHot,  
     GETDATE(),   
     @CreatedUser,   
     @OrderIndex,   
     @Content,   
     @Enable,  
     @Url ,  
     @Title,  
     @Keywords,  
     @Description  
    )  
      
   SELECT @NewsId = SCOPE_IDENTITY()  
 END  
  -- Nếu tìm thấy thì chỉnh sửa  
 ELSE  
   BEGIN  
--     Cap nhat tin tuc  
     UPDATE News  
     SET NewsTitle = @NewsTitle,  
       ImageUrl = @ImageUrl,  
       NewsDescription = @NewsDescription,  
       IsHot = @IsHot,  
       ModifyDate = GETDATE(),  
       ModifyUser = @CreatedUser,  
       OrderIndex = @OrderIndex,  
       Content = @Content,  
       Enable = @Enable,  
       Url = @Url,  
       Title = @Title,  
       Keywords = @Keywords,  
       Description = @Description  
     WHERE NewsId = @NewsId  
       
   END  


    IF NOT EXISTS (SELECT 1 FROM Url WHERE SiteId = @NewsId)
	BEGIN
		--    them url   
		INSERT INTO Url  
			(  
				Url,  
				Type,  
				SiteId
			)  
		VALUES  
			(  
				@Url,  
				'NEWSDETAIL',  
				@NewsId
			)  
	END
	ELSE 
	BEGIN
		UPDATE Url  
		SET Url = @Url
		WHERE SiteId = @NewsId  
		AND Type = 'NEWSDETAIL'
	END
    
    
END
GO
/****** Object:  StoredProcedure [dbo].[News_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[News_Delete_Admin]
	@NewsId int = null
AS
BEGIN


-- Xoa news
	DELETE FROM News WHERE NewsId = @NewsId	
	
-- Xoa url
	DELETE FROM Url WHERE SiteId = @NewsId

	
END
GO
/****** Object:  StoredProcedure [dbo].[News_GetDetail_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[News_GetDetail_Admin]  
 @NewsId int = null  
AS  
BEGIN  
  
-- Lay chi tiet  
 SELECT   
  newsId,
  newsTitle,  
  imageUrl,  
  newsDescription,  
  isHot,  
  orderIndex,  
  content,  
  enable,  
  url,  
  title,  
  keywords,  
  description  
 FROM News  
 WHERE NewsId = @NewsId  
   
END
GO
/****** Object:  StoredProcedure [dbo].[News_GetDetail_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[News_GetDetail_Web]  
 @NewsId int = null  
AS  
BEGIN  
  
-- Lay chi tiet  
 SELECT   
  newsId,
  newsTitle,  
  imageUrl,  
  newsDescription,  
  content,
	url
 FROM News  
 WHERE NewsId = @NewsId  
   
END
GO
/****** Object:  StoredProcedure [dbo].[News_GetList_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[News_GetList_Admin]
	@PageIndex int = 1,
	@PageSize int = 10,
	@Keyword nvarchar(250) = NULL,
	@Enable int = NULL
AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT 
		COUNT (1) OVER() TotalItems,
		N.NewsId,
		N.NewsTitle,
		N.NewsDescription,
		N.OrderIndex,
		U.FullName AS CreatedUser,
		FORMAT(N.CreatedDate, 'dd/MM/yyyy') CreatedDate,
		N.Enable
	FROM News N
	LEFT JOIN UserAccount U ON U.UserName = N.CreatedUser
	WHERE	(@keyword IS NULL OR NewsTitle LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI)
	AND (@Enable IS NULL OR N.Enable = @Enable)
	ORDER BY N.CreatedDate DESC
	OFFSET		@pageSize * (@pageIndex - 1) ROWS
	FETCH NEXT	@pageSize ROWS ONLY 
	
END
GO
/****** Object:  StoredProcedure [dbo].[News_GetList_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[News_GetList_Web]
	@PageIndex int = 1,
	@PageSize int = 9
AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT 
		COUNT (1) OVER() TotalItems,
		newsId,
		newsTitle,
		newsDescription,
		imageUrl,
		url,
		FORMAT(N.CreatedDate, 'dd/MM/yyyy') createdDate
	FROM News N
	WHERE	N.Enable = 1
	ORDER BY N.CreatedDate DESC
	OFFSET		@pageSize * (@pageIndex - 1) ROWS
	FETCH NEXT	@pageSize ROWS ONLY 
	
END
GO
/****** Object:  StoredProcedure [dbo].[OrderDetail_Create_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[OrderDetail_Create_Web]
	@orderId int = null,
	@productId int = null,
	@number int = null,
	@price decimal(18,0) = 0
	
AS
BEGIN
	INSERT INTO OrderDetail 
	(
		OrderId,
		ProductId,
		Number,
		Price
	)
	VALUES
	(
		@orderId,
		@productId,
		@number,
		@price
	)
END
GO
/****** Object:  StoredProcedure [dbo].[Permission_CreateOrUpdate_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Permission_CreateOrUpdate_Admin]
	@permissionId int = null,
	@permissionName nvarchar(300) = null,
	@permissionType nvarchar(300) = null,
	@permissionKey nvarchar(300) = null,
	@createdUser nvarchar(50) = null
	
AS 
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Permission WHERE permissionId = @permissionId) 
		BEGIN
			INSERT INTO Permission
				(
					permissionName,
					permissionType,
					permissionKey,
					createdUser,
					createdDate
				)
			VALUES
				(
					@permissionName,
					@permissionType,
					@permissionKey,
					@createdUser,
					getdate()
				)
	END
	ELSE
			BEGIN
					UPDATE Permission
					SET 
							permissionName = @permissionName,
							permissionType = @permissionType,
							permissionKey = @permissionKey,
							modifyDate = GETDATE(),
							modifyUser = @createdUser
					WHERE permissionId = @permissionId
					
			END
END
GO
/****** Object:  StoredProcedure [dbo].[Permission_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Permission_Delete_Admin]
	@permissionId int = null
AS
BEGIN


	DELETE FROM Permission WHERE permissionId = @permissionId	

	
END
GO
/****** Object:  StoredProcedure [dbo].[Permission_GetAll_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Permission_GetAll_Admin]
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
		permissionId,
		permissionName,
		permissionType
	FROM Permission
	ORDER BY permissionType, permissionName
END
GO
/****** Object:  StoredProcedure [dbo].[Permission_GetDetail_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Permission_GetDetail_Admin]  
 @permissionId int = null  
AS  
BEGIN  
  
 SELECT   
  permissionName,
	permissionType,
	permissionKey
 FROM Permission  
 WHERE PermissionId = @permissionId
   
END
GO
/****** Object:  StoredProcedure [dbo].[Permission_GetList_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Permission_GetList_Admin]
	@PageIndex int = 1,
	@PageSize int = 10,
	@keyword nvarchar(250) = NULL,
	@permissionType nvarchar(300) = null
AS
BEGIN
	
	IF(@permissionType = '') SET @permissionType = NULL
	
	SET NOCOUNT ON;
	SELECT 
		COUNT (1) OVER() totalItems,
		P.permissionId,
		P.permissionName,
		P.permissionKey,
		P.permissionType,
		U.FullName AS createdUser,
		FORMAT(P.CreatedDate, 'dd/MM/yyyy') createdDate
	FROM Permission P
	LEFT JOIN UserAccount U ON U.UserName = P.CreatedUser
	WHERE	(@keyword IS NULL 
		OR P.permissionName LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI
		OR P.permissionKey LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI
	)
	AND (@permissionType IS NULL OR @permissionType = P.permissionType)
	ORDER BY P.CreatedDate DESC, P.PermissionType
	OFFSET		@pageSize * (@pageIndex - 1) ROWS
	FETCH NEXT	@pageSize ROWS ONLY 
	
END
GO
/****** Object:  StoredProcedure [dbo].[PermissionGroup_CreateOrUpdate_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PermissionGroup_CreateOrUpdate_Admin]
	@permissionGroupId int = null,
	@permissionGroupName nvarchar(300) = null,
	@createdUser nvarchar(50) = null
	
AS 
BEGIN
	IF NOT EXISTS (SELECT 1 FROM permissionGroup WHERE permissionGroupId = @permissionGroupId) 
		BEGIN
			INSERT INTO permissionGroup
				(
					permissionGroupName,
					createdUser,
					createdDate
				)
			VALUES
				(
					@permissionGroupName,
					@createdUser,
					getdate()
				)
				SELECT SCOPE_IDENTITY() AS result
	END
	ELSE
			BEGIN
					UPDATE permissionGroup
					SET 
							permissionGroupName = @permissionGroupName,
							modifyDate = GETDATE(),
							modifyUser = @createdUser
					WHERE permissionGroupId = @permissionGroupId
					
					SELECT @permissionGroupId AS result
					
			END
END
GO
/****** Object:  StoredProcedure [dbo].[PermissionGroup_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PermissionGroup_Delete_Admin]
	@permissionGroupId int = null
AS
BEGIN


	DELETE FROM PermissionGroup WHERE permissionGroupId = @permissionGroupId	

	
END
GO
/****** Object:  StoredProcedure [dbo].[PermissionGroup_GetAll_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PermissionGroup_GetAll_Admin]  
AS  
BEGIN  
  
 SELECT   
	permissionGroupId,
  permissionGroupName
 FROM PermissionGroup
 
END
GO
/****** Object:  StoredProcedure [dbo].[PermissionGroup_GetDetail_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PermissionGroup_GetDetail_Admin]  
 @permissionGroupId int = null  
AS  
BEGIN  
  
 SELECT   
	permissionGroupId,
  permissionGroupName
 FROM PermissionGroup
 WHERE permissionGroupId = @permissionGroupId
 
 SELECT 
		permissionId
	FROM PermissionGroupPermisstion
	WHERE permissionGroupId = @permissionGroupId
   
END
GO
/****** Object:  StoredProcedure [dbo].[PermissionGroup_GetList_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PermissionGroup_GetList_Admin]
	@PageIndex int = 1,
	@PageSize int = 10,
	@keyword nvarchar(250) = NULL
AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT 
		COUNT (1) OVER() totalItems,
		P.permissionGroupId,
		P.permissionGroupName,
		U.FullName AS createdUser,
		FORMAT(P.CreatedDate, 'dd/MM/yyyy') createdDate
	FROM PermissionGroup P
	LEFT JOIN UserAccount U ON U.UserName = P.CreatedUser
	WHERE	(@keyword IS NULL 
		OR P.permissionGroupName LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI
	)
	ORDER BY P.CreatedDate DESC
	OFFSET		@pageSize * (@pageIndex - 1) ROWS
	FETCH NEXT	@pageSize ROWS ONLY 
	
END
GO
/****** Object:  StoredProcedure [dbo].[PermissionGroupPermisstion_Create_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PermissionGroupPermisstion_Create_Admin]
	@permissionGroupId int,
	@permissionId int
AS
BEGIN
	INSERT INTO PermissionGroupPermisstion
	(permissionGroupId, permissionId)
	VALUES 
	(@permissionGroupId, @permissionId)
END
GO
/****** Object:  StoredProcedure [dbo].[PermissionGroupPermisstion_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PermissionGroupPermisstion_Delete_Admin]
	@permissionGroupId int
AS
BEGIN
	DELETE FROM PermissionGroupPermisstion
	WHERE permissionGroupId = @permissionGroupId
	
END
GO
/****** Object:  StoredProcedure [dbo].[Product_CreateOrUpdate_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Product_CreateOrUpdate_Admin]  
 @ProductId int = null,
  @ProductName nvarchar(250) = null,
 @ProductCategoryId int = null,
 @BrandId int = null,
 @Price decimal(18,0) = null,
 @ProductDescription nvarchar(max) = null,
 @CreatedUser nvarchar(50) = null,
 @Enable bit = 1,
 @ShortDescription nvarchar(1000) = null,
 @IsTopSale bit = 0,
 @IsNew bit = 0,
   
--  Seo  
 @Url varchar(255) = null,  
  @Title varchar(255) = null,  
  @Keywords nvarchar(255) = null,  
  @Description nvarchar(1000) = null  
  
AS   
BEGIN  
   
 IF NOT EXISTS (SELECT 1 FROM Product WHERE ProductId = @ProductId)   
  BEGIN   
   INSERT INTO Product  
    (  
     ProductName,
		 ProductCategoryId,
		 BrandId,
		 Price,
		 ProductDescription,
		 CreatedDate,
		 CreatedUser,
		 Enable,
		 ShortDescription,
		 IsTopSale,
		 IsNew,
     Url,  
     Title,  
     Keywords,  
     Description  
    )  
   VALUES  
    (  
     @ProductName,
		 @ProductCategoryId,
		 @BrandId,
		 @Price,
		 @ProductDescription,
		 getdate(),
		 @CreatedUser,
		 @Enable,
		 @ShortDescription,
		 @IsTopSale,
		 @IsNew, 
     @Url ,  
     @Title,  
     @Keywords,  
     @Description  
    )  
      
		SET @ProductId = SCOPE_IDENTITY()   
 END  
 ELSE  
   BEGIN  
     UPDATE Product  
     SET
				ProductName = @ProductName,
			 ProductCategoryId = @ProductCategoryId,
			 BrandId = @BrandId,
			 Price = @Price,
			 ProductDescription = @ProductDescription,
			 ModifyDate = getdate(),
			 ModifyUser = @CreatedUser,
			 Enable = @Enable,
			 ShortDescription = @ShortDescription,
			 IsTopSale = @IsTopSale,
				IsNew = @IsNew, 
       Url = @Url,  
       Title = @Title,  
       Keywords = @Keywords,  
       Description = @Description  
     WHERE ProductId = @ProductId  
		
   END  

   IF NOT EXISTS (SELECT 1 FROM Url WHERE SiteId = @ProductId)
		BEGIN
			--    them url   
		   INSERT INTO Url  
				(  
				 Url,  
				 Type,  
				 SiteId
				)  
		   VALUES  
				(  
				 @Url,  
				 'PRODUCTDETAIL',  
				 @ProductId
				)  
		END
	ELSE 
		BEGIN
			UPDATE Url  
			SET Url = @Url
			WHERE SiteId = @ProductId  
			AND Type = 'PRODUCTDETAIL'
		END
    
	SELECT @ProductId AS result
    
END
GO
/****** Object:  StoredProcedure [dbo].[Product_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Product_Delete_Admin]
	@ProductId int = null
AS
BEGIN


-- Xoa sp
	DELETE FROM Product WHERE ProductId = @ProductId
	
-- Xoa hinh anh 
	DELETE FROM ProductImage WHERE ProductId = @ProductId
	
-- Xoa url
	DELETE FROM Url WHERE SiteId = @ProductId

	
END
GO
/****** Object:  StoredProcedure [dbo].[Product_GetDetail_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Product_GetDetail_Admin]  
 @ProductId int = null  
AS  
BEGIN  
  
-- Lay chi tiet  
 SELECT   
  productName,
	 productCategoryId,
	 brandId,
	 price,
	 productDescription,
	 enable,
	 shortDescription,
	 isTopSale,
	 isNew,
	 url,  
		title,  
		keywords,  
		description
 FROM Product  
 WHERE ProductId = @ProductId  
 
 SELECT 
		imageUrl
	FROM ProductImage
	WHERE ProductId = @ProductId  
	
 SELECT 
		A.attributeId,
		A.name,
		AV.attValue
	FROM Attribute A
	JOIN AttributeValue AV ON AV.attributeId = A.attributeId
	WHERE AV.ProductId = @ProductId  
   
END
GO
/****** Object:  StoredProcedure [dbo].[Product_GetDetail_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Product_GetDetail_Web]  
 @ProductId int = null  
AS  
BEGIN  

	DECLARE @productCategoryId int = null
	
	SELECT @productCategoryId = productCategoryId FROM Product
	WHERE ProductId = @ProductId
  
 SELECT   
	P.productId,
		P.productName,
	 P.price,
	 P.productDescription,
	 P.shortDescription,
	 B.brandName,
	 PC.productCategoryName,
	 P.url
 FROM Product P
 LEFT JOIN ProductCategory PC ON PC.ProductCategoryId = P.ProductCategoryId
 LEFT JOIN Brand B ON B.BrandId = P.BrandId
 WHERE ProductId = @ProductId 
 
 SELECT 
		imageUrl
	FROM ProductImage
	WHERE ProductId = @ProductId  
	
	SELECT 
		A.attributeId,
		A.name,
		AV.attValue
	FROM Attribute A
	JOIN AttributeValue AV ON AV.attributeId = A.attributeId
	WHERE AV.ProductId = @ProductId  
	
	 SELECT   
		P.productId,
		P.productName,
		 PC.productCategoryName,
		 P.price,
		 P.shortDescription,
		 P.url,
		 B.brandName,
		 Image.imageUrl
	 FROM Product  P
	 OUTER APPLY (
			SELECT TOP 1 imageUrl 
			FROM ProductImage 
			WHERE P.ProductId = ProductImage.ProductId
			AND (ProductImage.isDefault = 1 Or ProductImage.isDefault IS NULL OR ProductImage.isDefault = 0)
	 ) Image
	 LEFT JOIN ProductCategory PC ON PC.ProductCategoryId = P.ProductCategoryId
	 LEFT JOIN Brand B ON B.BrandId = P.BrandId
	 WHERE P.Enable = 1
		AND P.ProductCategoryId = @productCategoryId
		AND P.productId <> @ProductId
   
END
GO
/****** Object:  StoredProcedure [dbo].[Product_GetList_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Product_GetList_Admin]
	@PageIndex int = 1,
	@PageSize int = 10,
	@Keyword nvarchar(250) = NULL,
	@Enable int = NULL,
	@productCategoryId int = NULL,
	@brandId int = NULL,
	@isTopSale bit = null,
	@isNew bit = null
AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT 
		COUNT (1) OVER() TotalItems,
			P.productId,
		 P.productName,
			ProductCategory.productCategoryName,
			Brand.brandName,
		 P.price,
		 P.enable,
		 P.shortDescription,
		 P.isTopSale,
		 P.isNew ,
		 U.FullName AS createdUser,
		FORMAT(P.CreatedDate, 'dd/MM/yyyy') createdDate
	FROM Product P
	LEFT JOIN UserAccount U ON U.UserName = P.CreatedUser
	LEFT JOIN Brand ON Brand.BrandId = P.BrandId
	LEFT JOIN ProductCategory ON ProductCategory.productCategoryId= P.productCategoryId
	WHERE	(@keyword IS NULL OR ProductName LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI)
	AND (@Enable IS NULL OR P.Enable = @Enable)
	AND (@productCategoryId IS NULL OR P.productCategoryId = @productCategoryId)
	AND (@brandId IS NULL OR P.brandId = @brandId)
	AND (@isTopSale IS NULL OR P.isTopSale = @isTopSale)
	AND (@isNew IS NULL OR P.isNew = @isNew)
	ORDER BY P.CreatedDate DESC
	OFFSET		@pageSize * (@pageIndex - 1) ROWS
	FETCH NEXT	@pageSize ROWS ONLY 
	
END
GO
/****** Object:  StoredProcedure [dbo].[Product_GetProduct_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Product_GetProduct_Web]   
	 @PageIndex int = 1,  
	@PageSize int = 12,  
	@keyword varchar(300) = null
AS    
BEGIN    
  SET NOCOUNT ON;  
	SELECT   
		COUNT (1) OVER() totalItems,
		P.productId,
		P.productName,
		P.shortDescription,
		P.url,
		P.price,
		PC.productCategoryName,
		B.brandName
	INTO #T_PRODUCT
	FROM dbo.Product P
	JOIN ProductCategory PC ON P.ProductCategoryId = PC.ProductCategoryId
	LEFT JOIN Brand B ON B.BrandId = P.BrandId
	WHERE P.Enable = 1
	AND	(@keyword IS NULL 
		OR P.ProductName LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI
		OR PC.productCategoryName LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI
		OR B.brandName LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI
	)
	
	ORDER BY P.Price 
 OFFSET  @pageSize * (@pageIndex - 1) ROWS  
 FETCH NEXT @pageSize ROWS ONLY   
 
 SELECT totalItems, productId, productName, url, shortDescription, price, productCategoryName, brandName
 FROM #T_PRODUCT
	 
 SELECT productId, imageUrl 
 FROM ProductImage
 WHERE productId IN (SELECT productId FROM #T_PRODUCT)
 
 DROP TABLE #T_PRODUCT
 
END
GO
/****** Object:  StoredProcedure [dbo].[Product_GetProductHome_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Product_GetProductHome_Web]  
AS  
BEGIN  
  
 SELECT   
	P.productId,
	P.productName,
	 PC.productCategoryName,
	 P.price,
	 P.shortDescription,
	 P.isTopSale,
	 P.isNew,
	 P.url,
	 B.brandName,
	 P.CreatedDate
 INTO #T_PRODUCT
 FROM Product  P
 LEFT JOIN ProductCategory PC ON PC.ProductCategoryId = P.ProductCategoryId
 LEFT JOIN Brand B ON B.BrandId = P.BrandId
 WHERE P.Enable = 1
 AND (P.IsNew = 1 Or P.IsTopSale = 1)
 
 SELECT productId, productName, productCategoryName, price, shortDescription, isTopSale, isNew, url, brandName
 FROM #T_PRODUCT ORDER BY CreatedDate desc
 
 SELECT 
		productId,
		imageUrl
	FROM ProductImage
	WHERE ProductId IN (SELECT productId FROM #T_PRODUCT )
	
	DROP TABLE #T_PRODUCT
   
END
GO
/****** Object:  StoredProcedure [dbo].[ProductCategory_CreateOrUpdate_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductCategory_CreateOrUpdate_Admin]    
 @ProductCategoryId int = null,    
 @ProductCategoryName nvarchar(500) = null,    
 @CreatedUser nvarchar(50) = null,       
 @Enable bit = 1 ,
 @IsTopCategory bit = 0 ,
 --  Seo  
 @Url varchar(255) = null,  
  @Title varchar(255) = null,  
  @Keywords nvarchar(255) = null,  
  @Description nvarchar(1000) = null  
AS     
BEGIN    

	IF(@IsTopCategory = 1)
		BEGIN
			UPDATE ProductCategory SET IsTopCategory = 0
		END
    
 -- Nếu không tìm thấy thì thêm mới    
 IF NOT EXISTS (SELECT 1 FROM dbo.ProductCategory WHERE ProductCategoryId = @ProductCategoryId)     
  BEGIN     
   INSERT INTO ProductCategory    
    (    
			ProductCategoryName,  
			CreatedDate,  
			CreatedUer,  
			Enable,
			 Url,  
			 Title,  
			 Keywords,  
			 Description,
			 IsTopCategory
    )    
   VALUES    
    (    
		 @ProductCategoryName,  
		 GETDATE(),  
		 @CreatedUser,  
		 @Enable ,
		  @Url ,  
     @Title,  
     @Keywords,  
     @Description,
		 @IsTopCategory
		 
    )    
		SELECT @ProductCategoryId = SCOPE_IDENTITY()
    
 END    
  -- Nếu tìm thấy thì chỉnh sửa    
 ELSE    
   BEGIN    
     UPDATE dbo.ProductCategory    
     SET ProductCategoryName = @ProductCategoryName, 
				Url = @Url,  
       Title = @Title,  
       Keywords = @Keywords,  
       Description = @Description,
				Enable = @Enable,
				IsTopCategory = @IsTopCategory,
       ModifyDate = GETDATE(),    
       ModifyUser = @CreatedUser 
     WHERE ProductCategoryId = @ProductCategoryId    
		 
   END    

    IF NOT EXISTS (SELECT 1 FROM Url WHERE SiteId = @ProductCategoryId)
	BEGIN
		--    them url   
		INSERT INTO Url  
			(  
				Url,  
				Type,  
				SiteId
			)  
		VALUES  
			(  
				@Url,  
				'PRODUCTCATEGORY',  
				@ProductCategoryId
			)  
	END
ELSE 
	BEGIN
		UPDATE Url  
		SET Url = @Url
		WHERE SiteId = @ProductCategoryId  
		AND Type = 'PRODUCTCATEGORY'
	END

END
GO
/****** Object:  StoredProcedure [dbo].[ProductCategory_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductCategory_Delete_Admin]  
 @ProductCategoryId int = null  
AS  
BEGIN  
  
 DELETE FROM dbo.ProductCategory WHERE ProductCategoryId = @ProductCategoryId   
 
 -- Xoa url
	DELETE FROM Url WHERE SiteId = @ProductCategoryId
   
END
GO
/****** Object:  StoredProcedure [dbo].[ProductCategory_GetAll_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductCategory_GetAll_Admin]    
 @ProductCategoryId int = null    
AS    
BEGIN    
    
 SELECT     
  productCategoryId,  
  productCategoryName
 FROM dbo.ProductCategory
 WHERE Enable = 1
 
     
END
GO
/****** Object:  StoredProcedure [dbo].[ProductCategory_GetDetail_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductCategory_GetDetail_Admin]    
 @ProductCategoryId int = null    
AS    
BEGIN    
    
-- Lay chi tiet    
 SELECT     
  productCategoryId,  
  productCategoryName,
	enable,
	isTopCategory,
	url,  
	title,  
	keywords,  
	description
 FROM dbo.ProductCategory    
 WHERE ProductCategoryId = @ProductCategoryId   
     
END
GO
/****** Object:  StoredProcedure [dbo].[ProductCategory_GetList_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductCategory_GetList_Admin]  
 @PageIndex int = 1,  
 @PageSize int = 10,  
 @Keyword nvarchar(250) = NULL,  
 @Enable int = NULL  
AS  
BEGIN  
   
 SET NOCOUNT ON;  
 SELECT   
  COUNT (1) OVER() TotalItems,  
  Ca.productCategoryId ,
  Ca.productCategoryName,  
  U.FullName AS CreatedUser,  
  FORMAT(Ca.CreatedDate, 'dd/MM/yyyy') CreatedDate,  
  Ca.Enable  
 FROM dbo.ProductCategory Ca 
 LEFT JOIN UserAccount U ON U.UserName = Ca.CreatedUer  
 WHERE (@keyword IS NULL OR ProductCategoryName LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI)  
 AND (@Enable IS NULL OR Ca.Enable = @Enable)  
 ORDER BY Ca.CreatedDate desc
 OFFSET  @pageSize * (@pageIndex - 1) ROWS  
 FETCH NEXT @pageSize ROWS ONLY   
   
END
GO
/****** Object:  StoredProcedure [dbo].[ProductCategory_GetMenu_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductCategory_GetMenu_Web]    
AS    
BEGIN    
    
 SELECT     
  PC.productCategoryId,  
  PC.productCategoryName,
	Url.url
 FROM dbo.ProductCategory PC
 LEFT JOIN Url ON Url.SiteId = PC.productCategoryId
 WHERE PC.Enable = 1
 AND Url.Type = 'PRODUCTCATEGORY'
 AND EXISTS (
	SELECT 1 FROM Product
	WHERE Product.productCategoryId = PC.productCategoryId
	AND Product.Enable = 1
 )
     
END
GO
/****** Object:  StoredProcedure [dbo].[ProductCategory_GetProduct_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductCategory_GetProduct_Web]   
	@productCategoryId int = NULL,
	 @PageIndex int = 1,  
	@PageSize int = 12,  
	@priceFrom DECIMAL = 0,
	@priceTo DECIMAL = 20000000,
	@orderBy varchar(50) = 'price_low_to_high',
	@brand varchar(50) = null
AS    
BEGIN    
	IF (@brand = '') SET @brand = NULL
	IF (@orderBy = '') SET @orderBy = NULL
    
  SET NOCOUNT ON;  
	SELECT   
		COUNT (1) OVER() totalItems,
		P.productId,
		P.productName,
		P.shortDescription,
		P.url,
		P.price,
		PC.productCategoryName,
		B.brandName
	INTO #T_PRODUCT
	FROM dbo.Product P
	JOIN ProductCategory PC ON P.ProductCategoryId = PC.ProductCategoryId
	LEFT JOIN Brand B ON B.BrandId = P.BrandId
	WHERE P.Enable = 1
	AND (@brand IS NULL OR P.BrandId IN (SELECT item FROM F_STRINGLIST_TO_TABLE(@brand, ',')))
	AND P.price BETWEEN @priceFrom AND @priceTo
	AND (@productCategoryId IS NULL OR PC.ProductCategoryId = @productCategoryId)
	
	ORDER BY 
		CASE WHEN @orderBy IS NULL OR @orderBy = 'price_low_to_high' THEN P.price END ASC,
		CASE WHEN @orderBy = 'price_high_to_low' THEN P.price END DESC

 OFFSET  @pageSize * (@pageIndex - 1) ROWS  
 FETCH NEXT @pageSize ROWS ONLY   
 
 SELECT totalItems, productId, productName, url, shortDescription, price, productCategoryName, brandName
 FROM #T_PRODUCT
	 
 SELECT productId, imageUrl 
 FROM ProductImage
 WHERE productId IN (SELECT productId FROM #T_PRODUCT)
 
 DROP TABLE #T_PRODUCT
 
END
GO
/****** Object:  StoredProcedure [dbo].[ProductCategory_GetTop_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductCategory_GetTop_Web]    
AS    
BEGIN    
    
 SELECT TOP 1    
  productCategoryId,  
  productCategoryName
	INTO #T_PRODUCTCAT
 FROM dbo.ProductCategory
 WHERE Enable = 1
 AND IsTopCategory = 1
 
 SELECT 
		productCategoryId, 
		productCategoryName 
	FROM #T_PRODUCTCAT
 
 SELECT 
	P.productId,
	P.productName,
	P.url,
	P.price,
	Image.imageUrl,
	PC.productCategoryName,
	B.brandName
 FROM Product P
 JOIN ProductCategory PC ON P.productCategoryId = PC.productCategoryId
 LEFT JOIN Brand B ON B.BrandId = P.BrandId
 OUTER APPLY (
		SELECT TOP 1 imageUrl 
		FROM ProductImage 
		WHERE P.ProductId = ProductImage.ProductId
		AND (ProductImage.isDefault = 1 Or ProductImage.isDefault IS NULL OR ProductImage.isDefault = 0)
 ) Image

 WHERE  P.Enable = 1
 AND PC.productCategoryId IN (SELECT productCategoryId FROM #T_PRODUCTCAT)
 ORDER BY P.CreatedDate desc

DROP TABLE #T_PRODUCTCAT
     
END
GO
/****** Object:  StoredProcedure [dbo].[ProductImage_Create_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductImage_Create_Admin]
	@ProductId int = null,
	@ImageUrl nvarchar(500) = null,
	@username nvarchar(50) = null
	
AS 
BEGIN
	BEGIN
			INSERT INTO ProductImage
				(
					ProductId,
					ImageUrl
				)
			VALUES
				(
					@ProductId,
					@ImageUrl
				)
	END
END
GO
/****** Object:  StoredProcedure [dbo].[ProductImage_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductImage_Delete_Admin]
	@ProductId int = null
	
AS 
BEGIN
	BEGIN
			DELETE FROM  ProductImage WHERE ProductId = @ProductId
				
	END
END
GO
/****** Object:  StoredProcedure [dbo].[SeoPage_GetDetail_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SeoPage_GetDetail_Admin]
	@page varchar(50) = null
AS
BEGIN
	SELECT
		title,
		keywords,
		description,
		page
	FROM SeoPage
	WHERE Page = @page
END
GO
/****** Object:  StoredProcedure [dbo].[SeoPage_Update_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SeoPage_Update_Admin]
	@page varchar(50) = null,
	@title nvarchar(255) = null,
	@keywords nvarchar(255) = null,
	@description nvarchar(1000) = null,
	@createdUser varchar(50) = null
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM SeoPage WHERE Page = @page)
		BEGIN
			INSERT INTO SeoPage
				(
					Title,
					Keywords,
					Description,
					Page,
					CreatedDate,
					CreatedUser
				)
			VALUES
				(
					@title,
					@keywords,
					@description,
					@page,
					getdate(),
					@createdUser
				)
		END
	ELSE
		UPDATE SeoPage
		SET Title = @title,
		Keywords = @keywords,
		Description = @description,
		ModifyDate = getdate(),
		ModifyUser = @createdUser
		WHERE Page = @page	
END
GO
/****** Object:  StoredProcedure [dbo].[Store_CreateOrUpdate_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Store_CreateOrUpdate_Admin]
	@storeId int = null,
	@storeName nvarchar(300) = null,
	@address nvarchar(300) = null,
	@taxCode nvarchar(100) = null,
	@email nvarchar(100) = null,
	@phoneNumber nvarchar(100) = null,
	@openTime nvarchar(300) = null,
	@maps nvarchar(1000) = null,
	@logoUrl nvarchar(250) = null,
	@imageUrl nvarchar(250) = null,
	@createdUser varchar(50) = null,
	@shortDescription nvarchar(1000) = null
AS
BEGIN
	IF NOT EXISTS (SELECT 1 FROM Store WHERE StoreId = @storeId) 
		BEGIN
			INSERT INTO Store
			(
				storeName,
				address,
				taxCode,
				email,
				phoneNumber,
				openTime,
				maps,
				logoUrl,
				imageUrl,
				shortDescription,
				createdUser,
				createdDate
				
			)
			VALUES
			(
				@storeName,
				@address,
				@taxCode,
				@email,
				@phoneNumber,
				@openTime,
				@maps,
				@logoUrl,
				@imageUrl,
				@shortDescription,
				@createdUser,
				getdate()
			)
		END
	ELSE 
		BEGIN
			UPDATE Store 
			SET storeName = @storeName,
				address = @address,
				taxCode = @taxCode,
				email = @email,
				phoneNumber = @phoneNumber,
				openTime = @openTime,
				maps = @maps,
				logoUrl = @logoUrl,
				imageUrl = @imageUrl,
				shortDescription = @shortDescription,
				ModifyUser = @createdUser,
				ModifyDate = getdate()
			WHERE Storeid = @StoreId
		END
END
GO
/****** Object:  StoredProcedure [dbo].[Store_GetOne_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Store_GetOne_Admin]
AS
BEGIN
	SELECT TOP 1 
		storeId,
		storeName,
		address,
		taxCode,
		email,
		phoneNumber,
		openTime,
		maps,
		logoUrl,
		imageUrl,
		shortDescription
	FROM Store
END
GO
/****** Object:  StoredProcedure [dbo].[Store_GetOne_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Store_GetOne_Web]
AS
BEGIN
	SELECT TOP 1 
		storeId,
		storeName,
		address,
		taxCode,
		email,
		phoneNumber,
		openTime,
		maps,
		logoUrl,
		imageUrl,
		shortDescription
	FROM Store
END
GO
/****** Object:  StoredProcedure [dbo].[Url_CheckExist_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Url_CheckExist_Admin]
	@url varchar(255) = null,
	@siteId int = null
AS
BEGIN
	IF EXISTS (SELECT 1 FROM Url WHERE @url = Url AND (@siteId IS NULL OR @siteId <> siteId))
			SELECT 1 AS result
	ELSE
			SELECT 0 AS result
END
GO
/****** Object:  StoredProcedure [dbo].[Url_GetSiteInfoByUrl_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Url_GetSiteInfoByUrl_Web]
	@url VARCHAR(255) = null
AS
BEGIN
	SELECT TOP 1 siteId, type from Url WHERE Url = @url
END
GO
/****** Object:  StoredProcedure [dbo].[UserAccount_ChangePassword_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UserAccount_ChangePassword_Admin]
	@userId int = null,
	@password varchar(300),
	@modifyUser varchar(300) = null
AS
BEGIN

	UPDATE UserAccount 
	SET Password = @password,
	ModifyUser = @modifyUser,
	ModifyDate = getdate()
	WHERE userId = @userId	
	
	
END
GO
/****** Object:  StoredProcedure [dbo].[UserAccount_CreateOrUpdate_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UserAccount_CreateOrUpdate_Admin]
		@userId int = NULL,
		@fullName nvarchar(300) = null,
	 @username nvarchar(100) = null,
	 @password nvarchar(300) = null,
	 @permissionGroupId int = null,
	 @createdUser varchar(50) = null,
	 @enable bit = null,
	 @isAdmin bit = null,
	 @PhoneNumber varchar(50) = null

AS 
BEGIN

	-- Nếu không tìm thấy thì thêm mới
	IF NOT EXISTS (SELECT 1 FROM UserAccount WHERE UserId = @userId) 
		BEGIN
-- 		Them moi
			INSERT INTO UserAccount
				(
					FullName, 
           Username,
           Password, 
           permissionGroupId, 
           CreatedDate, 
           CreatedUser,
           Enable, 
					 IsAdmin, 
           PhoneNumber
				)
			VALUES
				(
					@fullName, 
           @username,
           @password, 
           @permissionGroupId, 
           getdate(), 
           @createdUser,
           @enable, 
					 @isAdmin, 
           @phoneNumber
				)
					
	END
		-- Nếu tìm thấy thì chỉnh sửa
	ELSE
			BEGIN
-- 				Cap nhat 
					UPDATE UserAccount
					SET 
							FullName = @fullName, 
						 Username = @username,
						 permissionGroupId = @permissionGroupId, 
						 ModifyDate = getdate(), 
						 ModifyUser = @createdUser,
						 Enable = @enable, 
						 IsAdmin = @isAdmin, 
						 PhoneNumber = @phoneNumber
					WHERE UserId = @userId
			END
		
END
GO
/****** Object:  StoredProcedure [dbo].[UserAccount_Delete_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UserAccount_Delete_Admin]
	@userId int = null
AS
BEGIN

	DELETE FROM UserAccount WHERE userId = @userId	
	
END
GO
/****** Object:  StoredProcedure [dbo].[UserAccount_GetByUsername_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UserAccount_GetByUsername_Admin]  
 @username varchar(50) = null  
AS  
BEGIN  
  
-- Lay chi tiet  
 SELECT   
	 fullName, 
	 username,
	 password,
	 permissionGroupId, 
	 enable, 
	 isAdmin, 
	 phoneNumber
 FROM UserAccount  
 WHERE username = @username  
   
END
GO
/****** Object:  StoredProcedure [dbo].[UserAccount_GetDetail_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UserAccount_GetDetail_Admin]  
 @userId int = null  
AS  
BEGIN  
  
-- Lay chi tiet  
 SELECT   
	 fullName, 
	 username,
	 password,
	 permissionGroupId, 
	 enable, 
	 isAdmin, 
	 phoneNumber
 FROM UserAccount  
 WHERE userId = @userId  
   
END
GO
/****** Object:  StoredProcedure [dbo].[UserAccount_GetDetailByUsername_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UserAccount_GetDetailByUsername_Admin]  
 @username varchar(50) = null  
AS  
BEGIN  
  
-- Lay chi tiet  
 SELECT   
	userId,
	 fullName, 
	 username,
	 isAdmin, 
	 phoneNumber
 FROM UserAccount  
 WHERE username = @username  
   
END
GO
/****** Object:  StoredProcedure [dbo].[UserAccount_GetList_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UserAccount_GetList_Admin]
	@PageIndex int = 1,
	@PageSize int = 10,
	@Keyword nvarchar(250) = NULL,
	@Enable int = NULL
AS
BEGIN
	
	SET NOCOUNT ON;
	SELECT 
		COUNT (1) OVER() TotalItems,
		U.userId,
		U.fullName,
		U.phoneNumber,
		U.username,
		UU.FullName AS CreatedUser,
		FORMAT(U.CreatedDate, 'dd/MM/yyyy') CreatedDate,
		U.Enable
	FROM UserAccount U
	LEFT JOIN UserAccount UU ON UU.UserName = U.CreatedUser
	WHERE	(
		@keyword IS NULL 
		OR U.FullName LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI
		OR U.UserName LIKE '%' + @Keyword + '%' COLLATE SQL_Latin1_General_CP1_CI_AI
	)
	AND (@Enable IS NULL OR U.Enable = @Enable)
	ORDER BY U.CreatedDate desc
	OFFSET		@pageSize * (@pageIndex - 1) ROWS
	FETCH NEXT	@pageSize ROWS ONLY 
	
END
GO
/****** Object:  StoredProcedure [dbo].[ViewNum_Get_Admin]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ViewNum_Get_Admin]
	
AS
BEGIN
	
	DECLARE @viewYear varchar(10) = FORMAT(GETDATE(), 'yyyy')

	SELECT 
			SUM(viewNumber) viewNumber,
			MONTH(ViewDate) AS viewMonth
	FROM ViewNum
	WHERE @viewYear = FORMAT(ViewDate, 'yyyy')
	GROUP BY MONTH(ViewDate)
	ORDER BY ViewMonth
	
END
GO
/****** Object:  StoredProcedure [dbo].[ViewNum_Update_Web]    Script Date: 4/18/2022 1:46:11 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ViewNum_Update_Web]
	
AS
BEGIN
	
	DECLARE @monthyear varchar(10) = FORMAT(GETDATE(), 'MM/yyyy')

	IF NOT EXISTS (SELECT 1 FROM ViewNum WHERE @monthyear = FORMAT(ViewDate, 'MM/yyyy'))
			BEGIN
					INSERT INTO ViewNum 
					(ViewNumber, ViewDate) VALUES (1, GETDATE())
			END
	ELSE
			BEGIN
				UPDATE ViewNum 
				SET ViewNumber = ViewNumber + 1
				WHERE @monthyear = FORMAT(ViewDate, 'MM/yyyy')
			END
END
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'0: Hủy đơn, 1: Mới tạo, 2: Đã xác nhận, 3: Đang vận chuyển, 4: Hoàn thành' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CusOrder', @level2type=N'COLUMN',@level2name=N'Status'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'product, news, about, contact' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SeoPage', @level2type=N'COLUMN',@level2name=N'Page'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'news, news-detail, product-detail, about, contact, ...' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Url', @level2type=N'COLUMN',@level2name=N'Type'
GO
USE [master]
GO
ALTER DATABASE [BAO_TEST] SET  READ_WRITE 
GO
