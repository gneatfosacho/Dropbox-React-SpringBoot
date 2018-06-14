create database cmpe273;

use cmpe273;

create table files
(
	filename varchar(255) not null,
	filepath varchar(500) not null
		primary key,
	fileparent varchar(500) null,
	isfile varchar(1) null,
	starred varchar(1) null,
	owner varchar(255) null,
	sharedcount int null
)
;

create table groupmembers
(
	id int auto_increment
		primary key,
	groupId int null,
	email varchar(200) null
)
;

create index groupmembers_groups_groupId_fk
	on groupmembers (groupId)
;

create index groupmembers_users_email_fk
	on groupmembers (email)
;

create table groups
(
	groupId int auto_increment
		primary key,
	groupname varchar(200) null,
	membercount int null,
	owner varchar(200) null
)
;

create index groups_users_email_fk
	on groups (owner)
;

alter table groupmembers
	add constraint groupmembers_groups_groupId_fk
		foreign key (groupId) references groups (groupId)
;

create table members
(
	memberId int auto_increment
		primary key,
	firstname varchar(200) null,
	lastname varchar(200) null,
	email varchar(200) null
)
;

create table userfiles
(
	ID int auto_increment
		primary key,
	filepath varchar(500) null,
	email varchar(500) null,
	constraint userfiles_ibfk_1
		foreign key (filepath) references files (filepath)
)
;

create index email
	on userfiles (email)
;

create index filepath
	on userfiles (filepath)
;

create table userlog
(
	ID int auto_increment
		primary key,
	filename varchar(255) null,
	filepath varchar(500) null,
	isfile varchar(1) null,
	email varchar(500) null,
	action varchar(100) null,
	actiontime varchar(100) null
)
;

create index email
	on userlog (email)
;

create table users
(
	firstname varchar(255) not null,
	lastname varchar(255) null,
	email varchar(500) not null
		primary key,
	password varchar(255) null,
	contact varchar(255) null,
	interests varchar(255) null,
	lastlogin varchar(255) null
)
;

alter table groupmembers
	add constraint groupmembers_users_email_fk
		foreign key (email) references users (email)
;

alter table groups
	add constraint groups_users_email_fk
		foreign key (owner) references users (email)
;

alter table userfiles
	add constraint userfiles_ibfk_2
		foreign key (email) references users (email)
;

alter table userlog
	add constraint userlog_ibfk_1
		foreign key (email) references users (email)
;

