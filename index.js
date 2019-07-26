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
var name
async function save2file(data) {
    // console.log(data)
    await fs.promises.writeFile(`./data111/${data.split(',')[6]}.csv`, "\uFEFF"+data, { encoding: 'utf-8' })
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
            var num = document.querySelector("#js-statistics-apply").innerText || '??'
            var price = document.querySelector("#js-imgtext > div.text-right.text-right--pay > div.js-course-price.normal-course.course-price.active > p > span").innerText || '??'
            var name = document.querySelector("#js-section-main > div > aside > div.aside-blocks > div.aside-block.block--agency > div > h4 > div.tt-cover-name > a").innerText || '??'
            var classNum = Array.from([...document.querySelectorAll('.task-part-list .task-part-item')]).length || '??'
            var title = document.querySelector("#js-imgtext > div.text-right.text-right--pay > h1 > span").innerText.replace("/","") || '??'
            var href = location.href
            return `课程网址,课程标题,报课人数,课程价格,机构名称,课程章节数\n${href},${title},${num},${price},${name},${classNum}`
        }
        return wy_categories()
    });
    await save2file(result)
    console.log('ok')
    // await browser.close();
}
const urls = require('./href111')
// console.log(urls)
Run(urls.deurls)