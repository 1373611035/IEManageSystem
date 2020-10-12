// 核心模块依赖
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module'
import BaseLayoutModule from 'BaseLayout/Module'
import AntIcons from 'BaseCommon/AntIcons';
import {getIcon, icons} from './AntIcons'
import {getCookie, setCookie, delCookie} from './ToolLibrary/IETool'
import IETool from 'BaseCommon/ToolLibrary/IETool'


export default class Module extends BaseModule {
    initialize() {
        AntIcons.icons = icons;
        AntIcons.getIcon = getIcon;

        IETool.getCookie = getCookie;
        IETool.setCookie = setCookie;
        IETool.delCookie = delCookie;
    }
}

new ModuleFactory().register(Module, [
    CoreModule,
    BaseLayoutModule,
]);