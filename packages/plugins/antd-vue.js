import { Button, Modal, Menu, MenuItem, SubMenu } from 'ant-design-vue'

export default {
    install: (app) => {
        app.component(Button.name, Button)
        app.component(Modal.name, Modal)
        app.component(Menu.name, Menu)
        app.component(MenuItem.name, MenuItem)
        app.component(SubMenu.name, SubMenu)
    }
}