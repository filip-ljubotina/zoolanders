package hr.fer.progi.controller;

import hr.fer.progi.dto.adminDto.AdminTableResponseDto;
import hr.fer.progi.dto.adminDto.AdminTablePutRequestDto;
import hr.fer.progi.service.impl.AppUserServiceJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/wildTrack")
public class AdminController {

    private final AppUserServiceJpa appUserServiceJpa;

    @Autowired
    public AdminController(AppUserServiceJpa appUserServiceJpa) {
        this.appUserServiceJpa = appUserServiceJpa;
    }

    @GetMapping
    public String test() {
        return "radi";
    }

    @GetMapping("/admin/getUserTable")
    public ResponseEntity<List<AdminTableResponseDto>> adminGetAllUsers() {
        List<AdminTableResponseDto> listOfAllUser = appUserServiceJpa.getAllTableUsers();
        return new ResponseEntity<>(listOfAllUser, HttpStatus.CREATED);
    }

    @PutMapping("/admin/putUserTable")
    public HttpStatus updateUser(@RequestBody AdminTablePutRequestDto adminTablePutRequestDto) {
        appUserServiceJpa.updateAdminTableRow(adminTablePutRequestDto);
        return HttpStatus.OK;
    }

    @GetMapping("/admin/getApprovalTable")
    public ResponseEntity<List<AdminTableResponseDto>> getWaitingApprovalList() {
        List<AdminTableResponseDto> listOfAllUser = appUserServiceJpa.getAllWaitingApprovalUsers();
        return new ResponseEntity<>(listOfAllUser, HttpStatus.CREATED);
    }

    @PutMapping("/admin/putApprovalTable")
    public HttpStatus asdFunction(@RequestBody AdminTablePutRequestDto adminTablePutRequestDto) {
        appUserServiceJpa.updateApproval(adminTablePutRequestDto);
        return HttpStatus.OK;
    }
}
