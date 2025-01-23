export interface TemplateInfo {
    name: string;
    downloadUrl: string;
    description: string;
    branch: string;
}

import { input, select } from '@inquirer/prompts'
import { clone } from '../utils/clone'
import {version, name} from '../../package.json'
import axios, { AxiosResponse } from 'axios'
import chalk from 'chalk'
import { gt } from 'lodash'

import path from 'path'
import fs from 'fs-extra'

export function isOverhidden(fileName: string) {
    console.warn(`${fileName} 已存在，是否覆盖？`)
    return select({
        message: '是否覆盖?',
        choices: [
            {   name: '是', value: true },
            {   name: '否', value: false }
        ]
    })
}

export const getNpmInfo = async (npmName: string) => {
    const npmUrl = `https://registry.npmjs.org/${name}`
    let res = {};
    try {
        res = await axios.get(npmUrl)
    } catch (error) {
        console.log(chalk.red(`获取最新版本号失败`))
    }
    return res;
}
export const getNpmLastestVersion = async (name: string) => {
    
    const { data } = await getNpmInfo(name) as AxiosResponse;
    return data['dist-tags'].latest;

}
export const checkVersion = async (name: string, version: string) => {
    const latestVersion = await getNpmLastestVersion(name);
    const needUpdate = gt(latestVersion, version)
    if (needUpdate) {
        console.log(chalk.blackBright(`当前版本: ${version}，最新版本：${latestVersion}`))
        console.log(`可使用 ${chalk.yellow('npm install lyrici@latest -g')} 或者 ${chalk.yellow('lyrici update')} 更新到最新版本`)
    }
    return needUpdate;
}

export const templates: Map<string, TemplateInfo> = new Map([
    ['Vite-Vue3-TypeScript-template', {
        name: 'Vite-Vue3-TypeScript-template',
        downloadUrl: 'https://github.com/LanxiangC2/admin-pro.git',
        description: '这是一个基于Vite vue3 TypeScript Pinia Element-UI 的管理后台项目模板',
        branch: 'main'
    }],
    ['Vite-Vue3-TypeScript-vant-h5', {
        name: 'Vite-Vue3-TypeScript-vant-h5',
        downloadUrl: 'https://github.com/LanxiangC2/h5-template.git',
        description: '这是一个基于Vite vue3 TypeScript Pinia Vant 的H5项目模板',
        branch: 'main'
    }]

])

export async function create(projectName?: string) {

    // 1. 初始化模版列表

    const templateList = Array.from(templates).map((item: [string, TemplateInfo]) => {

        const [ name, info ] = item;

        return {
            name,
            value: name,
            description: info.description,

        }
    })
    if (!projectName) {
        projectName = await input({ message: '请输入项目名称' })
    }

    const filePath = path.resolve(process.cwd(), projectName)
    // 2. 判断文件夹是否存在
    if (fs.existsSync(filePath)) {
        const run = await isOverhidden(filePath)

        if (run) {
            await fs.remove(filePath)
        } else {
            return // 不覆盖直接结束
        }
    }

    // 3. 检查版本更新
    await checkVersion(name, version)

    // 4. 选择模板
    const templateName = await select({
        message: '请选择模板',
        choices: templateList
    })

    const info = templates.get(templateName)

    // 5. 克隆模板代码
    if (info) {
        clone(info.downloadUrl, projectName, ['-b', info.branch])
    }

    console.log(info)
    console.log('projectName: ', projectName)
}