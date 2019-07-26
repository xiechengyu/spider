 // const blockedTypes = new Set(['image', 'media', 'font'])
    // await page.setRequestInterception(true)
    // page.on('request', request => {
    //     const type = request.resourceType()
    //     const shouldBlock = blockedTypes.has(type)
    //     this.debug('onRequest', { type, shouldBlock })
    //     return shouldBlock ? request.abort() : request.continue()
    // })
    // 页面设置拦截 
    // await page.setRequestInterception(true); // 过滤拦截 
    // page.on("request", interceptedRequest => {
    //     // 符合匹配就 abort ，其他 continue 
    //     // 这里是操作的 url 字符串 
    //     if (
    //         interceptedRequest.url().endsWith(".png")
    //         || interceptedRequest.url().endsWith(".jpg")
    //         || ["image", "script"].indexOf(interceptedRequest.resourceType()) !== -1
    //     ) {
    //         interceptedRequest.abort();
    //     } else {
    //         interceptedRequest.continue();
    //     }
    // });