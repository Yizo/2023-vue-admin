import { Button, Modal } from 'ant-design-vue'

export default {
    install: (app) => {
        app.component(Button.name, Button)
        app.component(Modal.name, Modal)
    }
}