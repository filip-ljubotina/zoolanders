package hr.fer.progi.service;

import hr.fer.progi.dto.adminDto.AdminTablePutRequestDto;
import hr.fer.progi.dto.adminDto.AdminTableResponseDto;
import hr.fer.progi.entity.AppUser;

import java.util.List;

public interface AppUserService {

    String signUpUser(AppUser appUser);

    int enableAppUser(String email);

    List<AdminTableResponseDto> getAllTableUsers();

    void updateAdminTableRow(AdminTablePutRequestDto adminTablePutRequestDto);

    List<AdminTableResponseDto> getAllWaitingApprovalUsers();

    void updateApproval(AdminTablePutRequestDto adminTablePutRequestDto);
}
