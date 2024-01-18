package hr.fer.progi.service.impl;

import hr.fer.progi.dto.authenticationDto.LoginRequest;
import hr.fer.progi.dto.authenticationDto.LoginResponse;
import hr.fer.progi.entity.AppUser;
import hr.fer.progi.entity.SearcherInTheField;
import hr.fer.progi.entity.Station;
import hr.fer.progi.entity.enums.AppUserRole;
import hr.fer.progi.dto.authenticationDto.RegistrationRequest;
import hr.fer.progi.repository.SearcherInTheFieldRepository;
import hr.fer.progi.repository.StationManagerRepository;
import hr.fer.progi.service.EmailSender;
import hr.fer.progi.entity.ConfirmationToken;
import hr.fer.progi.mapper.LoginResponseMapper;
import hr.fer.progi.security.JwtTokenProvider;
import hr.fer.progi.service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;


@Service
@AllArgsConstructor
public class AuthenticationServiceJpa implements AuthenticationService {
    private final AppUserServiceJpa appUserServiceJpa;
    private final ConfirmationTokenServiceJpa confirmationTokenServiceJpa;
    private final EmailSender emailSender;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final LoginResponseMapper loginResponseMapper;
    private final StationManagerJpa stationManagerJpa;
    private final SearcherInTheFieldJpa searcherInTheFieldJpa;
    private final SearcherInTheFieldRepository searcherInTheFieldRepository;
    private final StationManagerRepository stationManagerRepository;
    private Environment env;

    @Override
    @Transactional
    public LoginResponse performLogin(LoginRequest loginRequest){

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = appUserServiceJpa.loadUserByUsername(loginRequest.getUsername());
        String token = jwtTokenProvider.generateToken(userDetails);

        String[] authoritiesArray = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toArray(String[]::new);

        String stationName = null;
        if(authoritiesArray[0].equals("ROLE_STATION_MANAGER")){
            stationName = stationManagerRepository.findByAppUser((AppUser) userDetails).getStation().getStationName();
        }

        if(authoritiesArray[0].equals("ROLE_SEARCHER_IN_THE_FIELD")){
            SearcherInTheField searcherInTheField = searcherInTheFieldRepository.findByAppUser((AppUser) userDetails);
            Station station = searcherInTheField.getStation();
            if (station != null){
                stationName = station.getStationName();
            }
        }

        AppUser appUser = (AppUser) userDetails;

        LoginResponse loginResponse = loginResponseMapper.mapper(token, authoritiesArray, stationName, appUser.getImage());

        return loginResponse;
    }

    @Transactional
    @Override
    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailRegexCheck(request.getEmail());

        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }

        AppUser appUser = new AppUser(
                request.getUserName(),
                request.getImage(),
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                request.getPassword(),
                AppUserRole.valueOf("ROLE_" + request.getRole())
        );

        String token = appUserServiceJpa.signUpUser(appUser);

        if(request.getRole().equals("STATION_MANAGER")){
            stationManagerJpa.createStationManager(appUser, request.getStation());
        }

        if(request.getRole().equals("SEARCHER_IN_THE_FIELD")){
            searcherInTheFieldJpa.createSearcherInTheField(appUser);
        }

        String link = env.getProperty("custom.serverPath") + "/registration/confirm?token=" + token;
        emailSender.send(
                request.getEmail(),
                buildEmail(request.getFirstName(), link));

        return token;
    }

    public boolean emailRegexCheck(String email) {
        int atIndex = email.indexOf('@');

        return atIndex > 0 && email.indexOf('.', atIndex) > atIndex + 1;
    }


    @Transactional
    @Override
    public String confirmToken(String token) {
        ConfirmationToken confirmationToken = confirmationTokenServiceJpa
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException("email already confirmed");
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        confirmationTokenServiceJpa.setConfirmedAt(token);
        appUserServiceJpa.enableAppUser(
                confirmationToken.getAppUser().getEmail());
        return "confirmed";
    }

    private String buildEmail(String name, String link) {
        return
                "<p> Hi " + name + ",</p>" +
                "<p> Please click on the below link to activate your account: " +
                "</p><blockquote ><p > <a href=\"" + link + "\">Activate Now</a> </p></blockquote>" +
                "\n Link will expire in 15 minutes.";
    }
}
