const webdriver = require("selenium-webdriver");
const { Logger, Type } = require("selenium-webdriver/lib/logging");
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

const log = async () => {
  await driver
    .manage()
    .logs()
    .get(Type.BROWSER)
    .then(function (entries) {
      entries.forEach(function (entry) {
        console.log("[%s] %s", entry.level.name, entry.message);
      });
    });
};

describe("Bill Module", () => {
  beforeAll(async () => {
    driver.navigate().to("http://localhost:3000");
    await driver.manage().window().maximize();
    const username = driver.findElement(
      By.xpath(`/html/body/div[1]/div/form/div[1]/input`)
    );
    const password = driver.findElement(
      By.xpath(`/html/body/div[1]/div/form/div[2]/input`)
    );
    const button = driver.findElement(
      By.xpath(`/html/body/div[1]/div/form/button`)
    );
    await username.clear();
    await password.clear();
    await username.sendKeys("admin");
    await password.sendKeys("admin");
    await button.click();
    const billButton = await driver.wait(
      until.elementLocated(
        By.xpath(`/html/body/div/div/div[1]/div/ul/li[8]/a`)
      ),
      1000
    );
    await billButton.click();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Should render [Danh sách hóa đơn] when entering bill screen", async () => {
    const screenTitle = await driver.wait(
      until.elementLocated(
        By.xpath(`/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/h4`)
      ),
      1000
    );
    expect(await screenTitle.getText()).toEqual("Danh sách hóa đơn");
  });

  test("Should render [4] search options item when clicking select input", async () => {
    const selectInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          `/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select`
        )
      ),
      1000
    );

    let items = await driver.findElements(By.xpath(`//select/option`));
    expect(items.length).toEqual(4);
  });

  test.each([
    [1, "Tên khách hàng"],
    [2, "Số điện thoại"],
    [3, "Ngày thanh toán"],
    [4, "Tổng tiền"],
  ])(
    "Should render correct [4] search options title when clicking select input",
    async (optionIndex, expected) => {
      const filterItem = await driver.wait(
        until.elementLocated(
          By.xpath(
            `/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select/option[${optionIndex}]`
          )
        ),
        1000
      );

      expect(await filterItem.getText()).toEqual(expected);
    }
  );

  test.each([
    ["Tên khách hàng", "Duc", 1],
    ["Tên khách hàng", "Messi", "Không tìm thấy hóa đơn phù hợp"],
    ["Số điện thoại", "01", 1],
    ["Số điện thoại", "03", "Không tìm thấy hóa đơn phù hợp"],
    ["Tổng tiền", "121", 1],
    ["Tổng tiền", "3", "Không tìm thấy hóa đơn phù hợp"],
    ["Ngày thanh toán", "12/18/2021", 1],
    ["Ngày thanh toán", "12/30/2021", "Không tìm thấy hóa đơn phù hợp"],
  ])(
    "Should display correct result when searching",
    async (filterType, searchTerm, expected) => {
      const selectInput = await driver.wait(
        until.elementLocated(
          By.xpath(
            `/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select`
          )
        ),
        1000
      );
      const searchField = await driver.wait(
        until.elementLocated(
          By.xpath(
            filterType != "Ngày thanh toán"
              ? `/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[2]/input`
              : `/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[3]/input`
          )
        ),
        1000
      );

      await selectInput.click();

      var filterItem;
      switch (filterType) {
        case "Tên khách hàng":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select/option[1]`
              )
            ),
            1000
          );
          break;
        case "Số điện thoại":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select/option[2]`
              )
            ),
            1000
          );
          break;
        case "Ngày thanh toán":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select/option[3]`
              )
            ),
            1000
          );
          break;
        case "Tổng tiền":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div/div/div[2]/div[1]/div/div/div/div[1]/div/div[1]/select/option[4]`
              )
            ),
            1000
          );
          break;
        default:
          break;
      }
      await filterItem.click();
      await searchField.clear();
      await searchField.sendKeys(searchTerm);

      if (isNaN(expected)) {
        const errorText = await driver.wait(
          until.elementLocated(
            By.xpath(`/html/body/div/div/div[2]/div[1]/div/div/div/div[2]/p`)
          ),
          1000
        );

        expect(await errorText.getText()).toEqual(expected);
      } else {
        const table = await driver.wait(
          until.elementLocated(
            By.xpath(
              `/html/body/div/div/div[2]/div[1]/div/div/div/div[2]/table/tbody`
            )
          ),
          1000
        );

        let items = await driver.findElements(By.xpath(`//table/tbody/tr`));
        expect(items.length).toEqual(expected);
      }
    }
  );
});
