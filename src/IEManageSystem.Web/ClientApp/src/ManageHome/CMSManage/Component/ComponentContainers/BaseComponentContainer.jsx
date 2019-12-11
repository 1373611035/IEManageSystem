import React from 'react'
import PropTypes from 'prop-types'

import ComponentFactory from '../Components/ComponentFactory'

import './BaseComponentContainer.css'

class BaseComponentContainer extends React.Component {
    constructor(props) {
        super(props);

        this.componentFactory = new ComponentFactory();
    }

    getStyle(){
        let style =
            {
                padding: "0.33rem"
            }

        if (this.props.pageComponent.height) {
            style.height = this.props.pageComponent.height;
        }

        if (this.props.pageComponent.padding) {
            style.padding = this.props.pageComponent.padding;
        }

        if(this.props.pageComponent.margin){
            style.margin = this.props.pageComponent.margin;
        }

        if(this.props.pageComponent.backgroundColor){
            style.backgroundColor = this.props.pageComponent.backgroundColor;
        }

        return style;
    }

    getClassName(){
        let className = `col-md-${this.props.pageComponent.col || 12} ${this.props.pageComponent.className || ""}`;

        return className;
    }

    createChildrenComponent() 
    {
        return undefined;
    }

    getTools(){
        return undefined;
    }

    getPageComponentSettings(){
        return this.props.pageComponent.pageComponentSettings
    }

    getComponentData(){
        return this.props.componentDatas.find(e=>e.sign==this.props.pageComponent.sign)
    }

    render() 
    {
        return (
            <div style={this.getStyle()} className={`parentcomponent ${this.getClassName()}`}>
                <div className="w-100">
                    {this.createChildrenComponent()}
                </div>
                {this.getTools()}
            </div>
        );
    }
}

BaseComponentContainer.propTypes = {
    pageComponent: PropTypes.object.isRequired
}

BaseComponentContainer.defaultProps = {
};

export default BaseComponentContainer;