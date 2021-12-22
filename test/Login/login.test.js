const webdriver = require("selenium-webdriver");
const { Type } = require("selenium-webdriver/lib/logging");
const { Options } = require('selenium-webdriver/chrome');
const options = new Options();
options.addArguments('--ignore-ssl-errors=yes');
options.addArguments('--ignore-certificate-errors');

const driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(options).build();
// ask the browser to open a page
const By = webdriver.By
// declaring the test group  This is our test case scenario that we will execute from our first test script. 
jest.setTimeout(20000)

const until = webdriver.until

const log = async (driver) => {
    await driver.manage().logs().get(Type.BROWSER)
        .then(function (entries) {
            entries.forEach(function (entry) {
                console.log('[%s] %s', entry.level.name, entry.message);
            });
        });
}

const url = "http://localhost:3000"

describe("Login Module", () => {

    afterAll(async () => {
        await driver.quit()
    })

    afterEach(async () => {
        await driver.executeScript(`window.localStorage.clear()`)
    })

    test("Should display Login page when entering first time", async () => {
        driver
            .navigate()
            .to(url)
        const usernameLabel = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[1]/label`))
        const passLabel = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[2]/label`))
        const bg = driver.findElement(By.xpath(`/html/body/div[1]/div`))
        const username = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[1]/input`))
        const password = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[2]/input`))
        const button = driver.findElement(By.xpath(`/html/body/div[1]/div/form/button`))

        expect(await usernameLabel.getText()).toEqual("Tài khoản")
        expect(await passLabel.getText()).toEqual("Mật khẩu")
        expect(await button.getText()).toEqual("Đăng nhập")
        expect(await username.getAttribute('placeholder')).toEqual("Tên tài khoản")
        expect(await password.getAttribute('placeholder')).toEqual("Mật khẩu")
    });

    test.each([
        { username: "admin", password: "admin" }
    ])("Should login successfully when enter [$username] as username, [$password] as password", async ({ username, password }) => {
        driver
            .navigate()
            .to(url)
        const usernameInput = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[1]/input`))
        const passwordInput = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[2]/input`))
        const button = driver.findElement(By.xpath(`/html/body/div[1]/div/form/button`))
        await usernameInput.clear()
        await passwordInput.clear()
        await usernameInput.sendKeys(username)
        await passwordInput.sendKeys(password)
        await button.click()
        await driver.wait(until.elementLocated(By.xpath("/html/body/div[1]/div/div[1]/div/div/a[2]")), 1000)
        const homeUrl = await driver.getCurrentUrl()
        expect(homeUrl).toEqual("http://localhost:3000/admin/user-profile")
    });

    test.each([
        { username: "admin", password: "wrongpass", expected: "Tên tài khoản hoặc mật khẩu không đúng." },
    ])("Should login failed when enter wrong password [$password]", async ({ username, password, expected }) => {
        driver
            .navigate()
            .to(url)
        const usernameInput = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[1]/input`))
        const passwordInput = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[2]/input`))
        const buttonLogin = driver.findElement(By.xpath(`/html/body/div[1]/div/form/button`))
        await usernameInput.clear()
        await passwordInput.clear()
        await usernameInput.sendKeys(username)
        await passwordInput.sendKeys(password)
        await buttonLogin.click()
        const alert = await driver.wait(until.elementLocated(By.xpath(`/html/body/div[1]/div/div`)), 1000)
        expect(await alert.getAttribute("innerText")).toEqual(expected)
    });

    test.each([
        { username: "wrongusername", password: "admin", expected: "Tên tài khoản hoặc mật khẩu không đúng." },
    ])("Should login fail and show alert with text [$expected] when enter [$username] as username", async ({ username, password, expected }) => {
        driver
            .navigate()
            .to(url)
        const usernameInput = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[1]/input`))
        const passwordInput = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[2]/input`))
        const buttonLogin = driver.findElement(By.xpath(`/html/body/div[1]/div/form/button`))
        await usernameInput.clear()
        await passwordInput.clear()
        await usernameInput.sendKeys(username)
        await passwordInput.sendKeys(password)
        await buttonLogin.click()
        const alert = await driver.wait(until.elementLocated(By.xpath(`/html/body/div[1]/div/div`)), 1000)
        expect(await alert.getAttribute("innerText")).toEqual(expected)
    });

    test.each([
        { username: "userfdaklfjlk2jkfvmffdk1kljkl3k2l131321fs1", password: "admin", expected: "Tên tài khoản không hợp lệ" },
        { username: "us", password: "admin", expected: "Tên tài khoản không hợp lệ" },
        { username: "1$", password: "admin", expected: "Tên tài khoản không hợp lệ" },
    ])("Should show alert with text [$expected] when enter [$username] as username", async ({ username, password, expected }) => {
        driver
            .navigate()
            .to(url)
        const usernameInput = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[1]/input`))
        const passwordInput = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[2]/input`))
        const button = driver.findElement(By.xpath(`/html/body/div[1]/div/form/button`))
        await usernameInput.clear()
        await passwordInput.clear()
        await usernameInput.sendKeys(username)
        await passwordInput.sendKeys(password)
        await button.click()
        const alert = await driver.wait(until.elementLocated(By.xpath(`/html/body/div[1]/div/div`)), 1000)
        expect(await alert.getAttribute("innerText")).toEqual(expected)
    });
})





