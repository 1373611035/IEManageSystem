import React from 'react';
import PropTypes from 'prop-types';
import PageComponentModel from 'CMSManage/Models/Pages/PageComponentModel'

import Tab from 'Tab/Tab.jsx'

import { Modal, notification } from 'antd';

class EditFrame extends React.Component {
    // props.close()
    // props.show
    constructor(props) {
        super(props);

        // 选项卡名称字段的名字
        this.nameField = "text";
        // 生成选项卡
        this.tabs = this.createTabs();

        this.state = {
            // 当前选择的选项卡的索引
            selectTab: this.tabs.length > 0 ? this.tabs[0] : null,
        }

        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);

        this.props.pageComponent.snapshot();
    }

    componentWillReceiveProps(nextProps) {
        nextProps.pageComponent.snapshot();
    }

    // 生成选项卡列表
    createTabs() {
        let index = 0;

        let tabs = [];

        // 根据组件的配置，配置选项卡
        this.props.componentObject.getComponentSettingConfigs().forEach(element => {
            // 添加 选项卡 选项
            tabs.push({ index: index, text: element.displayName, name: element.name })
            index++;
        });

        return tabs;
    }

    cancel() {
        this.props.close();
        this.props.pageComponent.resumeForsnapshot()
        this.setState({
            selectTab: this.tabs.length > 0 ? this.tabs[0] : null
        });
    }

    submit() {
        try {
            this.props.editComponent(this.props.pageComponent);
            this.props.pageComponent.clearSnapshot();
        }
        catch (e) {
            notification.error({
                message: '提交失败',
                description: e.message,
            });
            this.props.pageComponent.resumeForsnapshot()
        }

        this.props.close();
    }

    // 获取当前要显示的内容
    getContentComponent() {
        if (!this.state.selectTab) {
            return undefined;
        }

        // 组件设置配置
        let componentSettingConfig = this.props.componentObject.getComponentSettingConfigs().find(item => item.name == this.state.selectTab.name);

        // 组件设置配置使用的组件
        return componentSettingConfig.bulidConfigComponent(this.props.pageComponent,
            (pageComponent) => {
                this.setState({ pageComponent: pageComponent });
            });
    }

    render() {
        return (
            <Modal
                title={`${this.props.title} 组件编辑`}
                visible={this.props.show}
                onOk={this.submit}
                onCancel={this.cancel}
                width={1000}
                bodyStyle={{ backgroundColor: "#f8f9fa" }}
                zIndex={9999}
                okText="提交"
                cancelText="取消"
            >
                <div className="bg-white p-2">
                    <Tab
                        tabs={this.tabs}
                        nameField={this.nameField}
                        selectIndex={this.state.selectTab == null ? 0 : this.state.selectTab.index}
                        selectOnclick={(data) => {
                            this.setState({ selectTab: data })
                        }}
                    >
                        {this.getContentComponent()}
                    </Tab>
                </div>
            </Modal>
        );
    }
}

EditFrame.propTypes = {
    componentObject: PropTypes.object.isRequired,
    pageComponent: PropTypes.object.isRequired,
    editComponent: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default EditFrame