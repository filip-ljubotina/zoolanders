package hr.fer.progi.controller;

import hr.fer.progi.dto.authenticationDto.LoginRequest;
import hr.fer.progi.dto.authenticationDto.LoginResponse;
import hr.fer.progi.dto.authenticationDto.RegistrationRequest;
import hr.fer.progi.service.impl.AuthenticationServiceJpa;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin
@RestController
@RequestMapping
public class AuthenticationController {

    private final AuthenticationServiceJpa authenticationServiceJpa;

    public AuthenticationController(AuthenticationServiceJpa authenticationServiceJpa) {
        this.authenticationServiceJpa = authenticationServiceJpa;
    }

    @PostMapping("/registration")
    public ResponseEntity<String> register(@RequestBody RegistrationRequest request) {
        return new ResponseEntity<>(authenticationServiceJpa.register(request), HttpStatus.OK);
    }

    @GetMapping( "/registration/confirm")
    public String confirm(@RequestParam("token") String token) {
        return authenticationServiceJpa.confirmToken(token);
    }

    @PostMapping("/logIn")
    @ResponseBody
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        LoginResponse loginResponse = authenticationServiceJpa.performLogin(loginRequest);
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }
}
