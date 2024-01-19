package hr.fer.progi.dto.authenticationDto;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class LoginResponse {
    private String token;
    private String role;
    private String stationName;
    private byte[] image;
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
}
