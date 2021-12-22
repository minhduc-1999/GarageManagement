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

describe("Employee Module", () => {
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
    const employeeButton = await driver.wait(
      until.elementLocated(
        By.xpath(`/html/body/div/div/div[1]/div/ul/li[7]/a`)
      ),
      1000
    );
    await employeeButton.click();
  });

  beforeEach(async () => {
    await driver.navigate().refresh();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Should render [Danh sách nhân viên] when entering employee screen", async () => {
    const screenTitle = await driver.wait(
      until.elementLocated(
        By.xpath(
          `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[1]/div[1]/h4`
        )
      ),
      1000
    );
    expect(await screenTitle.getText()).toEqual("Danh sách nhân viên");
  });

  test("Should render [5] search options item when clicking select input", async () => {
    const selectInput = await driver.wait(
      until.elementLocated(
        By.xpath(
          `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select`
        )
      ),
      1000
    );

    let items = await driver.findElements(By.xpath(`//select/option`));
    expect(items.length).toEqual(5);
  });

  test.each([
    [1, "Họ và Tên"],
    [2, "Ngày sinh"],
    [3, "Địa chỉ"],
    [4, "Email"],
    [5, "Số điện thoại"],
  ])(
    "Should render correct [5] search options title when clicking select input",
    async (optionIndex, expected) => {
      const filterItem = await driver.wait(
        until.elementLocated(
          By.xpath(
            `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[${optionIndex}]`
          )
        ),
        1000
      );

      expect(await filterItem.getText()).toEqual(expected);
    }
  );

  test.each([
    ["Họ và Tên", "Thanh", 1],
    ["Họ và Tên", "Messi", "Không tìm thấy nhân viên phù hợp"],
    ["Ngày sinh", "02/01/2000", 1],
    ["Ngày sinh", "12/30/2021", "Không tìm thấy nhân viên phù hợp"],
    ["Địa chỉ", "QN", 1],
    ["Địa chỉ", "Ha Noi", "Không tìm thấy nhân viên phù hợp"],
    ["Email", "binh", 1],
    ["Email", "Messi", "Không tìm thấy nhân viên phù hợp"],
    ["Số điện thoại", "034", 2],
    ["Số điện thoại", "01", "Không tìm thấy nhân viên phù hợp"],
  ])(
    "Should display correct result when searching",
    async (filterType, searchTerm, expected) => {
      const selectInput = await driver.wait(
        until.elementLocated(
          By.xpath(
            `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select`
          )
        ),
        1000
      );
      const searchField = await driver.wait(
        until.elementLocated(
          By.xpath(
            filterType != "Ngày sinh"
              ? `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[2]/input`
              : `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[3]/input`
          )
        ),
        1000
      );

      await selectInput.click();

      var filterItem;
      switch (filterType) {
        case "Họ và Tên":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[1]`
              )
            ),
            1000
          );
          break;
        case "Ngày sinh":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[2]`
              )
            ),
            1000
          );
          break;
        case "Địa chỉ":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[3]`
              )
            ),
            1000
          );
          break;
        case "Email":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[4]`
              )
            ),
            1000
          );
          break;
        case "Số điện thoại":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[2]/div[1]/select/option[5]`
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
            By.xpath(
              `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[2]/p`
            )
          ),
          1000
        );

        expect(await errorText.getText()).toEqual(expected);
      } else {
        const table = await driver.wait(
          until.elementLocated(
            By.xpath(
              `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[2]/table/tbody`
            )
          ),
          1000
        );

        let items = await driver.findElements(By.xpath(`//table/tbody/tr`));
        expect(items.length).toEqual(expected);
      }
    }
  );

  test.each([
    ["", "", "", "", "", "", "", "", "Tạo tài khoản không thành công."],
    [
      "",
      "thanhbinhdeptrai",
      "Võ Thanh Bình",
      "admin",
      "04/22/2000",
      "thanhbinh@gmail.com",
      "0987789987",
      "Quảng Nam",
      "Tạo tài khoản không thành công.",
    ],
    [
      "thanhbinhdeptrai",
      "",
      "Võ Thanh Bình",
      "admin",
      "04/22/2000",
      "thanhbinh@gmail.com",
      "0987789987",
      "Quảng Nam",
      "Tạo tài khoản không thành công.",
    ],
    [
      "thanhbinhdeptrai",
      "thanhbinhdeptrai",
      "",
      "admin",
      "04/22/2000",
      "thanhbinh@gmail.com",
      "0987789987",
      "Quảng Nam",
      "Tạo tài khoản không thành công.",
    ],
    [
      "thanhbinhdeptrai",
      "thanhbinhdeptrai",
      "Võ Thanh Bình",
      "",
      "04/22/2000",
      "thanhbinh@gmail.com",
      "0987789987",
      "Quảng Nam",
      "Tạo tài khoản không thành công.",
    ],
    [
      "thanhbinhdeptrai",
      "thanhbinhdeptrai",
      "Võ Thanh Bình",
      "admin",
      "",
      "thanhbinh@gmail.com",
      "0987789987",
      "Quảng Nam",
      "Tạo tài khoản không thành công.",
    ],

    [
      "thanhbinhdeptrai",
      "thanhbinhdeptrai",
      "Võ Thanh Bình",
      "admin",
      "04/22/2000",
      "thanhbinh@gmail.com",
      "",
      "Quảng Nam",
      "Tạo tài khoản không thành công.",
    ],
    [
      "thanhbinhdeptrai",
      "thanhbinhdeptrai",
      "Võ Thanh Bình",
      "admin",
      "04/22/2000",
      "thanhbinh@gmail.com",
      "0987789987",
      "",
      "Tạo tài khoản không thành công.",
    ],
    [
      "thanhbinhdeptrai",
      "thanhbinhdeptraiBinh123@",
      "Vo Thanh Binh",
      "admin",
      "04/22/2000",
      "",
      "0987789987",
      "Quang Nam",
      "Tạo tài khoản không thành công.",
    ],
    [
      "binhuit",
      "binhuitBinh123@",
      "Binh Thanh Vo",
      "admin",
      "04/22/2000",
      "lagger@gmail.com",
      "0987789000",
      "Quang Nam",
      "Tạo thành công",
    ],
  ])(
    "Should show correct alert when add new employee",
    async (
      username,
      password,
      fullName,
      role,
      dateOB,
      email,
      phoneNumber,
      address,
      expected
    ) => {
      const addNewEmployeeButton = await driver.wait(
        until.elementLocated(
          By.xpath(
            `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[1]/div[1]/div[3]/button`
          )
        ),
        1000
      );

      await addNewEmployeeButton.click();

      const confirmAddNewEmployeeButton = await driver.wait(
        until.elementLocated(
          By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[3]/button[1]`)
        ),
        1000
      );

      const usernameField = await driver.findElement(
        By.xpath(
          `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div[1]/div/input`
        )
      );
      const passwordField = await driver.findElement(
        By.xpath(
          `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[1]/div[2]/div/input`
        )
      );
      const fullNameField = await driver.findElement(
        By.xpath(
          `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[1]/div/input`
        )
      );
      const roleField = await driver.findElement(
        By.xpath(
          `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/select`
        )
      );
      const dateOBField = await driver.findElement(
        By.xpath(
          `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[1]/div/input`
        )
      );
      const emailField = await driver.findElement(
        By.xpath(
          `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[3]/div[2]/div/input`
        )
      );
      const phoneNumberField = await driver.findElement(
        By.xpath(
          `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[4]/div[1]/div/input`
        )
      );
      const addressField = await driver.findElement(
        By.xpath(
          `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[4]/div[2]/div/input`
        )
      );

      roleField.click();

      var filterItem;
      switch (role) {
        case "admin":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/select/option[2]`
              )
            ),
            1000
          );
          break;
        case "quản lý":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/select/option[3]`
              )
            ),
            1000
          );
          break;
        case "nhân viên tiếp nhận":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/select/option[4]`
              )
            ),
            1000
          );
          break;
        case "thủ kho":
          filterItem = await driver.wait(
            until.elementLocated(
              By.xpath(
                `/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[2]/div[2]/div/select/option[5]`
              )
            ),
            1000
          );
          break;
        default:
          break;
      }
      if (filterItem != null) {
        await filterItem.click();
      }

      await usernameField.clear();
      await passwordField.clear();
      await fullNameField.clear();
      await dateOBField.clear();
      await emailField.clear();
      await phoneNumberField.clear();
      await addressField.clear();

      await usernameField.sendKeys(username);
      await passwordField.sendKeys(password);
      await fullNameField.sendKeys(fullName);
      await dateOBField.sendKeys(dateOB);
      await emailField.sendKeys(email);
      await phoneNumberField.sendKeys(phoneNumber);
      await addressField.sendKeys(address);

      await confirmAddNewEmployeeButton.click();

      if (expected != "Tạo thành công") {
        const alert = await driver.wait(
          until.elementLocated(
            By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/form/div[5]`)
          ),
          1000
        );

        expect(await alert.getAttribute("innerText")).toEqual(expected);
      } else {
        const modal = await driver.wait(
          until.elementIsNotVisible(
            await driver.findElement(
              By.xpath(`/html/body/div[2]/div/div[1]/div/div`)
            )
          ),
          2000
        );
      }
    }
  );

  test.each([
    ["binhdeptraiBinh123@", "Đổi mật khẩu thành công"],
    ["", "Mật khẩu mới không được để trống"],
  ])(
    "Should show correct alert when change user's password",
    async (password, expected) => {
      const userItem = await driver.wait(
        until.elementLocated(
          By.xpath(
            `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[2]/table/tbody/tr[6]`
          )
        )
      );

      await userItem.click();

      const passwordField = await driver.wait(
        until.elementLocated(
          By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[1]/form/input`)
        )
      );

      await passwordField.clear();

      await passwordField.sendKeys(password);

      const changePasswordButton = driver.findElement(
        By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button[2]`)
      );

      await changePasswordButton.click();

      if (expected != "Đổi mật khẩu thành công") {
        const alert = await driver.wait(
          until.elementLocated(
            By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[1]/div`)
          )
        );

        expect(await alert.getAttribute("innerText")).toEqual(expected);
      } else {
        const modal = await driver.wait(
          until.elementIsNotVisible(
            await driver.findElement(
              By.xpath(`/html/body/div[2]/div/div[1]/div/div`)
            )
          ),
          2000
        );
      }
    }
  );

  test("Should display correct number of users on table when delete an user", async () => {
    const userItem = await driver.wait(
      until.elementLocated(
        By.xpath(
          `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[2]/table/tbody/tr[6]`
        )
      )
    );

    let items = await driver.findElements(By.xpath(`//table/tbody/tr`));

    await userItem.click();

    const deleteUserButton = await driver.wait(
      until.elementLocated(
        By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button[1]`)
      )
    );

    await deleteUserButton.click();

    const confirmDeleteUserButton = await driver.wait(
      until.elementLocated(
        By.xpath(`/html/body/div[3]/div/div[1]/div/div/div[2]/button[1]`)
      )
    );

    await confirmDeleteUserButton.click();

    const table = await driver.wait(
      until.elementLocated(
        By.xpath(
          `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[2]/table/tbody`
        )
      ),
      1000
    );

    let updateItems = await driver.findElements(By.xpath(`//table/tbody/tr`));
    expect(updateItems.length).toEqual(items.length - 1);
  });

  test("Can't delete current user", async () => {
    const userItem = await driver.wait(
      until.elementLocated(
        By.xpath(
          `/html/body/div/div/div[2]/div[1]/div/div/div/div/div[2]/table/tbody/tr[1]`
        )
      )
    );

    await userItem.click();

    const deleteUserButton = await driver.wait(
      until.elementLocated(
        By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[2]/button[1]`)
      )
    );

    await deleteUserButton.click();

    const alert = await driver.wait(
      until.elementLocated(
        By.xpath(`/html/body/div[2]/div/div[1]/div/div/div[1]/div`)
      )
    );

    expect(await alert.getAttribute("innerText")).toEqual(
      "Bạn không thể xóa chính mình"
    );
  });
});
