const { getCookie } = require('./get-cookie');
(async () => {
    console.log(await getCookie())
})();
