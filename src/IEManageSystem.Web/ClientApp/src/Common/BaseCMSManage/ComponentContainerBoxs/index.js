import React from 'react'
import PropTypes from 'prop-types'

import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import IocContainer from 'Core/IocContainer'

export class IComponentContainerBoxShow extends React.Component { }
IComponentContainerBoxShow.iocKey = Symbol()

class ComponentContainerBox extends React.Component {
    constructor(props) {
        super(props);

        this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);
        this.ComponentContainerBoxShow = IocContainer.getService(IComponentContainerBoxShow);
    }


    getStyle() {
        let style =
        {
            padding: 0
        }

        // style.width = "100%";

        style = { ...style, ...this.componentDescribe.defauleStyle }

        if (this.props.pageComponent.pageComponentBaseSetting.width) {
            let intWidth = new Number(this.props.pageComponent.pageComponentBaseSetting.width)
            if (!isNaN(intWidth)) {
                style.width = intWidth.valueOf();
            }
            else {
                style.width = this.props.pageComponent.pageComponentBaseSetting.width;
            }
        }

        if (this.props.pageComponent.pageComponentBaseSetting.height) {
            let intheight = new Number(this.props.pageComponent.pageComponentBaseSetting.height)
            if (!isNaN(intheight)) {
                style.height = intheight.valueOf();
            }
            else {
                style.height = this.props.pageComponent.pageComponentBaseSetting.height;
            }
        }

        if (this.props.pageComponent.pageComponentBaseSetting.padding) {
            let num = new Number(this.props.pageComponent.pageComponentBaseSetting.padding)
            if (!isNaN(num)) {
                style.padding = num.valueOf();
            }
            else {
                style.padding = this.props.pageComponent.pageComponentBaseSetting.padding;
            }
        }

        if (this.props.pageComponent.pageComponentBaseSetting.paddingLeft) {
            style.paddingLeft = this.props.pageComponent.pageComponentBaseSetting.paddingLeft;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.paddingRight) {
            style.paddingRight = this.props.pageComponent.pageComponentBaseSetting.paddingRight;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.paddingTop) {
            style.paddingTop = this.props.pageComponent.pageComponentBaseSetting.paddingTop;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.paddingBottom) {
            style.paddingBottom = this.props.pageComponent.pageComponentBaseSetting.paddingBottom;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.margin) {
            let num = new Number(this.props.pageComponent.pageComponentBaseSetting.margin)
            if (!isNaN(num)) {
                style.margin = num.valueOf();
            }
            else {
                style.margin = this.props.pageComponent.pageComponentBaseSetting.margin;
            }
        }

        if (this.props.pageComponent.pageComponentBaseSetting.marginLeft) {
            style.marginLeft = this.props.pageComponent.pageComponentBaseSetting.marginLeft;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.marginRight) {
            style.marginRight = this.props.pageComponent.pageComponentBaseSetting.marginRight;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.marginTop) {
            style.marginTop = this.props.pageComponent.pageComponentBaseSetting.marginTop;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.marginBottom) {
            style.marginBottom = this.props.pageComponent.pageComponentBaseSetting.marginBottom;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.border) {
            let num = new Number(this.props.pageComponent.pageComponentBaseSetting.border)
            if (!isNaN(num)) {
                style.border = num.valueOf();
            }
            else {
                style.border = this.props.pageComponent.pageComponentBaseSetting.border;
            }
        }

        if (this.props.pageComponent.pageComponentBaseSetting.borderRadius) {
            let num = new Number(this.props.pageComponent.pageComponentBaseSetting.borderRadius)
            if (!isNaN(num)) {
                style.borderRadius = num.valueOf();
            }
            else {
                style.borderRadius = this.props.pageComponent.pageComponentBaseSetting.borderRadius;
            }
        }

        if (this.props.pageComponent.pageComponentBaseSetting.position) {
            style.position = this.props.pageComponent.pageComponentBaseSetting.position;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.left) {
            let num = new Number(this.props.pageComponent.pageComponentBaseSetting.left)
            if (!isNaN(num)) {
                style.left = num.valueOf();
            }
            else {
                style.left = this.props.pageComponent.pageComponentBaseSetting.left;
            }
        }

        if (this.props.pageComponent.pageComponentBaseSetting.right) {
            let num = new Number(this.props.pageComponent.pageComponentBaseSetting.right)
            if (!isNaN(num)) {
                style.right = num.valueOf();
            }
            else {
                style.right = this.props.pageComponent.pageComponentBaseSetting.right;
            }
        }

        if (this.props.pageComponent.pageComponentBaseSetting.top) {
            let num = new Number(this.props.pageComponent.pageComponentBaseSetting.top)
            if (!isNaN(num)) {
                style.top = num.valueOf();
            }
            else {
                style.top = this.props.pageComponent.pageComponentBaseSetting.top;
            }
        }

        if (this.props.pageComponent.pageComponentBaseSetting.bottom) {
            let num = new Number(this.props.pageComponent.pageComponentBaseSetting.bottom)
            if (!isNaN(num)) {
                style.bottom = num.valueOf();
            }
            else {
                style.bottom = this.props.pageComponent.pageComponentBaseSetting.bottom;
            }
        }

        if (this.props.pageComponent.pageComponentBaseSetting.backgroundColor) {
            style.backgroundColor = this.props.pageComponent.pageComponentBaseSetting.backgroundColor;
        }

        if (this.props.pageComponent.pageComponentBaseSetting.backgroundImage) {
            if (this.props.pageComponent.pageComponentBaseSetting.backgroundImage.startsWith('/') ||
                this.props.pageComponent.pageComponentBaseSetting.backgroundImage.startsWith('http')) {
                style.backgroundImage = `url(${this.props.pageComponent.pageComponentBaseSetting.backgroundImage})`;
                style.backgroundRepeat = "no-repeat"
                style.backgroundSize = "100% auto";
            }
            else{
                style.backgroundImage = this.props.pageComponent.pageComponentBaseSetting.backgroundImage;
            }
        }

        return style;
    }

    getClassName() {
        let className = `${this.props.pageComponent.pageComponentBaseSetting.className || ""}`;

        return className;
    }

    render() {
        return (
            <this.ComponentContainerBoxShow
                sign={this.props.sign}
                pageId={this.props.pageId}
                pageDataId={this.props.pageDataId}
                os={this.props.os}
                pageComponent={this.props.pageComponent}

                style={{ ...this.getStyle() }}
                className={`${this.getClassName()}`}
            >
                {
                    this.componentDescribe.createComponent(
                        this.props.pageId,
                        this.props.os,
                        this.props.pageDataId,
                        this.props.sign)
                }
            </this.ComponentContainerBoxShow>
        );
    }
}

ComponentContainerBox.propTypes = {
    // 如下属性由父组件传入
    pageId: PropTypes.number.isRequired,
    pageDataId: PropTypes.number,
    sign: PropTypes.string.isRequired,
    os: PropTypes.string.isRequired,
    ComponentContainerBoxShow: PropTypes.func.isRequired,

    // 如下属性为父组件传入，为可选熟悉
    style: PropTypes.func,
    className: PropTypes.func,
    propsEX: PropTypes.func,        // (PageComponent) => {}
    ToolBtn: PropTypes.func,      // react 组件 ({pageId, pageDataId, sign}) => {}

    // 如下熟悉为 redux
    pageComponent: PropTypes.object.isRequired,
}

ComponentContainerBox.defaultProps = {
    style: (pageComponent) => ({}),
    className: (pageComponent) => "",
    propsEX: (pageComponent) => ({}),
};

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageComponent = state.pageComponents[ownProps.pageId][ownProps.os][ownProps.sign];

    return {
        pageComponent: pageComponent,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ComponentContainerBox)

export default Contain;