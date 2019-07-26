const getDefaultOsPath = () => {
    if (process.platform === 'win32') {
        return 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
    } else {
        return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    }
}
module.exports = getDefaultOsPath;
