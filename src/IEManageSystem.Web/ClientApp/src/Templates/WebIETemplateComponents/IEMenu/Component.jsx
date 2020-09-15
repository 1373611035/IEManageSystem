import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import { Link } from 'react-router-dom'
import {getIconType} from 'Common/AntIcons'
import { Menu } from 'antd';
const { SubMenu } = Menu;

class Component extends IComponent {
    constructor(props) {
        super(props);
    }

    createMenus() {
        let mainMenu = this.props.menu;
        if (!mainMenu) {
            return null;
        }

        return this.createMenusIteration(mainMenu);
    }

    createMenusIteration(menu) {
        let lis = Array();

        let menuItems = menu.menus;
        for (let item in menuItems) {
            let Icon = undefined;
            if(menuItems[item].icon){
                let IconType = getIconType(menuItems[item].icon);
                Icon = <IconType />
            }

            if (menuItems[item].isCompositeMenuType()) {
                let childMenus = this.createMenusIteration(menuItems[item]);

                let menu =
                    <SubMenu key={menuItems[item].name} title={menuItems[item].displayName} icon={Icon}>
                        {childMenus}
                    </SubMenu>

                lis.push(menu);
            }
            else {
                let menu =
                    <Menu.Item key={menuItems[item].name} icon={Icon}>
                        <Link to={menuItems[item].createUrl()} >{menuItems[item].displayName}</Link>
                    </Menu.Item>;
                lis.push(menu);
            }
        }

        return lis;
    }

    render() {
        return (
            <Menu className="m-0 border-0" style={{backgroundColor:"#fff0"}} mode="horizontal">
                {this.createMenus()}
            </Menu>
        );
    }
}

export default Component;
