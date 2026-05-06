const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

(async function cxorbiTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get('https://cxorbi.com');

        const title = await driver.getTitle();
        console.log("Title: " + title);
        
        if (title.toLowerCase().includes('cxorbi')) {
            console.log('Title verification passed');
        } else {
            console.log('Title verification failed');
        }

        let ctaButton = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Get Started') or contains(text(), 'Sign Up')]")), 
            10000
        );

        await driver.wait(until.elementIsVisible(ctaButton), 5000);
        
        if (await ctaButton.isEnabled()) {
            console.log('CTA Button is visible and clickable');
        }

        let image = await driver.takeScreenshot();
        fs.writeFileSync('result.png', image, 'base64');
        console.log('Execution finished and screenshot saved');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await driver.quit();
    }
})();