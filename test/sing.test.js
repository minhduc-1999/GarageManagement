const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder().forBrowser("firefox").build();
require('jest')
// ask the browser to open a page
const By = webdriver.By
// declaring the test group  This is our test case scenario that we will execute from our first test script. 
jest.setTimeout(10000)
beforeAll(function () {
    driver
        .navigate()
        .to("http://localhost:3000")
});

afterAll(async () => {
    await driver.quit();
});

test("autocompletes the name field", async () => {
    const username = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[1]/input`))
    const password = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[2]/input`))
    const button = driver.findElement(By.xpath(`/html/body/div[1]/div/form/button`))
    await username.clear()
    await password.clear()
    await username.sendKeys('admin')
    await password.sendKeys('admin')
    await button.click()
    await new Promise((r) => setTimeout(r, 2000));
});



