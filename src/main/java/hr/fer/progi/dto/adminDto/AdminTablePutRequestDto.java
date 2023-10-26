package hr.fer.progi.dto.adminDto;

public class AdminTablePutRequestDto {
    private Long id;
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String role;

    public AdminTablePutRequestDto(Long id, String userName, String firstName, String lastName, String email, String role) {
        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
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
}
