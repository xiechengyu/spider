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
  await fs.promises.writeFile(`./links111/${data.meta.title}.json`, JSON.stringify(data), { encoding: 'utf8' })
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
      var dom = Array.from(document.querySelectorAll("body > section.main.autoM.clearfix > div > div.market-bd.market-bd-6.course-list.course-card-list-multi-wrap.js-course-list > ul .item-img-link"))
      var links = dom.map(item => {
        return item.href
      })
      var meta = {
        title: location.href.split('=')[3],
      }
      return { meta, links }
    }
    return wy_categories()
  });
  await save2file(result)
  console.log('ok')
  // await browser.close();
}
const urls = [
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=1',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=3',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=5',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=7',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=9',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=11',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=13',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=15',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=17',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=19',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=21',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=23',
  'https://ke.qq.com/course/list?mt=1004&price_min=1&page=25',
]

Run(urls)