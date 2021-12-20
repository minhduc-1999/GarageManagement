const webdriver = require("selenium-webdriver");
const { Logger, Type } = require("selenium-webdriver/lib/logging");
const { Options } = require('selenium-webdriver/chrome');
const options = new Options();
options.addArguments('--ignore-ssl-errors=yes');
options.addArguments('--ignore-certificate-errors');

const driver = new webdriver.Builder().forBrowser("chrome").setChromeOptions(options).build();
// ask the browser to open a page
const By = webdriver.By
// declaring the test group  This is our test case scenario that we will execute from our first test script. 
jest.setTimeout(20000)
describe("Login Module", () => {

    test("Should login successfully when enter correct username and password", async () => {
        driver
            .navigate()
            .to("http://localhost:3000")
        const username = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[1]/input`))
        const password = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[2]/input`))
        const button = driver.findElement(By.xpath(`/html/body/div[1]/div/form/button`))
        await username.clear()
        await password.clear()
        await username.sendKeys('admin')
        await password.sendKeys('admin')
        await button.click()
        await button.click()
        await driver.manage().logs().get(Type.BROWSER)
            .then(function (entries) {
                entries.forEach(function (entry) {
                    console.log('[%s] %s', entry.level.name, entry.message);
                });
            });
        const homeUrl = await driver.getCurrentUrl()
        expect(homeUrl).toEqual("http://localhost:3000/admin/user-profile")
        await driver.quit();
    });

    // test("Should login failed when enter wrong password", async () => {

    //     driver
    //         .navigate()
    //         .to("http://localhost:3000/admin/user-profile")
    //     await driver.executeScript(`window.localStorage.setItem("LoginToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmI0ZDhjZDgzYTcxMTBkMDU4OTljNiIsInJvbGUiOiJhZG1pbiIsIm5iZiI6MTY0MDAxNTExOCwiZXhwIjoxNjQyMDg4NzE4LCJpYXQiOjE2NDAwMTUxMTh9.P9oEo4W6S0nub00eTvXVhajkJW7ARPToiGZUyaN2dww")`)
    //     // const username = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[1]/input`))
    //     // const password = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[2]/input`))
    //     // const button = driver.findElement(By.xpath(`/html/body/div[1]/div/form/button`))
    //     // await username.clear()
    //     // await password.clear()
    //     // await username.sendKeys('admin')
    //     // await password.sendKeys('admin')
    //     // await button.click()
    //     await driver.sleep(5000)
    //     // const username = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[1]/input`))
    //     // const password = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[2]/input`))
    //     // const button = driver.findElement(By.xpath(`/html/body/div[1]/div/form/button`))
    //     // await username.clear()
    //     // await password.clear()
    //     // await username.sendKeys('admin')
    //     // await password.sendKeys('admin')
    //     // await button.click()
    //     // const alert = driver.findElement(By.xpath('/html/body/div[1]/div/div'))
    //     // expect(alert).not.toBeNull()
    //     // await driver.quit();
    // });
})





