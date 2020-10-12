import RNFS from 'react-native-fs';

// 核心模块依赖
import BaseModule from 'Core/Modules/BaseModule'
import ModuleFactory from 'Core/Modules/ModuleFactory'
import CoreModule from 'Core/Module';
import Weburl from 'Core/Weburl'

import ModuleList from '../../ModuleList'

export default class Module extends BaseModule {
    initialize() {
        RNFS.readFileAssets('config.json').then((result) => {
            let config = JSON.parse(result);
            Weburl.setBaseUrl(config.baseUrl)
        })
    }
}

new ModuleFactory().register(Module, [...ModuleList, CoreModule]);