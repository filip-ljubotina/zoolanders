package hr.fer.progi;

import hr.fer.progi.entity.AppUser;
import hr.fer.progi.entity.AppUserRole;
import hr.fer.progi.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {
    @Autowired
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public DataInitializer(AppUserRepository appUserRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.appUserRepository = appUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @EventListener
    public void appReady(ApplicationReadyEvent event) {
        if(appUserRepository.count() == 0){
            AppUser appUser = new AppUser();
            appUser.setUserName("admin");
            appUser.setImage(null);
            appUser.setFirstName("admin");
            appUser.setLastName("admin");
            appUser.setEmail("admin@wildtrack.com");
            appUser.setPassword(bCryptPasswordEncoder.encode("admin123"));
            appUser.setAppUserRole(AppUserRole.valueOf("ROLE_ADMIN"));
            appUser.setEnabled(true);
            appUserRepository.save(appUser);
        }

    }
}