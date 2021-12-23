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

    test("Repaired request modal should disappear when click button [Huy]", async () => {
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

    test.each([
        { name: "", email: "email@gmail.com", phoneNum: "0993818313", address: "Sai gon" },
        { name: "Lucas", email: "email@gmail.com", phoneNum: "", address: "Sai gon" },
    ])("Should show alert [Thiếu thông tin khách hàng.] when empty required field in customer modal", async ({ name, email, phoneNum, address }) => {
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

    test("Should show alert [Phải nhập ít nhất một phụ tùng] when empty accessory list", async () => {
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
    // { name: "Lucas", email: "email@gmail.com", phoneNum: "0993818313", address: "" }

    // { numberPlate: "99A-99999", brand: "YAMAHA", model: "YAMAHA", color: "Red", registerID: "VN-139LF", distance: 12, VIN: "1238-DK-8KD" },
    test.each([
        { owner: "Josh", numberPlate: "", brand: "YAMAHA", model: "YAMAHA", color: "Red", registerID: "ID09429423", distance: "12", VIN: "123G94JE95LRI452V" },
        { owner: "Josh", numberPlate: "99A-99999", brand: "YAMAHA", model: "YAMAHA", color: "Red", registerID: "", distance: "12", VIN: "123G94JE95LRI452V" },
        { owner: "Josh", numberPlate: "99A-99999", brand: "YAMAHA", model: "YAMAHA", color: "Red", registerID: "ID09429423", distance: "12", VIN: "" },
        { owner: "", numberPlate: "99A-99999", brand: "YAMAHA", model: "YAMAHA", color: "Red", registerID: "ID09429423", distance: "12", VIN: "123G94JE95LRI452V" },
    ])("Should show alert [Thiếu thông tin xe.] when empty required field in car modal", async ({ owner, numberPlate, brand, model, color, registerID, distance, VIN }) => {
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

    test.each([
        {
            customer: { name: "Josh", email: "email@gmail.com", phoneNum: "0991818313", address: "Sai gon" },
            car: {
                owner: "Josh",
                numberPlate: "72A-11112",
                brand: "YAMAHA",
                model: "YAMAHA",
                color: "Red",
                registerID: "ID123931",
                distance: 12,
                VIN: "1231238DK1312381D"
            },
        }
    ])("Should create repaired request successfully when enter correct information", async ({ customer, car }) => {
        await driver.sleep(1000)
        const rows = await driver.findElements(By.xpath("/html/body/div/div/div[2]/div/div/div/div/div[2]/table/tbody/tr"));
        const startRowNum = rows.length;
        // create customer
        const addRRButon = await driver.wait(
            until.elementLocated(
                By.xpath(
                    "/html/body/div[1]/div/div[2]/div/div/div/div/div[1]/div[1]/div[2]/button"
                )
            )
        );
        await addRRButon.click();

        // create customer
        const addCustomer = driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/button"))
        await addCustomer.click()
        const cusInputs = await Promise.all(
            [
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[1]/input")), 1000),
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[2]/input")), 1000),
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[3]/input")), 1000),
                driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[4]/input")), 1000),
            ]
        )
        await cusInputs[0].sendKeys(customer.name)
        await cusInputs[1].sendKeys(customer.email)
        await cusInputs[2].sendKeys(customer.phoneNum)
        await cusInputs[3].sendKeys(customer.address)
        const saveBtn = driver.findElement(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[3]/button[1]"))
        await saveBtn.click()

        // create car
        const addCar = driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[2]/button"))
        await addCar.click()
        const carInputs = await Promise.all(
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
        await carInputs[0].sendKeys(car.numberPlate)
        await carInputs[1].sendKeys(car.brand)
        await carInputs[2].sendKeys(car.model)
        await carInputs[3].sendKeys(car.color)
        await carInputs[4].sendKeys(car.owner)
        await carInputs[5].sendKeys(car.registerID)
        await carInputs[6].sendKeys(car.distance)
        await carInputs[7].sendKeys(car.VIN)
        const saveCarBtn = driver.findElement(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[3]/button[1]"))
        await saveCarBtn.click()

        // create quotation
        const addQuotationBtn = driver.findElement(By.xpath("/html/body/div[2]/div/div[1]/div/div/div[3]/button[2]"))
        await addQuotationBtn.click()
        await driver.sleep(4000)
        const input = await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[1]/div[1]/div[1]/div/input")), 2000)
        const input2 = await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[1]/div[1]/div[2]/div/input")), 2000)
        const input3 = await driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[1]/div[1]/div[3]/div/input")), 2000)
        // const quotationInputs = await Promise.all(
        //     [
        //         driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[1]/div[1]/div[1]/div/input")), 2000),
        //         driver.wait(until.elementLocated(By.xpath("/html/body/div[4]/div/div[1]/div/div/div[2]/form/div[1]/div[1]/div[2]/div/input")), 2000),
        //         driver.wait(until.elementLocated(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[1]/div[1]/div[3]/div/input")), 2000),
        //     ]
        // )
        const addAccessoryBtn = driver.findElement(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[1]/div[3]/div[4]/button"))

        await input.sendKeys("b")

        const option = await driver.wait(until.elementLocated(By.xpath('/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[1]/div[1]/div[1]/div/div/p')), 2000)
        await option.click();

        await input2.sendKeys(15000000)
        await input3.sendKeys(2)

        await addAccessoryBtn.click()

        const saveQuotationBtn = driver.findElement(By.xpath("/html/body/div[3]/div/div[1]/div/div/div[3]/button[2]"))
        await saveQuotationBtn.click()

        const saveRRBtn = await driver.wait(until.elementLocated(By.xpath("/html/body/div[2]/div/div[1]/div/div/div[3]/button[3]")), 2000)
        await saveRRBtn.click()

        await driver.wait(until.elementIsNotVisible(saveRRBtn), 2000)
        const updatedRows = await driver.findElements(By.xpath("/html/body/div/div/div[2]/div/div/div/div/div[2]/table/tbody/tr"));
        const endRowNum = updatedRows.length;
        expect(endRowNum).toEqual(startRowNum + 1)
    })
})