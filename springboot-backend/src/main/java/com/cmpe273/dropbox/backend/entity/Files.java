package com.cmpe273.dropbox.backend.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Files {

    String filename;

    @Id
    String filepath;

    String fileparent;

    String isfile;

    String owner;

    String starred;

    Integer sharedcount;

    public String getStarred() {
        return starred;
    }

    public Integer getSharedcount() {
        return sharedcount;
    }

    public void setSharedcount(Integer sharedcount) {
        this.sharedcount = sharedcount;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void setStarred(String starred) {
        this.starred = starred;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public String getFileparent() {
        return fileparent;
    }

    public void setFileparent(String fileparent) {
        this.fileparent = fileparent;
    }

    public String getIsfile() {
        return isfile;
    }

    public void setIsfile(String isfile) {
        this.isfile = isfile;
    }
}
