import React from 'react'
import {BaseStaticComponent} from '../../BaseComponents/BaseStaticComponent';

class IEPostContent extends BaseStaticComponent {
    constructor(props) {
        super(props);
    }

    render() {
        let text = this.props.pageData.content || '<div class="ant-skeleton"><div class="ant-skeleton-content"><h3 class="ant-skeleton-title" style="width: 38%;"></h3><ul class="ant-skeleton-paragraph"><li></li><li></li><li style="width: 61%;"></li></ul></div></div>';

        return (<div dangerouslySetInnerHTML={{ __html: text }}></div>);
    }
}

IEPostContent.defaultProps = {
};

export default IEPostContent;