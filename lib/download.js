const {promisify} = require("util")

                                //git地址 name
module.exports.clone = async function(repo,desc){
    const download = promisify(require("download-git-repo"))
    // 进程开始结束一个提示
    const ora = require("ora")
    const process = ora(`下载${repo}中...`)
    process.start()
    await download(repo,desc)
    process.succeed()
}
