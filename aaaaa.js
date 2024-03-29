var fs = require('fs');
var readline = require('readline');
var path = require('path');


//解析需要遍历的文件夹
var filePath = path.resolve('./data2');
//调用文件遍历方法
fileDisplay(filePath);
var fWriteName = './final5.csv';
var matchArr = [];
var index = 1;
function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function (filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if (isFile) {
                            var fRead = fs.createReadStream(filedir);
                            var fWrite = fs.createWriteStream(fWriteName);
                            var enableWriteIndex = true;
                            var objReadline = readline.createInterface({      // 按行读取
                                input: fRead
                            });
                            objReadline.on('line', (line) => {
                                if (enableWriteIndex) {
                                    matchArr.push(index)
                                    if (matchArr.length <= 10000) {
                                        // var tmp = line;
                                        console.log(line)
                                        // fWrite.write(tmp + os.EOL);
                                    }
                                    index++;
                                }
                            });
                            // objReadline.on('close', () => {
                            //     console.log('输出第2条'+matchArr.length)
                            //     // console.log(index)
                            // });
                        }
                    }
                })
            });
        }
    });
}