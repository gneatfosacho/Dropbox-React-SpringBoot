
package com.cmpe273.dropbox.backend.repository;


import com.cmpe273.dropbox.backend.entity.Files;
import com.cmpe273.dropbox.backend.entity.Userlog;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository

public interface UserLogRepository extends CrudRepository<Userlog, Long> {

    List<Userlog> getUserlogByEmail(String email);
}