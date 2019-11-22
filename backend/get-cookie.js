const puppeteer = require('puppeteer');

const COOKIE_NAME = 'canvas_session';

exports.getCookie = async function(username, password) {
    try {
        username = decodeURIComponent(username);
        password = decodeURIComponent(password);
        console.log(username, password);
        
        const browserPromise = puppeteer.launch();
        const browser = await browserPromise;
        const page = await browser.newPage();
        await page.goto('https://gatech.instructure.com/');
        
        await page.waitForSelector('#password', { timeout: 10000 });
        await page.type('#username', username); 
        await page.type('#password', password);
        await page.click('[type="submit"]');
        
        await page.waitForSelector('#duo_iframe', { timeout: 5000 })
        const iframe = await page.$('#duo_iframe');
        const duoFrame = await iframe.contentFrame();
        await duoFrame.waitForNavigation();
        await duoFrame.waitForSelector('#login-form [type="submit"]');
        await duoFrame.evaluate(() => {
            const pushButton = document.querySelector('#login-form [type="submit"]');
            pushButton.click();
        });
        await page.waitForSelector('#application'); // Wait for Canvas webpage to load
        const cookies = await page.cookies();
        const entry = cookies.find(c => c.name == COOKIE_NAME);
        console.log(entry)
        if (entry) return entry.value;
    } catch (err) {
        console.log(err);
        return null;
    }
    return null;
}
