
export default function wujie(init) {
    if (window.__POWERED_BY_WUJIE__) {
        let app
        window.__WUJIE_MOUNT = () => {
            app = init()
        }
        window.__WUJIE_UNMOUNT = () => {
            app.unmount()
        }
        // module脚本异步加载，应用主动调用生命周期
        window.__WUJIE.mount()
    } else {
        init()
    }
}