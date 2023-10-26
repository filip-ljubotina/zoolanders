package hr.fer.progi.service;

import hr.fer.progi.dto.authenticationDto.LoginRequest;
import hr.fer.progi.dto.authenticationDto.LoginResponse;
import hr.fer.progi.dto.authenticationDto.RegistrationRequest;

public interface AuthenticationService {

    public LoginResponse performLogin(LoginRequest loginRequest);

    String register(RegistrationRequest request);

    public String confirmToken(String token);

}
