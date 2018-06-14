package com.cmpe273.dropbox.backend.controller;

import com.cmpe273.dropbox.backend.entity.*;
import com.cmpe273.dropbox.backend.service.*;
import com.google.gson.Gson;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller    // This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/groups")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupMembersService groupMembersService;

    @Autowired
    private UserService userService;

    @GetMapping(path = "/getgroups", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Groups>> getGroups(HttpSession session) {

        String email = (String) session.getAttribute("email");
        List<Groups> groupsList = groupService.getGroups(email);

        for(Groupmembers grpmem : groupMembersService.getMembersByEmail(email)){
            groupsList.add(groupService.getGroupByGroupId(grpmem.getGroupid()));
        }

        return new ResponseEntity(groupsList, HttpStatus.OK);
    }

    @PostMapping(path = "/addgroup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Groups> addGroup(@RequestBody Groups group, HttpSession session) throws JSONException {

        JSONObject groupdata = new JSONObject(group);
        Gson gson = new Gson();
       // JSONObject groupdata = (JSONObject) jObject.get("group");
        Groups grp = gson.fromJson(groupdata.toString(), Groups.class);

        grp.setMembercount(0);
        String email = (String)session.getAttribute("email");
        grp.setOwner(email);

        groupService.addGroup(grp);

        return new ResponseEntity(grp, HttpStatus.OK);

    }

    @PostMapping(path = "/deletegroup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteGroup(@RequestBody Groups groups, HttpSession session) throws JSONException {

        String email = (String) session.getAttribute("email");


        if (groups.getOwner().equals(email)) {

                groupMembersService.deleteGroupMembers(groups.getGroupid());
                groupService.deleteGroup(groups.getGroupid());

                return new ResponseEntity(null, HttpStatus.OK);
        } else {

            return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
        }

    }


    @GetMapping(path = "/getmembers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Users>> getMembers(@RequestParam Integer groupid) {

        List<Groupmembers> membersList = groupMembersService.getMembers(groupid);

        List<Users> usersList = new ArrayList<>();

        for(Groupmembers groupmembers : membersList){

            usersList.add(userService.getUserDetails(groupmembers.getEmail()));

        }

        return new ResponseEntity(usersList, HttpStatus.OK);
    }

    @PostMapping(path = "/addmember", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Users> addMember(@RequestBody String data, HttpSession session) throws JSONException {

        JSONObject jObject = new JSONObject(data);
        Integer groupId = jObject.getInt("groupId");
        String member = jObject.getString("member");

        Groupmembers grpmem = groupMembersService.getMembersByEmailAndId(member, groupId);

        if(grpmem==null) {
            Users user = userService.getUserDetails(member);
            if (user != null) {

                Groupmembers groupmembers = new Groupmembers();
                groupmembers.setEmail(member);
                groupmembers.setGroupid(groupId);

                groupMembersService.addGroupMembers(groupmembers);

                return new ResponseEntity(user, HttpStatus.OK);

            } else {
                return new ResponseEntity(null, HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            return new ResponseEntity(null, HttpStatus.CONFLICT);
        }
    }

    @PostMapping(path = "/deletemember", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteMember(@RequestBody String data, HttpSession session) throws JSONException {

        String email = (String) session.getAttribute("email");

        JSONObject jObject = new JSONObject(data);
        Integer groupId = jObject.getInt("groupId");
        String member = jObject.getString("memberemail");

        groupMembersService.deleteGroupMember(groupId, member);

        return new ResponseEntity(null, HttpStatus.OK);

    }

}