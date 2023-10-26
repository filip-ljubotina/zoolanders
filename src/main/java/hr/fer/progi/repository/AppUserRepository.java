package hr.fer.progi.repository;

import hr.fer.progi.dto.adminDto.AdminTableResponseDto;
import hr.fer.progi.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface AppUserRepository
        extends JpaRepository<AppUser, Long> {

    Optional<AppUser> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE AppUser a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAppUser(String email);

    @Query("SELECT new hr.fer.progi.dto.adminDto.AdminTableResponseDto(e.id, e.userName, e.firstName, e.lastName, e.email, e.appUserRole) FROM AppUser e")
    List<AdminTableResponseDto> findAllUserInfo();

    @Query("SELECT new hr.fer.progi.dto.adminDto.AdminTableResponseDto(e.id, e.userName, e.firstName, e.lastName, e.email, e.appUserRole) " +
            "FROM AppUser e WHERE e.locked = TRUE")
    List<AdminTableResponseDto> findAllUserInfoUnapproved();
}
