
package com.cmpe273.dropbox.backend.repository;


import com.cmpe273.dropbox.backend.entity.Userfiles;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface UserFilesRepository extends CrudRepository<Userfiles, Long> {

    List<Userfiles> getByEmail(String email);


    @Transactional
    @Modifying
    void deleteByFilepath(String filepath);


    @Transactional
    @Modifying
    void deleteByFilepathAndEmail(String filepath, String email);

}