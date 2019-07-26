const puppeteer = require('puppeteer-core');
const fs = require('fs')

const launchOptions = require('./config/puppeteerLaunch');
const setAnonymizeUA = require('./config/setAnonymizeUA');
// const wyCategories = require('./functions/wy_categories');
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}


async function Run(urlList) {
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await setAnonymizeUA(page, {
        stripHeadless: true,
        makeWindows: true
    });

    // for (let i = 0; i < urlList.length; i++) {
    //     OpenUrl(page, urlList[i])
    // }
    asyncForEach(urlList, async item => {
        await OpenUrl(page, item)
    })



}

async function save2file(data) {
    await fs.promises.writeFile(`./data/${data.meta.title}.json`, JSON.stringify(data), { encoding: 'utf8' })
}

async function OpenUrl(page, url) {
    console.log(url)

    await page.goto(url, {
        waitUntil: 'networkidle2'
    });

    // await page.setContent(url, {
    //     waitUntil: 'networkidle2'
    // });

    const result = await page.evaluate(async () => {
        const wy_categories = function () {
            var dom = Array.from(document.querySelectorAll(".chapter .section"))
            var data = dom.map(item => {
                var num = item.document.querySelector(".f-cb span.f-fs0").innerText || '?'
                var num = item.document.querySelector("#auto-id-1560933514822 > div > span.hot.f-fs0").innerText || '?'
                var price = item.document.querySelector(".price-section .price").innerText || '?'
                var name = item.querySelector('.lectors .lname').innerText || '??'
                var classNum = Array.from([...dom.querySelectorAll('.chapter .section')]).length || '??'                
                return {
                    num,
                    price,
                    id,
                    name,
                    classNum
                }
            })
            var meta = {
                title: document.document.querySelector(".u-coursetitle .u-coursetitle_title").innerText,
                link: location.href
            }
            return { meta, data }
        }
        return wy_categories()
    });
    await save2file(result)
    console.log('ok')
    // await browser.close();
}
const urls = require('./href')
// console.log(urls)
// Run(urls.deurls)
Run(["https://study.163.com/course/introduction/1005767016.htm"])