package hr.fer.progi.mapper;

import hr.fer.progi.dto.authenticationDto.LoginResponse;
import org.springframework.stereotype.Component;

@Component
public class LoginResponseMapper {

    public LoginResponse mapper(String token, String[] authoritiesArray){
        String authority =  authoritiesArray[0];

        return new LoginResponse(token, authority.replace("ROLE_", ""));
    }
}
