const getDefaultOsPath = require('./getDefalutOsPath')

module.exports = {
    executablePath: getDefaultOsPath(),
    userDataDir: 'test-profile-dir',
    headless: false,
    defaultViewport: {
        width: 1000,
        height: 800
    },
    // args: [
    //     '–disable-gpu',
    //     '–disable-dev-shm-usage',
    //     '–disable-setuid-sandbox',
    //     '–no-first-run',
    //     '–no-sandbox',
    //     '–no-zygote',
    //     '–single-process'
    // ]
}