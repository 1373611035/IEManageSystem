import React from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'
import { setActiveComponent, RootComponentSign } from 'BaseCMSManage/IEReduxs/Actions'

import ComponentFactory from 'BaseCMSManage/Components/ComponentFactory'
import { Button, Popover, Input, Tag, Select, Tooltip } from 'antd'
import { BranchesOutlined, ArrowUpOutlined, EditOutlined, ArrowDownOutlined } from "@ant-design/icons"
import Theme from 'BaseLayout/Theme'

class ToolBtns extends React.Component {
    state = {
        openEdit: false,
        showPostEdit: false,
        show: false
    }

    componentDescribe = undefined;

    constructor(props) {
        super(props);

        if (this.props.pageComponent) {
            this.componentDescribe = ComponentFactory.getComponentDescribeForName(this.props.pageComponent.name);
        }
    }

    getBtns() {
        return <div 
        onClick={(e) => {
            // 停止冒泡是必须的，不然会触发组件的点击事件，当前组件又会变为活跃组件
            e.stopPropagation();
            e.cancelable = true;

            return false
        }}
        >
            {
                this.componentDescribe.componentObject.BasicComponentSettingConfig.bulidConfigBtnComponent(
                    this.props.sign,
                    this.props.currentPageAndPost,
                )
            }
            {
                this.componentDescribe.componentObject.ComponentDataConfig &&
                this.componentDescribe.componentObject.ComponentDataConfig.bulidConfigBtnComponent(
                    this.props.sign,
                    this.props.currentPageAndPost,
                )
            }
            {
                this.componentDescribe.componentObject.ComponentSettingConfigs.map(item =>
                    item.bulidConfigBtnComponent(
                        this.props.sign,
                        this.props.currentPageAndPost,
                    )
                )
            }
            {
                this.componentDescribe.componentObject.DeleteConfig.bulidConfigBtnComponent(
                    this.props.sign,
                    this.props.currentPageAndPost,
                )
            }
        </div>
    }

    render() {
        if (!this.props.pageComponent) {
            return <></>;
        }

        let domNode = document.getElementById("PageEditPortals");

        return (
            <>
                <div className={`pageedit-componentcontainer-btns pageedit-componentcontainer-btns-transform`} style={this.props.style}>
                    <Popover
                        placement={this.props.placement}
                        visible={this.state.show}
                        onVisibleChange={(visible) => {
                            this.setState({ show: visible })
                        }}
                        content={this.getBtns()}
                        title={`编辑 ${this.componentDescribe.displayName}`}
                        trigger="click"
                    >
                        <Button
                            type='primary'
                            icon={<BranchesOutlined />}
                        ></Button>
                    </Popover>
                </div>
                {
                    this.props.cancelActiveShow != true && this.props.isActive && domNode &&
                    ReactDOM.createPortal(
                        <div style={
                            {
                                position: 'fixed',
                                display: 'flex',
                                right: 80,
                                bottom: 110,
                                alignItems: 'center',
                                borderRadius: 20
                            }}
                            onClick={(e) => {
                                // 停止冒泡是必须的，不然会触发组件的点击事件，当前组件又会变为活跃组件
                                e.stopPropagation();
                                e.cancelable = true;

                                return false
                            }}
                        >
                            <Tag className='mr-3' icon={<EditOutlined />} color={Theme.primary}>
                                {this.componentDescribe.displayName}
                            </Tag>
                            {
                                this.getBtns()
                            }
                            {/* 选择子组件按钮 */}
                            {
                                this.props.pageComponent.pageComponentSigns.map(sign => {
                                    return (<Button
                                        key={sign}
                                        className='ml-3'
                                        size='small'
                                        shape='circle'
                                        icon={<ArrowDownOutlined />}
                                        onClick={(e) => {
                                            this.props.setActiveComponent(sign);
                                        }}
                                    ></Button>)
                                })
                            }
                            {/* 选择父组件按钮 */}
                            <Button
                                className='ml-3'
                                size='small'
                                shape='circle'
                                icon={<ArrowUpOutlined />}
                                onClick={(e) => {
                                    if (RootComponentSign == this.props.pageComponent.parentSign) {
                                        return false;
                                    }

                                    this.props.setActiveComponent(this.props.pageComponent.parentSign);
                                }}
                            ></Button>
                        </div>,
                        domNode,
                    )
                }
            </>)
    }
}

ToolBtns.propTypes = {
    // 如下属性由父组件传入
    sign: PropTypes.string.isRequired,
    currentPageAndPost: PropTypes.object.isRequired,
    style: PropTypes.object,
    placement: PropTypes.string,
    cancelActiveShow: PropTypes.bool,   // 取消活跃显示（默认情况下，如果组件被选择，会显示组件编辑按钮列表，如果想点击的时候再显示，则设为true）

    // redux state
    pageComponent: PropTypes.object.isRequired,
    isActive: PropTypes.string,
    setActiveComponent: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
    let pageId = ownProps.currentPageAndPost.pageId;
    let os = ownProps.currentPageAndPost.os;

    let pageComponent = state.pageComponents[pageId][os][ownProps.sign];

    return {
        isActive: state.activePageComponentSign == pageComponent.sign,
        pageComponent: pageComponent,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setActiveComponent: (sign) => {
            return dispatch(setActiveComponent(sign));
        }
    }
}

const Contain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ToolBtns)

export default Contain;