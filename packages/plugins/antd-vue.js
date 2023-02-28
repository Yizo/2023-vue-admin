import { Button, Modal, Menu, MenuItem, SubMenu, Form, FormItem, Input, Select, SelectOption ,SelectOptGroup, Radio, RadioGroup, RadioButton, Switch, Checkbox, CheckboxGroup, DatePicker } from 'ant-design-vue'

export default {
    install: (app) => {
        app.component(Button.name, Button)
        app.component(Modal.name, Modal)
        app.component(Menu.name, Menu)
        app.component(MenuItem.name, MenuItem)
        app.component(SubMenu.name, SubMenu)
        app.component(Form.name, Form)
        app.component(FormItem.name, FormItem)
        app.component(Input.name, Input)
        app.component(Select.name, Select)
        app.component(SelectOption.name, SelectOption)
        app.component(SelectOptGroup.name, SelectOptGroup)
        app.component(Radio.name, Radio)
        app.component(RadioGroup.name, RadioGroup)
        app.component(RadioButton.name, RadioButton)
        app.component(Switch.name, Switch)
        app.component(Checkbox.name, Checkbox)
        app.component(CheckboxGroup.name, CheckboxGroup)
        app.component(DatePicker.name, DatePicker)
    }
}