import { SimpleGitOptions, simpleGit, SimpleGit } from 'simple-git';
import createLogger from 'progress-estimator'
import chalk from 'chalk'
import { log } from './log'

const figlet = require('figlet')

const estimator = createLogger({
    spinner: {
        interval: 100,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    }
})

const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(), // 当前工作目录
    binary: 'git', // 指定 git 二进制文件路径
    maxConcurrentProcesses: 6, // 最大并发数量
    // trimmed: false,
 };

 const goodPrinter = async () => {
    try {
        
        const data = await figlet('lyrici')
        console.log(chalk.rgb(40, 156, 193).visible(data))
    } catch (error) {
        console.log("figlet, error", error)
    }
 }

export const clone = async (url: string, projectName: string, options: string[]) => {
    const git: SimpleGit = simpleGit(gitOptions);

    try {
        await estimator(git.clone(url, projectName, options), 'Code downloding ...', {
            estimate: 7000, // 预计 7s 完成
        });

        await goodPrinter()
        console.log(chalk.green('Code downloding success'))
        console.log(chalk.blackBright('=================================='))
        console.log(chalk.blackBright('========== Welcome lyrici ========'))
        console.log(chalk.blackBright('=================================='))

        log.info(`cd ${chalk.blueBright(projectName)}`)
        log.info(`${chalk.yellow('pnpm')} install`)
        log.info(`${chalk.yellow('pnpm')} run dev`)
    } catch (error) {
        log.error(chalk.red('Code downloding failed'))
        // console.error(error)
    }
}