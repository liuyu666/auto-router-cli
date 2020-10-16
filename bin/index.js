#!/usr/bin/env node

const program = require("commander");
program.version(require("../package.json").version);
//定义命令
program
  .command("init <name>")
  //描述
  .description("init project")
  //执行语句
  .action((name) => {
    require("../lib/init")(name);
  });

program
  .command("refresh")
  //描述
  .description("refresh router")
  //执行语句
  .action(require("../lib/refresh"));
// 解析命令行里边的值 例如：ly init abc
program.parse(process.argv);
