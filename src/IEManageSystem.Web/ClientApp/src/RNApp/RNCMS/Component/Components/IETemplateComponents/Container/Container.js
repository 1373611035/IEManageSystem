import React from 'react'
import {View} from 'react-native'
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/Container/IComponent'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/Container//Setting'

class Container extends IComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let setting = new Setting(this.getSetting("FlexSetting"));

        return (
            <View
                style={{
                    flexDirection: setting.direction,
                    justifyContent: setting.justifyContent,
                    alignItems: setting.alignItems,
                    alignContent: setting.alignContent,
                    flexWrap: setting.wrap
                }}
            >
                {this.props.children}
            </View>);
    }
}

export default (register) => register(IComponent, Container);