package hr.fer.progi;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class RegistrationSystemTest {

    @BeforeAll
    public static void setup() {
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\ChromeDriver\\chromedriver.exe");
    }

    @Test
    public void testLogin_ValidCreds(){
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        WebDriver driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("https://wildtrack-fe.onrender.com/register");

        WebElement firstNameInput = driver.findElement(By.id("register-firstName"));
        firstNameInput.sendKeys("admin");

        WebElement lastNameInput = driver.findElement(By.id("register-lastName"));
        lastNameInput.sendKeys("admin");

        WebElement usernameInput = driver.findElement(By.id("register-username"));
        usernameInput.sendKeys("admin");

        WebElement emailInput = driver.findElement(By.id("register-email"));
        emailInput.sendKeys("admin@wildtrack.com");

        WebElement passwordInput = driver.findElement(By.id("register-password"));
        passwordInput.sendKeys("admin123");

        WebElement tragacRadioButton = driver.findElement(By.id("register-searcher"));
        tragacRadioButton.click();

        WebElement fileInput = driver.findElement(By.id("photo-upload"));
        fileInput.sendKeys("D:\\FER-predmeti\\zoolanders\\zoolanders\\be\\src\\test\\resources\\profile.jpg");

        WebElement registerButton = driver.findElement(By.cssSelector(".register-button"));
        registerButton.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.of(10, ChronoUnit.SECONDS));
        By elementLocator = By.id("register-success");

        try {
            wait.until(ExpectedConditions.presenceOfElementLocated(elementLocator));
        } catch (Exception e) {
            fail("Invalid registration");
        }

        driver.quit();
    }
}
