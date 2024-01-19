package hr.fer.progi;

import hr.fer.progi.service.impl.AuthenticationServiceJpa;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class EmailRegexCheckTest {
	private AuthenticationServiceJpa authenticationServiceJpa = new AuthenticationServiceJpa(null,
			null,null,null,
			null,null,null,
			null,null,null,null);

	@Test
	void emailRegexCheck_ValidEmail_ReturnsTrue() {
		String validEmail = "test@example.com";
		boolean result = authenticationServiceJpa.emailRegexCheck(validEmail);
		assertTrue(result);
	}

	@Test
	public void testEmailRegexCheckInvalidEmail() {
		String invalidEmail = "invalidemail";
		boolean isValid = authenticationServiceJpa.emailRegexCheck(invalidEmail);
		assertFalse(isValid);
	}

	@Test
	public void testEmailRegexCheckInvalidEmail_EdgeCase() {
		String invalidEmail = "@.";
		boolean isValid = authenticationServiceJpa.emailRegexCheck(invalidEmail);
		assertFalse(isValid);
	}
}
