import React from 'react'
import PropTypes from 'prop-types'

import CmsRedux from 'CMSManage/IEReduxs/CmsRedux'
import CreatePageComponentService from 'CMSManage/Component/ParentComponent/PageEditParentCompont/CreatePageComponentService'

import './PageContainer.css'

import PageEditParentCompont from 'CMSManage/Component/ParentComponent/PageEditParentCompont'
import { BaseContainerComponent } from 'CMSManage/Component/Components/BaseContainerComponent'
import {BasePageLeafComponent} from 'CMSManage/Component/Components/BasePageLeafComponent'

import { pageAddComponent, pageComponentUpdateFetch, pageComponentFetch } from 'CMSManage/IEReduxs/Actions'

import {ieReduxFetch} from 'Core/IEReduxFetch'

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            displayName: "",
            description: ""
        }

        this.getPage(props.pageName);

        this.submitPage = this.submitPage.bind(this);
        this.addComponent = this.addComponent.bind(this);

        this.props.pageComponentFetch(props.pageName);
    }

    getPage(name) {
        let postData = {
            name: name
        };

        ieReduxFetch("/api/PageQuery/GetPage", postData)
        .then(value=>{
            this.setState({
                name: value.page.name,
                displayName: value.page.displayName,
                description: value.page.description
            })
        });
    }

    submitPage() {
        this.props.pageComponentUpdateFetch(
            this.props.pageName,
            this.props.pageComponents
        );
    }

    addComponent(){
        if (!this.props.selectedComponentDescribe.name) {
            return;
        }

        var timetamp = Number(new Date());
        while (true) {
            if (!this.props.pageComponents.some(item => item.sign === timetamp)) {
                break;
            }

            timetamp = Number(new Date());
        }

        let pageComponent;
        if (this.props.selectedComponentDescribe.componentObject.Component.prototype instanceof BaseContainerComponent) 
        {
            pageComponent = CreatePageComponentService.createCompositeComponent(timetamp, this.props.selectedComponentDescribe.name)
        }
        else if(this.props.selectedComponentDescribe.componentObject.Component.prototype instanceof BasePageLeafComponent)
        {
            pageComponent = CreatePageComponentService.createPageLeafComponent(timetamp, this.props.selectedComponentDescribe.name)
        }
        else {
            pageComponent = CreatePageComponentService.createContentLeafComponent(timetamp, this.props.selectedComponentDescribe.name)
        }

        this.props.addComponent(pageComponent);
    }

    render() {
        return (
            <div className="page-container">
                <div className="page-container-header">
                    <div className="input-group shadow-sm">
                        <input value={this.state.displayName} type="text" className="form-control bg-transparent" placeholder="" disabled />
                        <div className="input-group-append">
                            <span className="input-group-text text-white">显示名称</span>
                        </div>
                    </div>
                    <div className="input-group shadow-sm">
                        <input value={this.state.name} type="text" className="form-control bg-transparent" placeholder="" disabled />
                        <div className="input-group-append">
                            <span className="input-group-text text-white">
                                <span className="oi oi-key mr-2" title="icon name" aria-hidden="true"></span>
                                名称
                            </span>
                        </div>
                    </div>
                    <div className="input-group shadow-sm">
                        <input value={this.state.description} type="text" className="form-control bg-transparent" placeholder="" disabled />
                        <div className="input-group-append">
                            <span className="input-group-text text-white">
                                <span className="oi oi-info mr-2" title="icon name" aria-hidden="true"></span>
                                描述
                            </span>
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-warning padding-left-10 padding-right-10 shadow-sm"
                            onClick={
                                () => {
                                    let myEvent = new Event('resize');
                                    window.dispatchEvent(myEvent);
                                }
                            }
                        >
                            <span className="oi oi-loop-circular mr-1" title="icon name" aria-hidden="true"></span>
                            重新渲染
                        </button>
                        <button className="btn btn-info padding-left-10 padding-right-10 shadow-sm"
                            onClick={this.submitPage}
                        >
                            <span className="oi oi-cloud-upload mr-1" title="icon name" aria-hidden="true"></span>
                            提交页面
                        </button>
                    </div>
                </div>
                <div className="page-container-header-hidebtn">
                    <button className="btn btn-info"
                        onClick={() => {
                            $(".page-container-header").slideToggle(300);
                        }}
                    >==</button>
                </div>
                <div className="page-container-body">
                    {
                        this.props.pageComponents.filter(item => !item.parentSign).map(item =>
                            <PageEditParentCompont
                                key={item.sign}
                                pageComponent={item}
                                selectedComponentDescribe={this.props.selectedComponentDescribe}
                            >
                            </PageEditParentCompont>)
                    }
                    <div className="col-md-12  padding-0">
                        <div className="col-md-2 padding-0 float-right">
                            <a className="add-component-btn" href="javascript:void(0)"
                                onClick={this.addComponent}
                            >
                                <span className="oi oi-plus" title="icon name" aria-hidden="true"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PageContainer.propTypes = {
    selectedComponentDescribe: PropTypes.object,
    pageComponents: PropTypes.array,
    pageName: PropTypes.string.isRequired,
    addComponent: PropTypes.func.isRequired,
    pageComponentUpdateFetch: PropTypes.func.isRequired,
    pageComponentFetch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => { // ownProps为当前组件的props
    return {
        pageComponents: state.pageComponents,
        pageName: ownProps.pageName
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addComponent: (pageComponent) => {
            dispatch(pageAddComponent(pageComponent));
        },
        pageComponentUpdateFetch: (name, components) => {
            dispatch(pageComponentUpdateFetch(name, components));
        },
        pageComponentFetch: (name) => {
            dispatch(pageComponentFetch(name));
        }
    }
}

const PageContainerContain = CmsRedux.connect(
    mapStateToProps, // 关于state
    mapDispatchToProps
)(PageContainer)

export default PageContainerContain;