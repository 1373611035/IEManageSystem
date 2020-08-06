import React from 'react';
import IComponent from 'BaseCMSManage/Components/IETemplateComponents/IEPageSetting/IComponent'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IEPageSetting/Setting'
import IocContainer from 'Core/IocContainer';
import './IEPageSetting.css';

class IEPageSetting extends IComponent{
    constructor(props){
        super(props);

        this.setting = new Setting(this.getPageComponentSetting());
        this.clearElement = ()=>{};
    }

    componentDidMount(){
    }

    componentWillUnmount(){
        this.clearElement();
    }

    getPageComponentSetting(){
        return this.getSetting("PageSetting");
    }
    
    setElement(element){
        if(this.setting.backgroundImage)
            element.style.backgroundImage = `url(${this.setting.backgroundImage})`;
        element.style.backgroundColor = this.setting.backgroundColor;
        element.style.height = this.setting.height;

        this.clearElement = ()=>{
            element.style.backgroundImage = "";
            element.style.backgroundColor = "";
            element.style.height = "";
        }
    }

    render() {
        this.setting.setSetting(this.getPageComponentSetting());
        if(this.setting.element == "page"){
            this.clearElement();
            this.setElement(document.getElementById("IEHomePage"));
        }
        else{
            this.clearElement();
            this.setElement(document.getElementById("root"));
        }

        return <div></div>;
    }
}

IocContainer.registerSingleIntances(IComponent, IEPageSetting);
