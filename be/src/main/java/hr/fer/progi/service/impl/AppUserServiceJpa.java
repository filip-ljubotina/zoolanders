package hr.fer.progi.service.impl;

import hr.fer.progi.dto.adminDto.AdminTableResponseDto;
import hr.fer.progi.dto.adminDto.AdminTablePutRequestDto;
import hr.fer.progi.entity.AppUser;
import hr.fer.progi.entity.enums.AppUserRole;
import hr.fer.progi.repository.AppUserRepository;
import hr.fer.progi.entity.ConfirmationToken;
import hr.fer.progi.service.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserServiceJpa implements UserDetailsService, AppUserService {

    private final static String USER_NOT_FOUND_MSG =
            "user with email %s not found";

    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenServiceJpa confirmationTokenServiceJpa;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                String.format(USER_NOT_FOUND_MSG, email)));
    }

    @Override
    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository
                .findByEmail(appUser.getEmail())
                .isPresent();

        if (userExists) {
            throw new IllegalStateException("email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(appUser.getPassword());
        appUser.setPassword(encodedPassword);

        if (appUser.getAppUserRole().name().equals("ROLE_RESEARCHER") ||
                appUser.getAppUserRole().name().equals("ROLE_STATION_MANAGER")){
            appUser.setLocked(true);
        }

        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();

        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenServiceJpa.saveConfirmationToken(
                confirmationToken);

        return token;
    }

    @Override
    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

    @Override
    public List<AdminTableResponseDto> getAllTableUsers(){
        return appUserRepository.findAllUserInfo();
    }

    @Override
    public void updateAdminTableRow(AdminTablePutRequestDto adminTablePutRequestDto) {
        Optional<AppUser> appUserOptional = appUserRepository.findById(adminTablePutRequestDto.getId());
        AppUser appUser = appUserOptional.get();

        appUser.setEmail(adminTablePutRequestDto.getEmail());
        appUser.setUserName(adminTablePutRequestDto.getUserName());
        appUser.setImage(adminTablePutRequestDto.getImage());
        appUser.setFirstName(adminTablePutRequestDto.getFirstName());
        appUser.setLastName(adminTablePutRequestDto.getLastName());
        appUser.setAppUserRole(AppUserRole.valueOf("ROLE_" + adminTablePutRequestDto.getRole()));

        appUserRepository.save(appUser);

    }

    @Override
    public List<AdminTableResponseDto> getAllWaitingApprovalUsers() {
        return appUserRepository.findAllUserInfoUnapproved();
    }

    @Override
    public void updateApproval(AdminTablePutRequestDto adminTablePutRequestDto) {
        Optional<AppUser> appUserOptional = appUserRepository.findById(adminTablePutRequestDto.getId());
        AppUser appUser = appUserOptional.get();
        appUser.setLocked(false);
        appUserRepository.save(appUser);
    }

    public AppUser findById(Long appUserId) {
        return appUserRepository.findById(appUserId).get();
    }
}
