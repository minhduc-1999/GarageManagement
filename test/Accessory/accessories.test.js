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

describe("Accessories Module", () => {

    beforeAll(async ()=>{
        driver
        .navigate()
        .to("http://localhost:3000")
    await driver.manage().window().maximize();

    //login to application
    const username = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[1]/input`))
    const password = driver.findElement(By.xpath(`/html/body/div[1]/div/form/div[2]/input`))
    const button = driver.findElement(By.xpath(`/html/body/div[1]/div/form/button`))
    await username.clear()
    await password.clear()
    await username.sendKeys('admin')
    await password.sendKeys('admin')
    await button.click()
    await driver.manage().logs().get(Type.BROWSER)
        .then(function (entries) {
            entries.forEach(function (entry) {
                console.log('[%s] %s', entry.level.name, entry.message);
            });
        });
    });

    afterAll(async () => {
        await driver.quit();
      });

    test("Should Accessories screen display correctly", async () => {

        await driver.getCurrentUrl()

        //go to accessory screen 
        const accessoriesbtn = driver.findElement(By.xpath(`/html/body/div/div/div[1]/div/ul/li[5]/a/p`))
        await accessoriesbtn.click()

        //find materials of screen
        const importButton = driver.findElement(By.xpath(`/html/body/div/div/div[2]/div[1]/div/div/div/div/div/div[1]/div/div/button`))
        const title = driver.findElement(By.xpath(`/html/body/div/div/div[2]/div[1]/div/div/div/div/div/div[1]/div/h4`)) 

        const importButtonText = await importButton.getText();
        const titleText = await title.getAttribute("innerText")


        expect(importButtonText).toEqual("Nhập phụ tùng")
        expect(titleText).toEqual("Danh sách phụ tùng")
    });

    test("Should import button work correctly", async () => {

        //find materials of screen
        const importButton = driver.findElement(By.xpath(`/html/body/div/div/div[2]/div[1]/div/div/div/div/div/div[1]/div/div/button`))
        await importButton.click();
        const importModal = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div`))
        expect(importModal.isDisplayed());
    });

    test("Should accessories import without listed", async ()=> {
        await driver.sleep(1000);
        const importButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[3]/button[2]`));
        await importButton.click();
        await driver.sleep(500);
        const alert = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div/div/div`));
        expect(alert.isDisplayed);
        const closeAlert = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div/div/div/button`));
        await closeAlert.click();
    })

    test("Should add type button work correctly", async () => {
        //find materials of screen
        await driver.sleep(1000);
        const addTypeBtn = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[2]/div[2]/div[2]/button`));
        await addTypeBtn.click();
        await driver.sleep(200);
        const addTypeModal = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div`));
        expect(addTypeModal.isDisplayed());
        await driver.sleep(200);
    });

    test ("Should type can add duplicated", async ()=>{
        const typeInput = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[2]/form/div/input`));
        await typeInput.sendKeys("Nắp ca bô");
        const addBtn = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[3]/button[1]`));
        await addBtn.click();
        await driver.sleep(500);
        const duplicatedAlert = await driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[3]`));
        expect(duplicatedAlert.isDisplayed);
        const closeAlert =await driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[3]/button`));
        await closeAlert.click();
    })

    test ("Should type add correctly", async ()=>{
        const typeList = await driver.findElements(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[2]/div[2]/div[1]/div/select/option`));
        const expectLength = await (typeList.length+1);
        const typeInput = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[2]/form/div/input`));
        await typeInput.clear();
        await typeInput.sendKeys("Đạn pháo xe tăng");
        const addBtn = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[3]/button[1]`));
        await addBtn.click();
        await driver.sleep(500);
        const updatedTypeList = await driver.findElements(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[2]/div[2]/div[1]/div/select/option`));
        expect(updatedTypeList.length).toEqual(expectLength);
    })

    test("Should add provider button work correctly", async () => {
        //find materials of screen
        await driver.sleep(200);
        const addProviderBtn = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[4]/div/div/div[2]/button`));
        await addProviderBtn.click();
        await driver.sleep(200);
        const addProviderModal = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div`));
        expect(addProviderModal.isDisplayed());
        await driver.sleep(200);
    });

    test ("Should provider can add duplicated", async ()=>{
        const nameInput = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[1]/input`));
        const phoneNumberInput = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[2]/input`));
        const addressInput = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[3]/input`));

        await nameInput.sendKeys("Huyndai");
        await phoneNumberInput.sendKeys("0999999999");
        await addressInput.sendKeys("Korean");

        const addBtn = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[3]/button[1]`));
        await addBtn.click();
        await driver.sleep(500);
        const duplicatedAlert = await driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[3]`));
        expect(duplicatedAlert.isDisplayed);
        const closeAlert =await driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[3]/button`));
        await closeAlert.click();
    })

    test ("Should provider add correctly", async ()=>{
        const providerList = await driver.findElements(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[4]/div/div/div[1]/div/select/option`));
        const expectLength = await (providerList.length+1);
        const nameInput = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[1]/input`));
        const phoneNumberInput = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[2]/input`));
        const addressInput = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[2]/form/div[3]/input`));

        await nameInput.clear();
        await nameInput.sendKeys("Toyota");
        await phoneNumberInput.clear();
        await phoneNumberInput.sendKeys("0999999999");
        await addressInput.clear();
        await addressInput.sendKeys("Japan");        

        const addBtn = driver.findElement(By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[3]/button[1]`));
        await addBtn.click();
        await driver.sleep(500);
        const updatedProviderList = await driver.findElements(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[4]/div/div/div[1]/div/select/option`));
        expect(updatedProviderList.length).toEqual(expectLength);
    })
    

    test("Should accessory being listed without selecting provider field", async () => {
 

        const listedButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button`));
 
        const accessoryField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div/div/input`));
        const valueInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input`));
        const quantityInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/input`));
        const expiredDateField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[4]/div/input`));
        const unitField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input`));
        const descriptionField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[5]/div/textarea[1]`));
        
        await accessoryField.clear();
        await accessoryField.sendKeys('Bánh xe');

        await valueInput.clear();
        await valueInput.sendKeys('2000000');

        await quantityInput.clear();
        await quantityInput.sendKeys('5');

        await expiredDateField.clear();
        await expiredDateField.sendKeys('17/12/2021');
        
        await unitField.clear();
        await unitField.sendKeys('chiếc');

        await descriptionField.clear();
        await descriptionField.sendKeys('');
        
        await listedButton.click();

        //find materials of screen
        const warning = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]`));
        expect(warning.isDisplayed());
        const hideButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]/button`));
        await driver.sleep(200);
        await hideButton.click();
    });

    test("Should accessory being listed without selecting accessoryType field", async () => {
        const listedButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button`));
 
        const accessoryField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div/div/input`));
        const valueInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input`));
        const quantityInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/input`));
        const expiredDateField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[4]/div/input`));
        const unitField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input`));
        const descriptionField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[5]/div/textarea[1]`));
        const providerField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[4]/div/div/div[1]/div/select`))

        await accessoryField.sendKeys('Bánh xe');
        await valueInput.sendKeys('2000000');
        await quantityInput.sendKeys('5');
        await expiredDateField.sendKeys('17/12/2021');
        await unitField.sendKeys('chiếc');
        await providerField.sendKeys('Vin');
        await descriptionField.sendKeys('');
        await listedButton.click();
        //find materials of screen
        const warning = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]`));
        expect(warning.isDisplayed());
    });

    test("Should accessory being listed without filling accessory name field", async () => {

        //find materials of screen
        const listedButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button`));

        const accessoryField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div/div/input`));
        const valueInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input`));
        const quantityInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/input`));
        const expiredDateField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[4]/div/input`));
        const unitField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input`));
        const descriptionField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[5]/div/textarea[1]`));

        await accessoryField.clear();
        
        await valueInput.clear();
        await valueInput.sendKeys('2000000');

        await quantityInput.clear();
        await quantityInput.sendKeys('5');

        await expiredDateField.clear();
        await expiredDateField.sendKeys('17/12/2021');

        await unitField.clear();
        await unitField.sendKeys('chiếc');

        
        await descriptionField.clear();
        await descriptionField.sendKeys('');

        await accessoryField.clear();
        await listedButton.click();

        const warning = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]`));
        expect(warning.isDisplayed());

        const hideButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]/button`));
        await driver.sleep(200);
        await hideButton.click();
    });

    test("Should accessory being listed without filling value input field", async () => {

 
        const listedButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button`));
 
        const accessoryField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div/div/input`));
        const valueInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input`));
        const quantityInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/input`));
        const expiredDateField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[4]/div/input`));
        const unitField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input`));
        const descriptionField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[5]/div/textarea[1]`));

        await accessoryField.clear();
        await accessoryField.sendKeys('Bánh xe');

        await quantityInput.clear();
        await quantityInput.sendKeys('5');

        await expiredDateField.clear(); 
        await expiredDateField.sendKeys('17/12/2021');

        await unitField.clear();
        await unitField.sendKeys('chiếc');

        await descriptionField.clear();
        await descriptionField.sendKeys('');

        await valueInput.clear();
        await listedButton.click();
        
        //find materials of screen
        const warning = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]`));
        expect(warning.isDisplayed());

        const hideButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]/button`));
        await driver.sleep(200);
        await hideButton.click();
    });

    test("Should accessory being listed without filling quantity input field", async () => {
 
        const listedButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button`));
 
        const accessoryField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div/div/input`));
        const valueInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input`));
        const quantityInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/input`));
        const expiredDateField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[4]/div/input`));
        const unitField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input`));
        const descriptionField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[5]/div/textarea[1]`));

        await accessoryField.clear();
        await accessoryField.sendKeys('Bánh xe');

        await valueInput.clear();
        await valueInput.sendKeys('2000000');
        
        await expiredDateField.clear();
        await expiredDateField.sendKeys('17/12/2021');
        
        await unitField.clear();
        await unitField.sendKeys('chiếc');
        
        await descriptionField.clear();
        await descriptionField.sendKeys('');
        await quantityInput.clear();

        await listedButton.click();
        //find materials of screen
        const warning = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]`));
        expect(warning.isDisplayed());

        const hideButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]/button`));
        await driver.sleep(200);
        await hideButton.click();
    });

    test("Should accessory being listed without filling expiredDate input field", async () => {
        

        const listedButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button`));
 
        const accessoryField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div/div/input`));
        const valueInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input`));
        const quantityInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/input`));
        const expiredDateField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[4]/div/input`));
        const unitField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input`));
        const descriptionField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[5]/div/textarea[1]`));

        await accessoryField.clear();
        await accessoryField.sendKeys('Bánh xe');
        
        await valueInput.clear();
        await valueInput.sendKeys('2000000');
        
        await quantityInput.clear();
        await quantityInput.sendKeys('5');

        await unitField.clear();
        await unitField.sendKeys('chiếc');
        
        await descriptionField.clear();
        await descriptionField.sendKeys('');
        await expiredDateField.clear();

        await listedButton.click();
        //find materials of screen
        const warning = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]`));
        expect(warning.isDisplayed());

        const hideButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]/button`));
        await driver.sleep(200);
        await hideButton.click();
    });

    test("Should accessory being listed without filling unit field", async () => {
 
        const listedButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button`));
 
        const accessoryField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div/div/input`));
        const valueInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input`));
        const quantityInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/input`));
        const expiredDateField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[4]/div/input`));
        const unitField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input`));
        const descriptionField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[5]/div/textarea[1]`));
        

        await accessoryField.clear();
        await accessoryField.sendKeys('Bánh xe');
        
        await valueInput.clear();
        await valueInput.sendKeys('2000000');
       
        await quantityInput.clear();
        await quantityInput.sendKeys('5');
        
        await expiredDateField.clear();
        await expiredDateField.sendKeys('17/12/2021');
        
        await descriptionField.clear();
        await descriptionField.sendKeys('');
        await unitField.clear();

        await listedButton.click();
        //find materials of screen
        const warning = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]`));
        expect(warning.isDisplayed());

        const hideButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]/button`));
        await driver.sleep(200);
        await hideButton.click();
    });


    test("Should cash being calculated correctly", async () => {
        //find materials of screen
        const valueInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input`));
        const quantityInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/input`));
        await valueInput.clear();
        await valueInput.sendKeys('2000000');
        await quantityInput.clear();
        await quantityInput.sendKeys('5');
        const cashInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[3]/div/input`));
        const cash = await cashInput.getAttribute("value");
        expect(cash).toEqual('10000000');
    });
    

    test ("Should accessories being imported correctly", async () =>{
        
        const cancelButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[3]/button[1]`));
        await cancelButton.click();
        const importButton = driver.findElement(By.xpath(`/html/body/div/div/div[2]/div[1]/div/div/div/div/div/div[1]/div/div/button`))
        await importButton.click();
 
        const rows = await driver.findElements(By.xpath("/html/body/div/div/div[2]/div[1]/div/div/div/div/div/div[2]/table/tbody/tr"));
        const expected = rows.length +1;

        const accessoryField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div/div/input`));
        const valueInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input`));
        const quantityInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/input`));
        const expiredDateField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[4]/div/input`));
        const unitField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input`));
        const accessoryTypeField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[2]/div[2]/div[1]/div/select`));
        const providerField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[4]/div/div/div[1]/div/select`));
        const descriptionField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[5]/div/textarea[1]`));

        await accessoryField.clear();
        await accessoryField.sendKeys('Kính chiếu hậu tích hợp AR');
        
        await valueInput.clear();
        await valueInput.sendKeys('4800000');
        
        await quantityInput.clear();
        await quantityInput.sendKeys('10');
        
        await expiredDateField.clear();
        await expiredDateField.sendKeys('17/12/2021');

        await providerField.sendKeys('Vin');
        await accessoryTypeField.sendKeys('Kính chiếu hậu');
        
        await unitField.clear();
        await unitField.sendKeys('cặp');
        
        await descriptionField.clear();
        await descriptionField.sendKeys('Hỗ trợ cảnh báo và đỗ xe thông minh');

        const listedButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button`));
        await listedButton.click();

        await driver.sleep(1000);

        const importToStorage = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[3]/button[2]`))
        await importToStorage.click();

        await driver.sleep(1000);
        const updatedRows = await driver.findElements(By.xpath("/html/body/div/div/div[2]/div[1]/div/div/div/div/div/div[2]/table/tbody/tr"));
  
        expect(updatedRows.length).toEqual(expected);
    })

    test("Should accessories being listed correctly", async () => {   
        
        const importButton = driver.findElement(By.xpath(`/html/body/div/div/div[2]/div[1]/div/div/div/div/div/div[1]/div/div/button`))
        await importButton.click();
 
        const accessoryField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div/div/input`));
        const valueInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input`));
        const quantityInput = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/input`));
        const expiredDateField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[4]/div/input`));
        const unitField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input`));
        const accessoryTypeField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[2]/div[2]/div[1]/div/select`));
        const providerField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[4]/div/div/div[1]/div/select`));
        const descriptionField = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[5]/div/textarea[1]`));

        await accessoryField.clear();
        await accessoryField.sendKeys('Bánh xe');
        
        await valueInput.clear();
        await valueInput.sendKeys('2000000');
        
        await quantityInput.clear();
        await quantityInput.sendKeys('5');
        
        await expiredDateField.clear();
        await expiredDateField.sendKeys('17/12/2021');

        await providerField.sendKeys('Vin');
        await accessoryTypeField.sendKeys('Kính chiếu hậu');
        
        await unitField.clear();
        await unitField.sendKeys('chiếc');
        
        await descriptionField.clear();
        await descriptionField.sendKeys('mô tả bánh xe');

        const listedButton = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button`));
        await listedButton.click();

         const listedAccessory = driver.findElement(By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/div[2]/div/table/tbody/tr[0]`));
         expect(listedAccessory.isDisplayed());
    });

})





