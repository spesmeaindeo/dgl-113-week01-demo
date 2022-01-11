import path from "path";

describe("index.html", () => {
  const dialogHandler2 = jest.fn(dialog => dialog.dismiss());

  beforeAll(async () => {
    const URL = `file:///${path.resolve(__dirname, "./index.html")}`;
    page.on("dialog", dialogHandler2);
    await page.goto(URL, {
      waitUntil: "networkidle2"
    });
  });

  it("should display a dialog", () => {
    expect(dialogHandler2).toHaveBeenCalled();
  });

  it('should have message "Hello!"', () => {
    const [firstCall] = dialogHandler2.mock.calls;
    const [dialog] = firstCall;
    expect(dialog.message()).toEqual("Hello!");
  });
});
