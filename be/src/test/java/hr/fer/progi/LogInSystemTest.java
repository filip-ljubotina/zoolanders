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
public class LogInSystemTest {

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
        driver.get("https://wildtrack-fe.onrender.com/login");

        WebElement element = driver.findElement(By.name("email"));
        element.sendKeys("admin@wildtrack.com");
        element = driver.findElement(By.name("password"));
        element.sendKeys("admin123");
        driver.findElement(By.cssSelector(".login-button")).click();

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        String redirURL = driver.getCurrentUrl();
        boolean compRes = redirURL.contains("dashboard");

        assertEquals(compRes, true);

        driver.quit();
    }

    @Test
    public void testLogin_InvalidCreds(){
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        WebDriver driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("https://wildtrack-fe.onrender.com/login");

        WebElement element = driver.findElement(By.name("email"));
        element.sendKeys("invalid");
        element = driver.findElement(By.name("password"));
        element.sendKeys("invalid");
        driver.findElement(By.cssSelector(".login-button")).click();

        String redirURL = driver.getCurrentUrl();
        boolean compRes = redirURL.contains("dashboard");

        assertEquals(compRes, false);

        driver.quit();
    }

    @Test
    public void testLogin_emptyEmail() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-allow-origins=*");
        WebDriver driver = new ChromeDriver(options);
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("https://wildtrack-fe.onrender.com/login");

        WebElement emailElement = driver.findElement(By.name("email"));
        emailElement.sendKeys("");

        WebElement passwordElement = driver.findElement(By.name("password"));
        passwordElement.sendKeys("somePassword");

        driver.findElement(By.cssSelector(".login-button")).click();

        String redirURL = driver.getCurrentUrl();
        boolean compRes = redirURL.contains("dashboard");

        assertEquals(compRes, false);

        driver.quit();
    }
}
