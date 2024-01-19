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
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.concurrent.TimeUnit;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class RegistrationSystemTest {

    @BeforeAll
    public static void setup() {
        System.setProperty("webdriver.chrome.driver", "C:\\Program Files (x86)\\ChromeDriver\\chromedriver.exe");
    }

    @Test
    public void testRegistration_InvalidCreds(){
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        WebDriver driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("https://wildtrack-fe.onrender.com/register");

        WebElement firstNameInput = driver.findElement(By.id("register-firstName"));
        firstNameInput.sendKeys("test");

        WebElement lastNameInput = driver.findElement(By.id("register-lastName"));
        lastNameInput.sendKeys("test");

        WebElement usernameInput = driver.findElement(By.id("register-username"));
        usernameInput.sendKeys("test");

        WebElement emailInput = driver.findElement(By.id("register-email"));
        emailInput.sendKeys("test");

        WebElement passwordInput = driver.findElement(By.id("register-password"));
        passwordInput.sendKeys("test");

        WebElement tragacRadioButton = driver.findElement(By.id("register-searcher"));
        tragacRadioButton.click();

        WebElement fileInput = driver.findElement(By.id("photo-upload"));
        fileInput.sendKeys("D:\\FER-predmeti\\zoolanders\\zoolanders\\be\\src\\test\\resources\\profile.jpg");

        WebElement registerButton = driver.findElement(By.cssSelector(".register-button"));
        registerButton.click();

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WebElement errorElement = driver.findElement(By.className("register-error"));
        String actualErrorText = errorElement.getText();
        String expectedErrorText = "email not valid";

        assertEquals(expectedErrorText, actualErrorText);

        driver.quit();
    }

    @Test
    public void testRegistration_EmailAllReadyTaken(){
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

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WebElement errorElement = driver.findElement(By.className("register-error"));
        String actualErrorText = errorElement.getText();
        String expectedErrorText = "email already taken";

        assertEquals(expectedErrorText, actualErrorText);

        driver.quit();
    }

    @Test
    public void testRegistration_ValidCreds(){
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        WebDriver driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("https://wildtrack-fe.onrender.com/register");

        WebElement firstNameInput = driver.findElement(By.id("register-firstName"));
        firstNameInput.sendKeys("test");

        WebElement lastNameInput = driver.findElement(By.id("register-lastName"));
        lastNameInput.sendKeys("test");

        WebElement usernameInput = driver.findElement(By.id("register-username"));
        usernameInput.sendKeys("test");

        WebElement emailInput = driver.findElement(By.id("register-email"));
        emailInput.sendKeys("test1@test.com");

        WebElement passwordInput = driver.findElement(By.id("register-password"));
        passwordInput.sendKeys("test");

        WebElement tragacRadioButton = driver.findElement(By.id("register-searcher"));
        tragacRadioButton.click();

        WebElement fileInput = driver.findElement(By.id("photo-upload"));
        fileInput.sendKeys("D:\\FER-predmeti\\zoolanders\\zoolanders\\be\\src\\test\\resources\\profile.jpg");

        WebElement registerButton = driver.findElement(By.cssSelector(".register-button"));
        registerButton.click();

        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WebElement errorElement = driver.findElement(By.className("register-success"));
        String actualText = errorElement.getText();
        String expectedText = "Registracija uspješna!";

        assertEquals(expectedText, actualText);

        driver.quit();
    }
}
