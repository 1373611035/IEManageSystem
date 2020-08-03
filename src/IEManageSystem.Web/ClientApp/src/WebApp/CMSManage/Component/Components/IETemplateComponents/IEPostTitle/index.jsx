import React from 'react';
import BaseComponentObject from '../../BaseComponents/BaseStaticComponent';

import IEPostTitle from './IEPostTitle';
import ComponentDescribe, {componentType} from 'BaseCMSManage/Components/ComponentDescribe'

import {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import SettingConfig from './SettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        ComponentSettingConfig.BuildPageComponentSettingConfig("DefaultSetting", "组件设置",
            (pageComponentSetting, setPageComponentSetting) => {
                return <SettingConfig
                    data={pageComponentSetting}
                    setData={setPageComponentSetting}
                />;
            }
        )
    ];
    Component=IEPostTitle;
    Preview=<p>IE-文章标题</p>;
}

let componentDescribe = new ComponentDescribe("IEPostTitle", new ComponentObject(), componentType.text, "IE文章标题");
export default componentDescribe;