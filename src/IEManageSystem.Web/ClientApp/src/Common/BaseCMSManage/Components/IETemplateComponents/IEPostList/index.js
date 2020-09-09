import BaseComponentObject, {ComponentSettingConfig} from '../../BaseComponents/BaseComponent';
import PageLeafComponentSettingConfig from '../../BaseComponents/BasePageLeafComponent/PageLeafComponentSettingConfig'
import ComponentDescribe, {componentType} from '../../ComponentDescribe'
import InteractiveContainerConfig from '../../BaseComponents/InteractiveComponent/InteractiveContainerConfig'

import IocContainer from 'Core/IocContainer';
import IComponent from './IComponent'
import IPreview from './IPreview'
import ISettingConfig from './ISettingConfig'

class ComponentObject extends BaseComponentObject{
    ComponentSettingConfigs = [
        new InteractiveContainerConfig([
            {name: 'head', displayName: '头部'},
            {name: 'listItem', displayName: '列表项'},
        ]),
        new PageLeafComponentSettingConfig(),
        new ComponentSettingConfig(undefined, "组件设置", IocContainer.getService(ISettingConfig))
    ];
    Component=IocContainer.getService(IComponent)
    Preview=IocContainer.getService(IPreview)
}

const componentDescribeBuilder = () => new ComponentDescribe("IEPostList", new ComponentObject(), componentType.page, "IE文章列表");
export default componentDescribeBuilder;