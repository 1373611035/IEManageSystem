import {componentType} from './ComponentDescribe'
import TemplateList from './TemplateList'

export const componentTypes = [
    { name: componentType.container, text: "容器组件", icon: "oi-box" },
    { name: componentType.nav, text: "导航组件", icon: "oi-home" },
    { name: componentType.menu, text: "菜单组件", icon: "oi-list" },
    { name: componentType.page, text: "文章列表组件", icon: "oi-file" },
    { name: componentType.text, text: "文本组件", icon: "oi-text" },
    { name: componentType.graph, text: "图表组件", icon: "oi-graph" },
    { name: componentType.other, text: "其他组件", icon: "oi-puzzle-piece" }
];

class ComponentFactory {
    TemplateList = [];
    ComponentDescribes = [];
    ComponentDescribeMaps = new Map();

    init(){
        this.TemplateList = TemplateList;
        this.TemplateList.forEach(item => {
            item.componentBuilders.forEach(
                componentBuilder => this.ComponentDescribes.push(componentBuilder())
            );
        })
        
        this.ComponentDescribes.forEach(item => { 
            this.ComponentDescribeMaps[item.name] = item;
        })
    }

    getComponentDescribes() {
        return [...this.ComponentDescribes];
    }

    getComponentDescribeForName(name) {
        let componentDescribe = this.ComponentDescribeMaps[name];
        if (!componentDescribe) {
            return this.ComponentDescribeMaps["NotFind"];
        }

        return componentDescribe;
    }
}

const componentFactory = new ComponentFactory();
export default componentFactory;