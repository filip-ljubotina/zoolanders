package hr.fer.progi.mapper;

import hr.fer.progi.dto.authenticationDto.LoginResponse;
import org.springframework.stereotype.Component;

@Component
public class LoginResponseMapper {

    public LoginResponse mapper(String token, String[] authoritiesArray, String stationName, byte[] image, String userName, String firstName, String lastName, String email){
        String authority =  authoritiesArray[0];
        return new LoginResponse(token, authority.replace("ROLE_", ""), stationName, image, userName, firstName, lastName, email);
    }
}
