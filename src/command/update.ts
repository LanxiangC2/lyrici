import chalk from "chalk";
import createLogger from 'progress-estimator'
import ora from "ora";
import process from 'child_process'

const estimator = ora({
    text: 'lyrici is updating...',
    spinner: {
        interval: 100,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) => chalk.blue(item))
    }
})

export const update = async () => {
    estimator.start()
    process.exec('npm install lyrici@latest -g', (err) => {
        estimator.stop();
        if (!err) {
            console.log(chalk.green('lyrici is updated!'))
        } else {
            console.log(chalk.red(err))
        }
    })
}