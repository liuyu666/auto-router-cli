const {promisify} = require("util")

const {clone} = require("./download")
const figlet = promisify(require("figlet"))

const clear = require("clear")
const chalk = require("chalk")
const log = content => console.log(chalk.green(content))

const spawn = async (...args) => {
    const {spawn} = require('child_process');
    return new Promise(resolve => {
        const proc = spawn(...args)
        //将子进程控制台输出到父进程中显示
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}

module.exports = async name => {
    // name是目录名
    clear()
    const data = await figlet(`${name} welcome`)
    log(data);

    log("✨ 创建项目中...")
    await clone('github:liuyu666/vue-template', name)

    log("✈ 安装依赖...")
    //https://github.com/hapipal/hpal/issues/16
    const npmCmd = process.platform === 'win32' ? 'npm' : 'npm';
    await spawn(npmCmd, ["install"], {
        cwd: `./${name}`
    })

    log(chalk.green(`
    🕷 安装完成： 
    To get Start: 
    ===========================    
        cd ${name}    
        npm run serve 
    ===========================`))

    // const open = require("open")
    // open("http://localhost:8080")
    // await spawn(npmCmd, ["run","serve"], { cwd: `./${name}`})
}