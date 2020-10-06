import React from 'react';
import IComponent from 'BaseCMSManage/Components/BaseComponents/BaseComponent/BaseComponent'
import { ieReduxFetch } from "Core/IEReduxFetch"
import { Rate } from 'antd';

class Component extends IComponent {
    constructor(props) {
        super(props);

        this.score = this.score.bind(this);
    }

    score(value){
        ieReduxFetch("/api/PageDataManage/ScorePageData", {
            pageName: this.props.page.name,
            pageDataName: this.props.pageData.name,
            score: value
        });
    }

    render() {
        return (
            <div style={this.baseStyle}>
                <Rate count={10} value={this.props.pageData.score || 0} onChange={this.score} />
                <span className="ml-3">{`${this.props.pageData.scoreNum || 0} 人评分`}</span>
            </div>
        );
    }
}

export default Component;
