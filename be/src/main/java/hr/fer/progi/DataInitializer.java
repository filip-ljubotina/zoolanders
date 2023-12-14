package hr.fer.progi;

import hr.fer.progi.entity.AppUser;
import hr.fer.progi.entity.Station;
import hr.fer.progi.entity.enums.AppUserRole;
import hr.fer.progi.mapper.CoordinateJsonToClass;
import hr.fer.progi.repository.AppUserRepository;
import hr.fer.progi.repository.StationRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

@Component
public class DataInitializer {
    private final AppUserRepository appUserRepository;
    private final StationRepository stationRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final CoordinateJsonToClass coordinateJsonToClass;

    public DataInitializer(AppUserRepository appUserRepository,
                           StationRepository stationRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder,
                           CoordinateJsonToClass coordinateJsonToClass) {
        this.appUserRepository = appUserRepository;
        this.stationRepository = stationRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.coordinateJsonToClass = coordinateJsonToClass;
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

        if (stationRepository.count() == 0){
            try {
                String jsonString = readJsonFromFile("coordinates/coordinatesBiokovo.json");
                Station station = new Station("biokovo", coordinateJsonToClass.mapper(jsonString));
                stationRepository.save(station);
                // TODO: Add Lonjsko Polje station
                // station = new Station("lonjsko_polje");
                // stationRepository.save(station);
            } catch (IOException e) {
                throw new RuntimeException("Error reading JSON file", e);
            }
        }

    }

    private String readJsonFromFile(String filePath) throws IOException {
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream(filePath)) {
            Objects.requireNonNull(inputStream, "File not found: " + filePath);
            return new String(inputStream.readAllBytes());
        }
    }
}