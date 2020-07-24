import PropTypes from 'prop-types'
import { ieReduxFetch } from "Core/IEReduxFetch"
import { BaseComponent, BaseComponentProps } from '../BaseComponent'
import PageDataModel from '../../../../Models/PageDatas/PageDataModel'
import TagModel from '../../../../Models/PageDatas/TagModel'

export class PageLeafComponentProps extends BaseComponentProps {
    constructor() {
        super();
        this.pageLeafSetting = null;
    }
}


class BasePageLeafComponent extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            pageName: this.props.pageLeafSetting.pageName,
            pageIndex: 1,
            pageSize: this.props.pageLeafSetting.pageSize,
            top: this.props.pageLeafSetting.top,
            searchKey: this.props.pageLeafSetting.searchKey,
            orderby: this.props.pageLeafSetting.orderby,
            pageDatas: [],
            resourceNum: 0,
            curtag: this.getQueryVariable("tag"),
            invalid: false,
        }

        this.createUrl = this.createUrl.bind(this);
    }

    componentDidMount() {
        this.getPageDateFetchs();
    }

    componentWillReceiveProps(nextprops) {
        this.setState({
            pageName: nextprops.pageLeafSetting.pageName,
            pageSize: nextprops.pageLeafSetting.pageSize,
            top: nextprops.pageLeafSetting.top,
            searchKey: nextprops.pageLeafSetting.searchKey,
            orderby: nextprops.pageLeafSetting.orderby,
            curtag: this.getQueryVariable("tag")
        })
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.pageName != this.state.pageName
            || nextState.pageIndex != this.state.pageIndex
            || nextState.pageSize != this.state.pageSize
            || nextState.top != this.state.top
            || nextState.searchKey != this.state.searchKey
            || nextState.orderby != this.state.orderby
            || nextState.curtag != this.state.curtag) 
        {
            this.setState({ invalid: true });
        }
    }

    componentDidUpdate() {
        if (this.state.invalid) {
            this.setState({ invalid: false });
            this.getPageDateFetchs();
        }
    }

    createUrl(pageData){
        return `/Page/${pageData.pageId}/${pageData.name}`
    }

    getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) { return pair[1]; }
        }
        return "";
    }

    getPageDateFetchs() {
        let tags;
        try{
            let tagstr = this.getQueryVariable("tag");
            tags = JSON.parse(decodeURI(tagstr));
        }
        catch(ex){
            tags = []
        }

        let postData = {
            pageName: this.state.pageName,
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize,
            top: this.state.top,
            searchKey: this.state.searchKey,
            orderby: this.state.orderby,
            tags: tags
        }

        ieReduxFetch("/api/PageDataQuery/GetPageDatas", postData)
            .then(value => {
                value.pageDatas.forEach(pageData=>{
                    pageData.__proto__ = PageDataModel.prototype;
                    pageData.tags.forEach(tag=>{
                        tag.__proto__ = TagModel.prototype;
                    })
                })

                this.setState({ pageDatas: value.pageDatas, resourceNum: value.resourceNum });
            });
    }
}

BasePageLeafComponent.propTypes = {
    pageLeafSetting: PropTypes.object
}

BasePageLeafComponent.defaultProps = {
};

export default BasePageLeafComponent;