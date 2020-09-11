import React from 'react'
import PropTypes from 'prop-types'
import Setting from 'IETemplateComponents/IESelect/Setting'
import { Input, Tag, Radio, Button } from 'antd';

class SettingConfig extends React.Component {
    state = {
        isShowPicturePopupBox: false
    }

    setting = null;

    constructor(props) {
        super(props);

        this.setting = new Setting(props.data);
    }

    render() {
        this.setting.setSetting(this.props.data);

        let seleteDatas = this.setting.getSeleteDatas();

        return (<div>
            <div className="mb-3">
                <Tag color="#55acee">按钮大小</Tag>
                <Radio.Group
                    value={this.setting.size}
                    onChange={(e) => {
                        this.setting.size = e.target.value;
                        this.setState({})
                    }}
                    onBlur={(e) => {
                        this.props.setData(this.setting.setting);
                    }}
                >
                    <Radio value="large">大</Radio>
                    <Radio value="middle">中</Radio>
                    <Radio value="small">小</Radio>
                </Radio.Group>
            </div>
            {
                seleteDatas.map((item, index) => (
                    <div key={index} className="mb-3 d-flex">
                        <div className="col-md-6">
                            <Input
                                placeholder="名称"
                                value={item.text}
                                onChange={(e) => {
                                    item.text = e.currentTarget.value;
                                    this.setState({})
                                }}
                                onBlur={(e) => {
                                    this.props.setData(this.setting.setting);
                                }}
                                suffix={<Tag color="#55acee">名称</Tag>}
                            />
                        </div>
                        <div className="col-md-6">
                            <Input
                                placeholder="Url"
                                value={item.url}
                                onChange={(e) => {
                                    item.url = e.currentTarget.value;
                                    this.setState({})
                                }}
                                onBlur={(e) => {
                                    this.props.setData(this.setting.setting);
                                }}
                                suffix={<Tag color="#55acee">链接 Url</Tag>}
                            />
                        </div>

                    </div>
                ))
            }
            <Button type="primary" onClick={() => {
                this.setting.createSeleteData();
                this.props.setData(this.setting.setting);
            }}>添加数据</Button>
        </div>)
    }
}

SettingConfig.propType = {
    // IEButtonSetting
    data: PropTypes.object,
    setData: PropTypes.func.isRequired,
}

export default SettingConfig;
