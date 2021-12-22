const webdriver = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const options = new Options();
options.addArguments("--ignore-ssl-errors=yes");
options.addArguments("--ignore-certificate-errors");

const driver = new webdriver.Builder()
  .forBrowser("chrome")
  .setChromeOptions(options)
  .build();
// ask the browser to open a page
const By = webdriver.By;
const until = webdriver.until;
// declaring the test group  This is our test case scenario that we will execute from our first test script.
jest.setTimeout(20000);

describe("Customer Module", () => {
  beforeAll(async () => {
    driver.navigate().to("http://localhost:3000");
    const username = await driver.findElement(
      By.xpath("/html/body/div[1]/div/form/div[1]/input")
    );
    const password = await driver.findElement(
      By.xpath("/html/body/div[1]/div/form/div[2]/input")
    );
    const button = await driver.findElement(
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
        By.xpath("/html/body/div/div/div[1]/div/ul/li[3]/a")
      ),
      2000
    );
    await navLinkCustomer.click();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Should show title [Danh sách khách hàng] when entering Customer screen", async () => {
    const title = await driver.wait(
      until.elementLocated(
        By.xpath("/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/h4")
      ),
      1000
    );

    expect(await title.getText()).toEqual("Danh sách khách hàng");
  });

  test.each([
    ["Tên khách hàng"],
    ["Địa chỉ"],
    ["Email"],
    ["Số điện thoại"],
    ["Ngày đăng ký"],
  ])(
    "Should show options when clicking [Tiêu chí tìm kiếm] select input",
    async (expected) => {
      const select = await driver.findElement(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select"
        )
      );

      expect(await select.getAttribute("innerText")).toContain(expected);
    }
  );

  test("Should show datepicker when choosing [Ngày đăng ký] option of [Tiêu chí tìm kiếm] select input", async () => {
    const dateOption = await driver.findElement(
      By.xpath(
        "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select/option[5]"
      )
    );
    const datePicker = await driver.findElement(
      By.xpath(
        "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[3]/input"
      )
    );

    expect(await datePicker.isDisplayed()).toBeFalsy();

    await dateOption.click();
    expect(await datePicker.isDisplayed()).toBeTruthy();
  });

  test.each([
    ["", 5],
    ["duc", 1],
    ["ljalksdjlasdlkascalkdlasldas", 0],
  ])(
    "Should show customer has name match with search term when searching with [Tên khách hàng]",
    async (searchTerm, expected) => {
      const nameOption = await driver.findElement(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select/option[1]"
        )
      );
      const input = await driver.findElement(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[2]/input"
        )
      );

      await nameOption.click();
      await input.clear();
      await input.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );

  test.each([
    ["", 5],
    ["long an", 1],
    ["ljalksdjlasdlkascalkdlasldas", 0],
  ])(
    "Should show customer has address match with search term when searching with [Địa chỉ]",
    async (searchTerm, expected) => {
      const addressOption = await driver.findElement(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select/option[2]"
        )
      );
      const input = await driver.findElement(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[2]/input"
        )
      );

      await addressOption.click();
      await input.clear();
      await input.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );

  test.each([
    ["", 5],
    ["anan@gmail.com", 1],
    ["ljalksdjlasdlkascalkdlasldas", 0],
  ])(
    "Should show customer has email match with search term when searching with [Email]",
    async (searchTerm, expected) => {
      const emailOption = await driver.findElement(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select/option[3]"
        )
      );
      const input = await driver.findElement(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[2]/input"
        )
      );

      await emailOption.click();
      await input.clear();
      await input.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );

  test.each([
    ["", 5],
    ["016", 1],
    ["21346463213135532134656523", 0],
  ])(
    "Should show customer has address match with search term when searching with [Số điện thoại]",
    async (searchTerm, expected) => {
      const phoneOption = await driver.findElement(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select/option[4]"
        )
      );
      const input = await driver.findElement(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[2]/input"
        )
      );

      await phoneOption.click();
      await input.clear();
      await input.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );

  test.each([
    ["1/1/1970", 0],
    ["12/18/2021", 1],
    ["12/21/2021", 4],
    ["12/31/2040", 0],
  ])(
    "Should customer has created date match with search term when changing value of [Tìm kiếm theo ngày đăng ký] input",
    async (searchTerm, expected) => {
      const dateOption = await driver.findElement(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select/option[5]"
        )
      );
      const datePicker = await driver.findElement(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[3]/input"
        )
      );

      await dateOption.click();
      await datePicker.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );
});
