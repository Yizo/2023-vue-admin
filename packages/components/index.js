
const modules = import.meta.glob('./**/index.js')

export default {
    install: (app) => {
        for (const path in modules) {
            modules[path]().then((mod) => {
                app.component(mod.default.name, mod.default)
            })
        }

    }
}