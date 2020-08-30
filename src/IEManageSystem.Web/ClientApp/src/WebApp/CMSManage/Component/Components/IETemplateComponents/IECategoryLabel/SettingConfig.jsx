import React from 'react'
import PropTypes from 'prop-types'
import ISettingConfig from 'BaseCMSManage/Components/IETemplateComponents/IECategoryLabel/ISettingConfig'
import Setting from 'BaseCMSManage/Components/IETemplateComponents/IECategoryLabel/Setting'
import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { Input, Tag, Button } from 'antd';

class SettingConfig extends ISettingConfig {
    render() {
        let setting = new Setting(this.props.data);

        let items = setting.getSettings().map((singleData, index) => {
            return (
                <div key={index} className="mb-2">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="font-weight-bold mb-0">{`标签 ${index + 1}`}</h5>
                        <Button icon={<DeleteOutlined />} className="" type="primary" danger
                            onClick={() => {
                                setting.deleteSingleData(singleData.sortIndex);
                                this.setState({});
                            }}
                        >删除</Button>
                    </div>
                    <Input
                        placeholder="输入名称"
                        className="col-md-5 mr-3"
                        value={singleData.displayName}
                        onChange={(e) => {
                            singleData.displayName = e.currentTarget.value;
                            this.props.setData(setting.componentSetting);
                        }}
                        prefix={<Tag color="#55acee">标签显示名称</Tag>}
                    />
                    <Input
                        placeholder="输入标签"
                        className="col-md-5"
                        value={singleData.tagName}
                        onChange={(e) => {
                            singleData.tagName = e.currentTarget.value;
                            this.props.setData(setting.componentSetting);
                        }}
                        prefix={<Tag color="#55acee">标签名称</Tag>}
                    />
                </div>
            );
        })

        return (<div>
            {items}
            <div>
                <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={() => {
                        setting.createSingleData();
                        this.setState({});
                    }}
                >添加数据</Button>
            </div>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default (register) => register(ISettingConfig, SettingConfig);
