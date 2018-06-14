package com.cmpe273.dropbox.backend.service;


import com.cmpe273.dropbox.backend.entity.Groupmembers;
import com.cmpe273.dropbox.backend.entity.Userfiles;
import com.cmpe273.dropbox.backend.entity.Users;
import com.cmpe273.dropbox.backend.repository.GroupMembersRepository;
import com.cmpe273.dropbox.backend.repository.GroupRepository;
import com.cmpe273.dropbox.backend.repository.UserFilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupMembersService {
    @Autowired
    private GroupMembersRepository groupMembersRepository;

    public void deleteGroupMembers(Integer id){
        groupMembersRepository.deleteByGroupid(id);
    }

    public void addGroupMembers(Groupmembers groupmembers){
        groupMembersRepository.save(groupmembers);
    }

    public List<Groupmembers> getMembers(Integer groupId){
        return groupMembersRepository.getByGroupid(groupId);
    }

    public List<Groupmembers> getMembersByEmail(String email){
        return groupMembersRepository.getByEmail(email);
    }

    public Groupmembers getMembersByEmailAndId(String email, Integer groupId){
        return groupMembersRepository.getByEmailAndGroupid(email,groupId);
    }

    public void deleteGroupMember(Integer groupId, String email){
        groupMembersRepository.deleteByGroupidAndEmail(groupId, email);
    }


}