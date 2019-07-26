/**
 * @since 20180911 17:16
 * @author vivaxy
 */
beforeAll(async () => {
  await page.emulate({
    viewport: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      isLandscape: false,
    },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
  });
  await page.goto('http://localhost:4444');
});

it('should_appear', async () => {
  await expect(page.title()).resolves.toMatch('should_appear');
});

it('should_disappear', async () => {
  await page.click('#should_disappear');
  await expect(page.title()).resolves.toMatch('should_disappear');
});

// it('should_appear_again', async () => {
//   await page.click('#should_appear_again');
//   await expect(page.title()).resolves.toMatch('should_appear_again');
// });
