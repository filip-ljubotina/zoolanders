package hr.fer.progi;

import hr.fer.progi.entity.Animal;
import hr.fer.progi.entity.AppUser;
import hr.fer.progi.entity.Station;
import hr.fer.progi.entity.enums.AppUserRole;
import hr.fer.progi.jsonentities.PositionCoordinates;
import hr.fer.progi.mapper.JsonToClass;
import hr.fer.progi.repository.AnimalRepository;
import hr.fer.progi.repository.AppUserRepository;
import hr.fer.progi.repository.StationRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class DataInitializer {
    private final AppUserRepository appUserRepository;
    private final StationRepository stationRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JsonToClass jsonToClass;
    private final AnimalRepository animalRepository;

    public DataInitializer(AppUserRepository appUserRepository,
                           StationRepository stationRepository,
                           BCryptPasswordEncoder bCryptPasswordEncoder,
                           JsonToClass jsonToClass,
                           AnimalRepository animalRepository) {
        this.appUserRepository = appUserRepository;
        this.stationRepository = stationRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jsonToClass = jsonToClass;
        this.animalRepository = animalRepository;
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
                Station station = new Station("biokovo", jsonToClass.jsonToCoordinatesJsonClass(jsonString));
                stationRepository.save(station);
                //TODO: ispraviti
                List<Double> coordinates = new ArrayList<>();
                coordinates.add(45.36276);
                coordinates.add(16.812344);
                PositionCoordinates positionCoordinates = new PositionCoordinates(coordinates);
                Animal animal = new Animal("roda1", "roda", "bijela roda", positionCoordinates, station);
                animalRepository.save(animal);

                coordinates = new ArrayList<>();
                coordinates.add(45.401343);
                coordinates.add(16.76239);
                positionCoordinates = new PositionCoordinates(coordinates);
                animal = new Animal("roda2", "roda", "crna roda", positionCoordinates, station);
                animalRepository.save(animal);

                jsonString = readJsonFromFile("coordinates/coordinatesLonjskoPolje.json");
                station = new Station("lonjsko_polje", jsonToClass.jsonToCoordinatesJsonClass(jsonString));
                stationRepository.save(station);

                coordinates = new ArrayList<>();
                coordinates.add(43.326926);
                coordinates.add(17.056618);
                positionCoordinates = new PositionCoordinates(coordinates);
                animal = new Animal("vuk1", "vuk", "bijeli vuk", positionCoordinates, station);
                animalRepository.save(animal);

                coordinates = new ArrayList<>();
                coordinates.add(43.316935);
                coordinates.add(17.09507);
                positionCoordinates = new PositionCoordinates(coordinates);
                animal = new Animal("vuk2", "vuk", "crni vuk", positionCoordinates, station);
                animalRepository.save(animal);
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