/**
 * @since 20180911 17:16
 * @author vivaxy
 */
async function sleep(timeout = 300) {
  return new Promise(function(resolve) {
    setTimeout(resolve, timeout);
  });
}

beforeAll(async () => {
  await page.coverage.startJSCoverage();
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

afterAll(async function() {
  const jsCoverage = await page.coverage.stopJSCoverage();
  const pti = require('puppeteer-to-istanbul');
  pti.write([...jsCoverage]);
});

it('should_appear', async () => {
  await expect(page.title()).resolves.toMatch('should_appear');
});

it('should_disappear', async () => {
  await page.click('#should_disappear');
  await sleep();
  await expect(page.title()).resolves.toMatch('should_disappear');
});

it('should_appear_again', async () => {
  await page.click('#should_appear_again');
  await sleep();
  await expect(page.title()).resolves.toMatch('should_appear_again');
});
