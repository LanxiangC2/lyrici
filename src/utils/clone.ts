import { SimpleGitOptions, simpleGit, SimpleGit } from 'simple-git';
import createLogger from 'progress-estimator'
import chalk from 'chalk'

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

export const clone = async (url: string, projectName: string, options: string[]) => {
    const git: SimpleGit = simpleGit(gitOptions);

    try {
        await estimator(git.clone(url, projectName, options), 'Code downloding ...', {
            estimate: 7000, // 预计 7s 完成
        });

        console.log(chalk.green('Code downloding success'))
        console.log(chalk.blackBright('=================================='))
        console.log(chalk.blackBright('========== Welcome lyrici ========'))
        console.log(chalk.blackBright('=================================='))
    } catch (error) {
        console.log(chalk.red('Code downloding failed'))
    }
}