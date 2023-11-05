package hr.fer.progi.service;

import hr.fer.progi.dto.authenticationDto.LoginRequest;
import hr.fer.progi.dto.authenticationDto.LoginResponse;
import hr.fer.progi.dto.authenticationDto.RegistrationRequest;

public interface AuthenticationService {

    LoginResponse performLogin(LoginRequest loginRequest);

    String register(RegistrationRequest request);

    String confirmToken(String token);

}
