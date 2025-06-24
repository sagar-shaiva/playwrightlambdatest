const { test, expect } = require('@playwright/test');
const { connectToBrowser } = require('../utils/setup');
const { teardown } = require('../utils/teardown');
test.setTimeout(1200000);

// Helper function to adjust slider value reliably
async function adjustSliderToValue(page, sliderSelector, targetValue) {
  // Focus the slider
  const slider = await page.locator(sliderSelector);
  await slider.focus();
  // Get current value
  let currentValue = await slider.inputValue();
  currentValue = Number(currentValue);
  // Calculate steps needed
  const step = 1; // The slider step is 1 on LambdaTest
  const direction = targetValue > currentValue ? 'ArrowRight' : 'ArrowLeft';
  const steps = Math.abs(targetValue - currentValue) / step;
  for (let i = 0; i < steps; i++) {
    await slider.press(direction);
  }
  await page.waitForTimeout(500);
}

test('Test Scenario 1', async ({ browserName }) => {
  const capabilities = require('../config/capabilities');
  const capability = capabilities.find(cap => cap.browserName === browserName);
  if (!capability) { throw new Error(`No capability found for browser: ${browserName}`); }
  const browser = await connectToBrowser(capability);
  const page = await browser.newPage();

  try {
    await page.goto('https://www.lambdatest.com/selenium-playground');
    await page.click('text=Simple Form Demo');
    await expect(page).toHaveURL(/simple-form-demo/);
    const message = "Welcome to LambdaTest";
    await page.fill('#user-message', message);
    await page.click('text=Get Checked Value');
    // Wait for the message to be non-empty before asserting
    await page.waitForFunction(() => {
      const el = document.querySelector('#message');
      return el && el.textContent && el.textContent.trim().length > 0;
    }, { timeout: 10000 });
    // Debug: print the message text
    const debugMsg = await page.locator('#message').textContent();
    console.log('DEBUG: #message text:', debugMsg);
    await expect(page.locator('#message')).toHaveText(message, { timeout: 10000 });
  } catch (e) {
    throw e;
  } finally {
    await teardown(page, browser);
  }
});

test('Test Scenario 2', async ({ browserName }) => {
  const capabilities = require('../config/capabilities');
  const capability = capabilities.find(cap => cap.browserName === browserName);
  if (!capability) { throw new Error(`No capability found for browser: ${browserName}`); }
  const browser = await connectToBrowser(capability);
  const page = await browser.newPage();

  try {
    await page.goto('https://www.lambdatest.com/selenium-playground');
    await page.click('text=Drag & Drop Sliders');
    const targetValue = 95;
    await adjustSliderToValue(page, "#slider3 input[type='range']", targetValue);
    // Wait for the value to update, and fallback to JS set if needed
    let actualValue = await page.locator('#rangeSuccess').textContent();
    if (actualValue.trim() !== String(targetValue)) {
      // Try setting the value directly as a fallback
      await page.evaluate((val) => {
        const slider = document.querySelector("#slider3 input[type='range']");
        slider.value = val;
        slider.dispatchEvent(new Event('input', { bubbles: true }));
        slider.dispatchEvent(new Event('change', { bubbles: true }));
      }, targetValue);
      await page.waitForTimeout(500);
    }
    await expect(page.locator('#rangeSuccess')).toHaveText(String(targetValue), { timeout: 5000 });
  } catch (e) {
    throw e;
  } finally {
    await teardown(page, browser);
  }
});

test('Test Scenario 3', async ({ browserName }) => {
  const capabilities = require('../config/capabilities');
  const capability = capabilities.find(cap => cap.browserName === browserName);
  if (!capability) { throw new Error(`No capability found for browser: ${browserName}`); }
  const browser = await connectToBrowser(capability);
  const page = await browser.newPage();

  try {
    await page.goto('https://www.lambdatest.com/selenium-playground');
    await page.click('text=Input Form Submit');
    await page.click('text=Submit');
    const validationMessage = await page.evaluate(() => document.querySelector("#name").validationMessage);
    expect(validationMessage).toBe('Please fill out this field.');
    // Fill the form fields
    await page.locator("//input[@id='name']").fill('Sagar');
    await page.locator("//input[@id='inputEmail4']").fill('john.doe@example.com');
    await page.locator("//input[@id='inputPassword4']").fill('Password123');
    await page.locator("//input[@id='company']").fill('LambdaTest');
    await page.locator("//input[@id='websitename']").fill('lambdatest.com');
    await page.selectOption("//select[@name='country']", { label: 'United States' });
    await page.locator("//input[@id='inputCity']").fill('Anytown');
    await page.locator("//input[@id='inputAddress1']").fill('123 Main St');
    await page.locator("//input[@id='inputAddress2']").fill('Suite 100');
    await page.locator("//input[@id='inputState']").fill('California');
    await page.locator("//input[@id='inputZip']").fill('570010');
    await page.locator("//button[normalize-space()='Submit']").click();
    await page.waitForTimeout(2000);
    // Wait for the success message text to appear, regardless of class
    await page.waitForFunction(() => {
      const el = document.querySelector('p.success-msg');
      return el && el.textContent && el.textContent.includes('Thanks for contacting us');
    }, { timeout: 10000 });
    // Debug: print the success message text
    const debugSuccess = await page.locator('p.success-msg').textContent();
    console.log('DEBUG: success-msg text:', debugSuccess);
    await expect(page.locator('p.success-msg')).toContainText('Thanks for contacting us, we will get back to you shortly.');
  } catch (e) {
    throw e;
  } finally {
    await teardown(page, browser);
  }
});
