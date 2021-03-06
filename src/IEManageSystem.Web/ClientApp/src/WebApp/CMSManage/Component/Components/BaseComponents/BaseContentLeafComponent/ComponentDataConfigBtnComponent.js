import React from 'react'
import PropTypes from 'prop-types'
import { IComponentDataConfigBtnComponent } from 'BaseCMSManage/Components/BaseComponents/BaseContentLeafComponent/ComponentDataConfig'
import { Button, Tooltip, Modal } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import {
    DefaultComponentDataUpdateAction,
    ComponentDataUpdateAction,
} from 'BaseCMSManage/IEReduxs/Actions'
import {IocContainer} from 'ice-common'
import {IETool} from 'ice-common'
import ComponentDataModel from 'BaseCMSManage/Models/ComponentDataModel'
import CmsRedux from 'BaseCMSManage/IEReduxs/CmsRedux'

class ComponentDataConfigBtnComponent extends IComponentDataConfigBtnComponent {
    state = {
        visible: false,
        cloneComponentData: IETool.deepCopy(this.props.contentComponentData),
    }

    constructor(props) {
        super(props);
    }

    render() {
        return <>
            <Tooltip
                title={`编辑组件数据`}
            >
                <Button size='small' shape="round"
                    // type={"primary"}
                    icon={<FileTextOutlined />}
                    onClick={() => {
                        this.setState({
                            visible: true,
                            cloneComponentData: IETool.deepCopy(this.props.contentComponentData)
                        })
                    }}
                />
            </Tooltip>
            <Modal
                title={`编辑组件数据`}
                visible={this.state.visible}
                onOk={() => {
                    if (!this.props.currentPageAndPost.isExistPageData) {
                        this.props.editDefaultComponentData(new DefaultComponentDataUpdateAction(this.props.currentPageAndPost.page.name, this.props.sign, this.state.cloneComponentData))
                    }
                    else {
                        this.props.editComponentData(new ComponentDataUpdateAction(this.props.currentPageAndPost.pageData.id, this.state.cloneComponentData))
                    }
                    this.setState({ visible: false });
                }}
                onCancel={() => {
                    this.setState({ visible: false });
                }}
                width={1200}
                zIndex={9999}
                okText='提交'
                cancelText='取消'
            >
                <this.props.ConfigComponent
                    pageComponentSettings={this.props.pageComponent.pageComponentSettings}
                    data={this.state.cloneComponentData}
                    setData={(data) => {
                        this.setState({ cloneComponentData: data });
                    }}
                />
            </Modal>
        </>
    }
}

ComponentDataConfigBtnComponent.propTypes = {
    pageName: PropTypes.string.isRequired,
    pageDataId: PropTypes.number,
    os: PropTypes.string.isRequired,
    sign: PropTypes.string.isRequired,

    pageComponent: PropTypes.object.isRequired,
    componentData: PropTypes.object.isRequired,
    editDefaultComponentData: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    let pageComponent = ownProps.currentPageAndPost.pageComponents[ownProps.sign];
    let defaultComponentData = ownProps.currentPageAndPost.defaultComponentDatas[ownProps.sign];
    let contentComponentData = ownProps.currentPageAndPost.contentComponentDatas[ownProps.sign];

    return {
        pageComponent: pageComponent,
        contentComponentData: contentComponentData || defaultComponentData || ComponentDataModel.CreateDefaultComponentData(ownProps.sign),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editDefaultComponentData: (editComponentAction) => {
            dispatch(editComponentAction);
        },
        editComponentData: (editComponentAction) => {
            dispatch(editComponentAction);
        }
    }
}

IocContainer.registerSingleIntances(IComponentDataConfigBtnComponent, CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(ComponentDataConfigBtnComponent));