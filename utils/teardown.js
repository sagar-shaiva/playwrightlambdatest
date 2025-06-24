const teardown = async (page, browser) => {
    if (page && !page.isClosed()) {
      await page.close();
    }
    if (browser) {
      await browser.close();
    }
  };
  
  module.exports = { teardown };
