package com.cmpe273.dropbox.backend.service;

import com.cmpe273.dropbox.backend.entity.Users;
import com.cmpe273.dropbox.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Iterable<Users> getAllUsers(){
        return userRepository.findAll();
    }

    public Users addUser(Users users){
        return userRepository.save(users);
    }

    public List<Users> login(String email, String password){
        return userRepository.findByEmailAndPassword(email,password);
    }

    public void updateLastLogin(String email){
        userRepository.updateLastLogin(email);
    }

    public Users getUserDetails(String email){
        return userRepository.findByEmail(email);
    }

    public int updateUserDetails(Users user){
        return userRepository.updateUserDetails(user.getFirstname(),
                                            user.getLastname(),
                                            user.getContact(),
                                            user.getInterests(),
                                            user.getEmail());
    }
}