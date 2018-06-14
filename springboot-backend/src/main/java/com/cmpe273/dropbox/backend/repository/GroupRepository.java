
package com.cmpe273.dropbox.backend.repository;


import com.cmpe273.dropbox.backend.entity.Files;
import com.cmpe273.dropbox.backend.entity.Groups;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public interface GroupRepository extends CrudRepository<Groups, Long> {

    List<Groups> getGroupsByOwner(String email);

    @Transactional
    @Modifying
    void deleteByGroupid(Integer id);

    Groups getByGroupid(Integer id);

}