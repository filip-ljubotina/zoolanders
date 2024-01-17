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
        try {
            String token = authenticationServiceJpa.register(request);
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
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
