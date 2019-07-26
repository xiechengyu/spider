async function setAnonymizeUA(page, opts) {
    let ua = await page.browser().userAgent()
    // 1. 替换headless标识
    if (opts.stripHeadless) {
        ua = ua.replace('HeadlessChrome/', 'Chrome/')
    }
    // 2. 设为win10平台
    if (opts.makeWindows) {
        ua = ua.replace(/\(([^)]+)\)/, '(Windows NT 10.0; Win64; x64)')
    }
    // 3. 使用自定义函数处理ua
    if (opts.customFn) {
        ua = opts.customFn(ua)
    }
    await page.setUserAgent(ua)
}

module.exports = setAnonymizeUA