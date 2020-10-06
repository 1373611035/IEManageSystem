import React from 'react'
import IComponent from 'IETemplateComponents/IETheme/IComponent'
import Theme, { allThemeColors } from 'BaseLayout/Theme'
import { Button, Popover } from 'antd'

class Component extends IComponent {
    render() {
        let style = this.getCommonStyleSetting();

        return <div style={this.baseStyle}>
            <Popover
                content={
                    <div>
                        {
                            allThemeColors.map(item => {
                                return <Button
                                    onClick={() => {
                                        Theme.applyTheme(item.name);
                                        document.location.reload();
                                    }}
                                    style={{ height: 50, padding: 0 }}
                                >
                                    <span style={{ width: 50, height: 50, backgroundColor: item.color }}></span>
                                </Button>
                            })
                        }
                    </div>
                }
            >
                <Button style={style} type='primary'>主题</Button>
            </Popover>
        </div>
    }
}

export default Component;
