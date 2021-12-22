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

describe("Car Module", () => {
  beforeAll(async () => {
    driver.navigate().to("http://localhost:3000");
    const username = driver.findElement(
      By.xpath("/html/body/div[1]/div/form/div[1]/input")
    );
    const password = driver.findElement(
      By.xpath("/html/body/div[1]/div/form/div[2]/input")
    );
    const loginButton = driver.findElement(
      By.xpath("/html/body/div[1]/div/form/button")
    );
    await username.clear();
    await password.clear();
    await username.sendKeys("admin");
    await password.sendKeys("admin");
    await loginButton.click();
    await driver.wait;

    await driver.manage().window().maximize();

    const navLinkCar = await driver.wait(
      until.elementLocated(
        By.xpath("/html/body/div/div/div[1]/div/ul/li[4]/a")
      ),
      1000
    );
    await navLinkCar.click();
  });

  afterAll(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    await driver.navigate().refresh();
  });

  test("Should show title [Danh sách xe] when entering Car screen", async () => {
    const title = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[1]/h4"
        )
      ),
      1000
    );

    expect(await title.getText()).toEqual("Danh sách xe");
  });

  test.each([
    ["Biển số"],
    ["Chủ xe"],
    ["Hãng"],
    ["Model"],
    ["Mã đăng kiểm"],
    ["VIN"],
    ["Màu xe"],
  ])(
    "Should show options when clicking [Tiêu chí tìm kiếm] select input",
    async (expected) => {
      const select = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select"
          )
        ),
        1000
      );

      expect(await select.getAttribute("innerText")).toContain(expected);
    }
  );

  test.each([
    ["", 5],
    ["005", 1],
    ["21346463213135532134656523", 0],
  ])(
    "Should show car has number plate match with search term when searching with [Biển số]",
    async (searchTerm, expected) => {
      const plateOption = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[1]"
          )
        )
      );
      const input = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[2]/input"
          )
        )
      );

      await plateOption.click();
      await input.clear();
      await input.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );

  test.each([
    ["", 5],
    ["quoc an", 1],
    ["lkjalskjdlasndlanclak", 0],
  ])(
    "Should show car has owner match with search term when searching with [Chủ xe]",
    async (searchTerm, expected) => {
      const ownerOption = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[2]"
          )
        )
      );
      const input = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[2]/input"
          )
        )
      );

      await ownerOption.click();
      await input.clear();
      await input.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );

  test.each([
    ["", 5],
    ["honda", 1],
    ["lkjalskjdlasndlanclak", 0],
  ])(
    "Should show car has branch match with search term when searching with [Hãng xe]",
    async (searchTerm, expected) => {
      const branchOption = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[3]"
          )
        )
      );
      const input = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[2]/input"
          )
        )
      );

      await branchOption.click();
      await input.clear();
      await input.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );

  test.each([
    ["", 5],
    ["vinfast", 1],
    ["lkjalskjdlasndlanclak", 0],
  ])(
    "Should show car has model match with search term when searching with [Model]",
    async (searchTerm, expected) => {
      const modelOption = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[4]"
          )
        )
      );
      const input = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[2]/input"
          )
        )
      );

      await modelOption.click();
      await input.clear();
      await input.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );

  test.each([
    ["", 5],
    ["abc123456", 1],
    ["lkjalskjdlasndlan32164565", 0],
  ])(
    "Should show car has register id match with search term when searching with [Mã đăng kiểm]",
    async (searchTerm, expected) => {
      const registerIdOption = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[5]"
          )
        )
      );
      const input = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[2]/input"
          )
        )
      );

      await registerIdOption.click();
      await input.clear();
      await input.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );

  test.each([
    ["", 5],
    ["NMH235453", 1],
    ["lkjalskjdlasndlan32164565", 0],
  ])(
    "Should show car has VIN match with search term when searching with [VIN]",
    async (searchTerm, expected) => {
      const vinOption = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[6]"
          )
        )
      );
      const input = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[2]/input"
          )
        )
      );

      await vinOption.click();
      await input.clear();
      await input.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );

  test.each([
    ["", 5],
    ["xanh", 1],
    ["lkjalskjdlasndlan32164565", 0],
  ])(
    "Should show car has color match with search term when searching with [Màu xe]",
    async (searchTerm, expected) => {
      const colorOption = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[7]"
          )
        )
      );
      const input = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[2]/input"
          )
        )
      );

      await colorOption.click();
      await input.clear();
      await input.sendKeys(searchTerm);

      const rows = await driver.findElements(By.xpath("//tbody/tr"));

      expect(rows.length).toEqual(expected);
    }
  );

  test("Should disable plate, VIN, branch, model, registerId input when showing detail modal", async () => {
    const firstRow = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[2]/table/tbody/tr[1]"
        )
      )
    );

    await firstRow.click();

    await driver.sleep(1000);

    const plateInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div[1]/div/input"
        )
      )
    );
    const vinInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div[2]/div/input"
        )
      )
    );
    const branchInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input"
        )
      )
    );
    const modelInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/input"
        )
      )
    );
    const registerIdInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          "/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[4]/div[1]/div/input"
        )
      )
    );

    expect(await plateInput.isDisplayed()).toBeTruthy();
    expect(await vinInput.isDisplayed()).toBeTruthy();
    expect(await branchInput.isDisplayed()).toBeTruthy();
    expect(await modelInput.isDisplayed()).toBeTruthy();
    expect(await registerIdInput.isDisplayed()).toBeTruthy();

    expect(await plateInput.isEnabled()).toBeFalsy();
    expect(await vinInput.isEnabled()).toBeFalsy();
    expect(await branchInput.isEnabled()).toBeFalsy();
    expect(await modelInput.isEnabled()).toBeFalsy();
    expect(await registerIdInput.isEnabled()).toBeFalsy();
  });

  test.each([
    ["", "", "", true],
    ["", "Quoc An", "23000", true],
    ["Xanh", "", "23000", true],
    ["Xanh", "Quoc An", "", true],
    ["Xanh", "Quoc An", "abcdefghikl", true],
  ])(
    "Should show alert when update information is wrong",
    async (color, owner, distance, alertDisplayExpected) => {
      const firstRow = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div/div/div[2]/div[1]/div/div/div/div/div[2]/table/tbody/tr[1]"
          )
        )
      );

      await firstRow.click();

      await driver.sleep(1000);

      const colorInput = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input"
          )
        )
      );
      const ownerInput = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[2]/div/input"
          )
        )
      );
      const distanceInput = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[4]/div[2]/div/input"
          )
        )
      );

      await colorInput.clear();
      await colorInput.sendKeys(color);

      await ownerInput.clear();
      await ownerInput.sendKeys(owner);

      await distanceInput.clear();
      await distanceInput.sendKeys(distance);

      const updateButton = await driver.wait(
        until.elementLocated(
          By.xpath("/html/body/div[2]/div/div[1]/div/div/div[3]/button[1]")
        )
      );

      await updateButton.click();

      const alert = await driver.wait(
        until.elementLocated(
          By.xpath("/html/body/div[2]/div/div[1]/div/div/div[2]/div")
        ),
        1000
      );
      expect(await alert.isDisplayed()).toEqual(alertDisplayExpected);
    }
  );
});
