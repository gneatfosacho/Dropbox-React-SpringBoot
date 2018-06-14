package com.cmpe273.dropbox.backend.service;


import com.cmpe273.dropbox.backend.entity.Userfiles;
import com.cmpe273.dropbox.backend.entity.Userlog;
import com.cmpe273.dropbox.backend.repository.UserFilesRepository;
import com.cmpe273.dropbox.backend.repository.UserLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserLogService {
    @Autowired
    private UserLogRepository userLogRepository;

    public void addUserLog(Userlog userlog){

        userLogRepository.save(userlog);
    }

    public List<Userlog> getUserlogByEmail(String email){

        return userLogRepository.getUserlogByEmail(email);
    }

}