import React from 'react'
import IPreview from 'BaseCMSManage/Components/IETemplateComponents/IECarousel/IPreview'
import IocContainer from 'Core/IocContainer';

class Preview extends IPreview{
    render(){
        return <div>IE-走马灯</div>
    }
}

IocContainer.registerSingleIntances(IPreview, Preview);