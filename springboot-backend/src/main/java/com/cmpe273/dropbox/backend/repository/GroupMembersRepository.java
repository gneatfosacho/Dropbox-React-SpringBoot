
package com.cmpe273.dropbox.backend.repository;


import com.cmpe273.dropbox.backend.entity.Groupmembers;
import com.cmpe273.dropbox.backend.entity.Userfiles;
import com.cmpe273.dropbox.backend.entity.Users;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface GroupMembersRepository extends CrudRepository<Groupmembers, Long> {

    @Transactional
    @Modifying
    void deleteByGroupid(Integer id);

    @Transactional
    @Modifying
    void deleteByGroupidAndEmail(Integer groupId, String email);


    List<Groupmembers> getByGroupid(Integer id);

    List<Groupmembers> getByEmail(String email);

    Groupmembers getByEmailAndGroupid(String email, Integer groupId);


}