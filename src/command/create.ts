export interface TemplateInfo {
    name: string;
    downloadUrl: string;
    description: string;
    branch: string;
}

import { input, select } from '@inquirer/prompts'
import { clone } from '../utils/clone'

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

export const templates: Map<string, TemplateInfo> = new Map([
    ['Vite-Vue3-TypeScript-template', {
        name: 'Vite-Vue3-TypeScript-template',
        downloadUrl: 'https://github.com/LanxiangC2/lyrici.git',
        description: '这是一个基于Vite vue3 TypeScript Pinia Element-UI 的管理后台项目模板',
        branch: 'main'
    }],
    ['Vite-Vue3-TypeScript-template-2', {
        name: 'Vite-Vue3-TypeScript-template',
        downloadUrl: 'https://github.com/LanxiangC2/lyrici.git',
        description: '这是一个基于Vite vue3 TypeScript Pinia Element-UI 的管理后台项目模板2',
        branch: 'main'
    }]

])

export async function create(projectName?: string) {

    // 初始化模版列表

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
    // 判断文件夹是否存在
    if (fs.existsSync(filePath)) {
        const run = await isOverhidden(filePath)

        if (run) {
            await fs.remove(filePath)
        } else {
            return // 不覆盖直接结束
        }
    }

    const templateName = await select({
        message: '请选择模板',
        choices: templateList
    })

    const info = templates.get(templateName)

    if (info) {
        clone(info.downloadUrl, projectName, ['-b', info.branch])
    }

    console.log(info)
    console.log('projectName: ', projectName)
}