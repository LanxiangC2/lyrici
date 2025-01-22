import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'
import { update } from './command/update'


const program = new Command('lyrici')
program.version(version, '-v, --version')

program.command('create')
    .description('Create a new project')
    .argument('[name]', 'project name')
    .action(async (dirname) => {
        create(dirname)
        if (dirname) {
        } else {
            console.log('create', dirname)
            return
        }
    })

program.command('update')
    .description('update cli version')
    .action(async () => {
        await update()
    })

program.parse();
