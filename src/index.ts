import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'


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
            console.log('project name is required')
            return
        }
    })

program.parse();
