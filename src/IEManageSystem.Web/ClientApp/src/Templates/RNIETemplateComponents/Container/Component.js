import React from 'react'
import {View} from 'react-native'
import IComponent from 'IETemplateComponents/Container/IComponent'

class Component extends IComponent {
    render() {
        let setting = this.getCurrentSetting();

        return (
            <View
                style={[
                    this.baseStyle,
                    {
                        flexDirection: setting.direction,
                        justifyContent: setting.justifyContent,
                        alignItems: setting.alignItems,
                        alignContent: setting.alignContent,
                        flexWrap: setting.wrap,
                    }
                ]}
            >
                {this.props.children}
            </View>);
    }
}

export default Component;