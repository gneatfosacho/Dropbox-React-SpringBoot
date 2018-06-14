package com.cmpe273.dropbox.backend;

import com.cmpe273.dropbox.backend.controller.UserController;
import com.cmpe273.dropbox.backend.entity.Files;
import com.cmpe273.dropbox.backend.entity.Groupmembers;
import com.cmpe273.dropbox.backend.entity.Groups;
import com.cmpe273.dropbox.backend.entity.Users;
import com.cmpe273.dropbox.backend.service.FileService;
import com.cmpe273.dropbox.backend.service.GroupMembersService;
import com.cmpe273.dropbox.backend.service.GroupService;
import com.cmpe273.dropbox.backend.service.UserService;
import org.json.JSONException;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringRunner;

import javax.servlet.http.HttpSession;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BackendApplicationTests {

	@Autowired
	private UserService userService;

	@Autowired
	private FileService fileService;

	@Autowired
	private GroupService groupService;

	@Autowired
	private GroupMembersService groupMembersService;

	@Test
	public void addUserTest() throws JSONException {

		Users user = new Users();

		user.setEmail("kimtani88@gmail.com");
		user.setPassword("dishkim02");
		user.setFirstname("Dishant");
		user.setLastname("Kimtani");

		Users u = userService.addUser(user);

		Assert.assertEquals(u.getEmail(), user.getEmail());

	}


	@Test
	public void getUserDetailsTest() throws JSONException {


		Users user = new Users();

		user.setEmail("kimtani90@gmail.com");

		Users u = userService.getUserDetails("kimtani90@gmail.com");

		Assert.assertEquals(u.getEmail(), user.getEmail());


	}

	@Test
	public void updateUserTest() throws JSONException {

		Users user = new Users();

		user.setEmail("kimtani88@gmail.com");

		user.setFirstname("Mayank");
		user.setLastname("Kimtani");

		int count = userService.updateUserDetails(user);

		Assert.assertEquals(1, count);


	}

	@Test
	public void loginTest() throws JSONException {

		List<Users> userList = userService.login("kimtani90@gmail.com", "dishkim02");

		Assert.assertEquals(1, userList.size());

	}


	@Test
	public void uploadFileTest() throws JSONException {

		Files file = new Files();
		file.setFilename("test.txt");
		file.setFilepath("./public/uploads/kimtani90@gmail/test.txt");
		file.setSharedcount(0);
		file.setOwner("kimtani89@gmail.com");
		file.setFileparent("");
		file.setStarred("F");
		file.setIsfile("F");
		fileService.uploadFile(file);

		Files getFile = fileService.getFileByFilepath("./public/uploads/kimtani90@gmail/test.txt", "");

		Assert.assertEquals(getFile.getFilepath(), file.getFilepath());

	}

	@Test
	public void markStarTest() throws JSONException {

		fileService.markStar("./public/uploads/kimtani90@gmail/test.txt", "T");
		Files getFile = fileService.getFileByFilepath("./public/uploads/kimtani90@gmail/test.txt", "");

		Assert.assertEquals("T", getFile.getStarred());

	}

	@Test
	public void updateSharedCountTest() throws JSONException {

		fileService.updateSharedCount("./public/uploads/kimtani90@gmail/test.txt",2);

		Files file = fileService.getFileByFilepath("./public/uploads/kimtani90@gmail/test.txt","");
		Assert.assertEquals(Integer.valueOf(2), file.getSharedcount());
	}


	@Test
	public void deleteFileTest() throws JSONException {

		fileService.deleteFile("./public/uploads/kimtani90@gmail/test.txt");
		Files getFile = fileService.getFileByFilepath("./public/uploads/kimtani90@gmail/test.txt", "");

		Assert.assertEquals(null, getFile);

	}

	@Test
	public void addGroupTest() throws JSONException {

		Groups groups=new Groups();

		groups.setOwner("kimtani90@gmail.com");
		groups.setMembercount(1);
		groups.setGroupname("test group");
		groups.setGroupId(10);

		groupService.addGroup(groups);

		Groups grp = groupService.getGroupByGroupId(10);
		Assert.assertEquals(Integer.valueOf(10), groups.getGroupid());

	}


	@Test
	public void deleteGroupTest() throws JSONException {

		groupService.deleteGroup(10);

		Groups grp = groupService.getGroupByGroupId(10);
		Assert.assertEquals(null, grp);

	}


}
