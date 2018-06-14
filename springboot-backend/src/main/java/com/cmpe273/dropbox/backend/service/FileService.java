package com.cmpe273.dropbox.backend.service;

import com.cmpe273.dropbox.backend.entity.Files;
import com.cmpe273.dropbox.backend.entity.Users;
import com.cmpe273.dropbox.backend.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FileService {
    @Autowired
    private FileRepository fileRepository;

    public void uploadFile(Files file){
        fileRepository.save(file);
    }

    public Files getFileByFilepath(String filepath, String fileparent){
        return fileRepository.getByFilepathAndFileparent(filepath, fileparent);
    }

    public List<Files> getFileByFileparent(String filepath){
        return fileRepository.getByFileparent(filepath);
    }

    public void deleteFile(String filepath){
         fileRepository.deleteByFilepath(filepath);
    }

    public void updateSharedCount(String filepath, Integer sharedcount){
        fileRepository.updateSharedCount(filepath, sharedcount);
    }

    public void markStar(String filepath, String starred){
        fileRepository.markStar(filepath, starred);
    }

}