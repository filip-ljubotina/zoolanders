package hr.fer.progi.dto.adminDto;

import hr.fer.progi.entity.AppUserRole;

public class AdminTableResponseDto {
    private Long id;
    private String userName;

    private byte[] image;
    private String firstName;
    private String lastName;
    private String email;
    private String role;

    public AdminTableResponseDto(Long id, String userName, String firstName,
                                 String lastName,
                                 String email,
                                 AppUserRole role,
                                 byte[] image) {
        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.image = image;
        this.role = role.name().replace("ROLE_", "");
    }

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public byte[] getImage() {
        return image;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }


}
