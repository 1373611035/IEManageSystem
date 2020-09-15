import React from 'react'
import IComponent from 'IETemplateComponents/IEPostList/IComponent'
import defaultImg from 'images/default_post_img.jpg'
import { withRouter } from 'react-router-native'
import { StyleSheet, Image, View } from 'react-native'

import { Button, Text, Card, CardItem } from 'native-base'

class Component extends IComponent {
    header() {
        return <View style={styles.sortView}>
            <Text>排序：</Text>
            <Button small style={styles.sortBtn} onPress={() => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Date" }) }}>
                <Text>发表时间</Text>
            </Button>
            <Button small style={styles.sortBtn} onPress={() => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Click" }) }}>
                <Text>点击量</Text>
            </Button>
            <Button small style={styles.sortBtn} onPress={() => { this.props.getPostFetchs({ ...this.props.postData, orderby: "Score" }) }}>
                <Text>评分</Text>
            </Button>
        </View>
    }

    createItem(post) {
        let setting = this.getCurrentSetting();

        let width = 100;
        if (setting.col > 0) {
            width = 100 / setting.col;
        }

        let heigth = new Number(setting.heigth).valueOf();
        if (isNaN(heigth) || heigth == 0) {
            heigth = 200
        }

        let source
        if (post.imageList.length > 0 && post.imageList[0]) {
            source = { uri: post.imageList[0] }
        }
        else {
            source = defaultImg;
        }

        return <View style={{ width: `${width}%`, paddingLeft: 5, paddingRight: 5, marginBottom: 10 }}>
            <Card>
                {
                    setting.isShowImg == "true" &&
                    <CardItem button cardBody
                        onPress={() => {
                            this.props.history.push(this.props.createUrl(post));
                        }}
                    >
                        <Image
                            style={{ height: heigth, width: "100%" }}
                            source={source}
                        />
                    </CardItem>
                }

                <CardItem button style={styles.itemTextArea}
                    onPress={() => {
                        this.props.history.push(this.props.createUrl(post));
                    }}
                >
                    <View style={{ width: '100%' }}>
                        <View>
                            <Text style={styles.itemTitle}>{post.title}</Text>
                            <Text style={styles.itemDescribe}>{post.describe || "暂无简介"}</Text>
                        </View>
                        <View style={styles.itemMeta}>
                            <Text style={styles.itemMetaText}>{`评分：${post.score} | 点击量：${post.click}`}</Text>
                            <Text style={[styles.itemMetaText, { textAlign: 'right' }]}>{new Date(post.creationTime).toLocaleDateString()}</Text>
                        </View>
                    </View>
                </CardItem>

            </Card>
        </View>
    }

    footer() {
        return <View style={styles.pageBtnView}>
            <Button small style={styles.pageBtn} disabled={this.props.postData.pageIndex <= 1} onPress={() => this.props.getPostFetchs({ ...this.props.postData, pageIndex: this.props.postData.pageIndex - 1 })}>
                <Text>上一页</Text>
            </Button>
            <Text style={styles.pageBtnText}>{`第 ${this.props.postData.pageIndex} 页`}</Text>
            <Button small style={styles.pageBtn} disabled={this.props.posts.length < this.props.postData.pageSize} onPress={() => this.props.getPostFetchs({ ...this.props.postData, pageIndex: this.props.postData.pageIndex + 1 })}>
                <Text>下一页</Text>
            </Button>
        </View>
    }

    render() {
        let Head = this.props.ChildComponent['head'];
        let ListItem = this.props.ChildComponent['listItem'];

        return (
            <View style={[this.baseStyle]}>
                {
                    Head ?
                        <Head interactivConfigFeature={this.getHeadInteractivConfigFeature()} />
                        : this.header()
                }
                <View style={styles.list}>
                    {this.props.posts.map(item => {
                        return ListItem ?
                            <ListItem interactivConfigFeature={this.getItemInteractivConfigFeature(item)} />
                            : this.createItem(item)
                    })}
                </View>
                {
                    this.footer()
                }
            </View>
        )
    }
}

const locale = {
    prevText: '上一步',
    nextText: '下一步',
};

const styles = StyleSheet.create({
    sortView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    sortBtn: {
        marginRight: 10
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "600"
    },
    itemDescribe: {
        marginTop: 10,
        fontWeight: '500',
        fontSize: 14
    },
    itemTextArea: {},
    itemMeta: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10
    },
    itemMetaText: {
        color: '#0008',
        fontSize: 12
    },
    pageBtnView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pageBtnText: {
        marginLeft: 10,
        marginRight: 10,
    },
    pageBtn: {
    }
})

export default withRouter(Component);
