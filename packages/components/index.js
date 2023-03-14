
const modules = import.meta.glob('./**/index.js', { eager: true })

export * from './gm-form'
export * from './gm-modal'
export * from './gm-table'

export default {
    install: (app) => {
        for (const path in modules) {
            const componentList = modules[path].default
            componentList.forEach(component => {
                app.component(component.name, component)
            })
        }

    }
}