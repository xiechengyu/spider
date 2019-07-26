const wy_categories = function () {
    var dom = Array.from(document.querySelectorAll(".chapter .section"))
    var data = dom.map(item => {
        var type = item.className.includes('live') ? 'live' : 'record'
        var id = item.querySelector('.ks').innerText
        var name = item.querySelector('.ksname').innerText
        return {
            type,
            id,
            name
        }
    })
    return data
}



module.exports = wy_categories