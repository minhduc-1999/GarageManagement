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

describe("Repaired Request Module", () => {
    afterAll(async () => {
        await driver.quit();
    });

    beforeAll(async () => {
        driver.navigate().to("http://localhost:3000");
        const username = driver.findElement(
            By.xpath("/html/body/div[1]/div/form/div[1]/input")
        );
        const password = driver.findElement(
            By.xpath("/html/body/div[1]/div/form/div[2]/input")
        );
        const button = driver.findElement(
            By.xpath("/html/body/div[1]/div/form/button")
        );
        await username.clear();
        await password.clear();
        await username.sendKeys("admin");
        await password.sendKeys("admin");
        await button.click();
        await driver.wait;

        await driver.manage().window().maximize();

        const navLinkCustomer = await driver.wait(
            until.elementLocated(
                By.xpath("/html/body/div/div/div[1]/div/ul/li[1]/a")
            ),
            2000
        );
        await navLinkCustomer.click();
    });

    beforeEach(async () => {
        await driver.navigate().refresh();
    });

    test("Should show repaired request modal when click button [Thêm]", async () => {
        const button = await driver.wait(
            until.elementLocated(
                By.xpath(
                    "/html/body/div[1]/div/div[2]/div/div/div/div/div[1]/div[1]/div[2]/button"
                )
            )
        );
        await button.click();
        const modalLabel = await driver.wait(
            until.elementLocated(
                By.xpath("/html/body/div[2]/div/div[1]/div/div/div[1]/h5/p")
            ),
            1000
        );
        expect(await modalLabel.getAttribute('innerText')).toEqual("Phiếu tiếp nhận xe")
    });

    test("Repaired request modal should disappear when click button [Thêm]", async () => {
        const button = await driver.wait(
            until.elementLocated(
                By.xpath(
                    "/html/body/div[1]/div/div[2]/div/div/div/div/div[1]/div[1]/div[2]/button"
                )
            )
        );
        await button.click();
        const modal = await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/div/div[1]/div/div")), 1000)
        const cancelBtn = driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/div/div/div[3]/button[1]"))
        await cancelBtn.click()
        expect(await modal.isDisplayed()).toBeFalsy()
    })

    test("Should show alert [Phải nhập ít nhất một phụ tùng] when empty any field in quotation modal", async () => {
        const button = await driver.wait(
            until.elementLocated(
                By.xpath(
                    "/html/body/div[1]/div/div[2]/div/div/div/div/div[1]/div[1]/div[2]/button"
                )
            )
        );
        await button.click();
        const addQuotationBtn = driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/div/div/div[3]/button[2]"))
        await addQuotationBtn.click()
        const saveBtn = driver.findElement(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[3]/button[2]"))
        await saveBtn.click()
        const alert = await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/div")))
        expect(await alert.getAttribute('innerText')).toEqual("Phải nhập ít nhất một phụ tùng.")

    });
    // { name: "Lucas", email: "email@gmail.com", phoneNum: "0993818313", address: "" },
    test.each([
        { name: "", email: "email@gmail.com", phoneNum: "0993818313", address: "Sai gon" },
        { name: "Lucas", email: "", phoneNum: "0993818313", address: "Sai gon" },
        { name: "Lucas", email: "email@gmail.com", phoneNum: "", address: "Sai gon" },
        { name: "Lucas", email: "email@gmail.com", phoneNum: "0993818313", address: "" },
    ])("Should show alert [Thiếu thông tin khách hàng.] when empty any field in customer modal", async ({ name, email, phoneNum, address }) => {
        const button = await driver.wait(
            until.elementLocated(
                By.xpath(
                    "/html/body/div[1]/div/div[2]/div/div/div/div/div[1]/div[1]/div[2]/button"
                )
            )
        );
        await button.click();
        const addCustomer = driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/button"))
        await addCustomer.click()
        const inputs = await Promise.all(
            [driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[1]/input")), 1000),
            driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[2]/input")), 1000),
            driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[3]/input")), 1000),
            driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[4]/input")), 1000),]
        )
        await inputs[0].sendKeys(name)
        await inputs[1].sendKeys(email)
        await inputs[2].sendKeys(phoneNum)
        await inputs[3].sendKeys(address)
        const saveBtn = driver.findElement(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[3]/button[1]"))
        await saveBtn.click()
        const alert = await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/div")))
        expect(await alert.getAttribute('innerText')).toEqual("Thiếu thông tin khách hàng.")
    })

    // { numberPlate: "99A-99999", brand: "YAMAHA", model: "YAMAHA", color: "Red", registerID: "VN-139LF", distance: 12, VIN: "1238-DK-8KD" },
    test.each([
        { owner: "Josh", numberPlate: "", brand: "YAMAHA", model: "YAMAHA", color: "Red", registerID: "VN-139LF", distance: "12", VIN: "1238-DK-8KD" },
        { owner: "Josh", numberPlate: "99A-99999", brand: "", model: "YAMAHA", color: "Red", registerID: "VN-139LF", distance: "12", VIN: "1238-DK-8KD" },
        { owner: "Josh", numberPlate: "99A-99999", brand: "YAMAHA", model: "", color: "Red", registerID: "VN-139LF", distance: "12", VIN: "1238-DK-8KD" },
        { owner: "Josh", numberPlate: "99A-99999", brand: "YAMAHA", model: "YAMAHA", color: "", registerID: "VN-139LF", distance: "12", VIN: "1238-DK-8KD" },
        { owner: "Josh", numberPlate: "99A-99999", brand: "YAMAHA", model: "YAMAHA", color: "Red", registerID: "", distance: "12", VIN: "1238-DK-8KD" },
        { owner: "Josh", numberPlate: "99A-99999", brand: "YAMAHA", model: "YAMAHA", color: "Red", registerID: "VN-139LF", distance: "", VIN: "1238-DK-8KD" },
        { owner: "Josh", numberPlate: "99A-99999", brand: "YAMAHA", model: "YAMAHA", color: "Red", registerID: "VN-139LF", distance: "12", VIN: "" },
        { owner: "", numberPlate: "99A-99999", brand: "YAMAHA", model: "YAMAHA", color: "Red", registerID: "VN-139LF", distance: "12", VIN: "1238-DK-8KD" },
    ])("Should show alert [Thiếu thông tin xe.] when empty any field in car modal", async ({ owner, numberPlate, brand, model, color, registerID, distance, VIN }) => {
        const button = await driver.wait(
            until.elementLocated(
                By.xpath(
                    "/html/body/div[1]/div/div[2]/div/div/div/div/div[1]/div[1]/div[2]/button"
                )
            )
        );
        await button.click();
        const addCar = driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[2]/button"))
        await addCar.click()
        const inputs = await Promise.all(
            [
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input")), 1000),
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input")), 1000),
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[3]/div[2]/div/input")), 1000),
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[4]/div[1]/div/input")), 1000),
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[4]/div[2]/div/input")), 1000),
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[5]/div[1]/div/input")), 1000),
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[5]/div[2]/div/input")), 1000),
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[6]/input")), 1000),
            ]
        )
        await inputs[0].sendKeys(numberPlate)
        await inputs[1].sendKeys(brand)
        await inputs[2].sendKeys(model)
        await inputs[3].sendKeys(color)
        await inputs[4].sendKeys(owner)
        await inputs[5].sendKeys(registerID)
        await inputs[6].sendKeys(distance)
        await inputs[7].sendKeys(VIN)
        const saveBtn = driver.findElement(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[3]/button[1]"))
        await saveBtn.click()
        const alert = await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/div")))
        expect(await alert.getAttribute('innerText')).toEqual("Thiếu thông tin xe.")
    })

})