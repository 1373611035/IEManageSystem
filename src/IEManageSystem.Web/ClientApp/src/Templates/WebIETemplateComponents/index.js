// 注册各个模板所需的部件
import Container, { RNDescribe as RNContainer } from "./Container"
// 动画组件，rn 没有
import IEAnimation from './IEAnimation'
import IEAudio, { RNDescribe as RNIEAudio } from './IEAudio'
// 底部导航栏，rn 没有
import IEBottomNav from "./IEBottomNav"
import IEButton, { RNDescribe as RNIEButton } from "./IEButton"
// 日历组件，rn 没有
import IECalendar from "./IECalendar"
import IECard, { RNDescribe as RNIECard } from "./IECard"
import IECarousel, { RNDescribe as RNIECarousel } from "./IECarousel"
import IECategoryLabel, { RNDescribe as RNIECategoryLabel } from "./IECategoryLabel"
import IEComment, { RNDescribe as RNIEComment } from "./IEComment"
import IEImg, { RNDescribe as RNIEImg } from "./IEImg"
import IEInfoGroup, { RNDescribe as RNIEInfoGroup } from "./IEInfoGroup"
import { RNDescribe as RNIELayout } from './IELayout'
import IELine, { RNDescribe as RNIELine } from "./IELine"
import IEMenu, { RNDescribe as RNIEMenu } from "./IEMenu"
import IEPlaceholder, { RNDescribe as RNIEPlaceholder } from './IEPlaceholder'
import IEPostList, { RNDescribe as RNIEPostList } from "./IEPostList"
import IERankingList, { RNDescribe as RNIERankingList } from "./IERankingList"
// 评分组件，rn 没有
import IERate from "./IERate"
import { RNDescribe as RNIEScrollbar } from './IEScrollbar'
import IESearch, { RNDescribe as RNIESearch } from "./IESearch"
// 选择框组件，rn 没有
import IESelect from "./IESelect"
import IETab, { RNDescribe as RNIETab } from './IETab'
import IETheme, { RNDescribe as RNIETheme } from './IETheme'
import { RNDescribe as RNIETwoDimensionalCode } from './IETwoDimensionalCode'
import IEVideo, { RNDescribe as RNIEVideo } from './IEVideo'
import NotFind, { RNDescribe as RNNotFind } from "./NotFind"
import RichTextEditor, { RNDescribe as RNRichTextEditor } from "./RichTextEditor"
import Text, { RNDescribe as RNText } from "./Text"

import TemplateBuilder from 'IETemplateComponents'

const describes = [
    Container,
    IEAnimation,
    IEAudio,
    IEBottomNav,
    IEButton,
    IECalendar,
    IECard,
    IECarousel,
    IECategoryLabel,
    IEComment,
    IEImg,
    IEInfoGroup,
    IELine,
    IEMenu,
    IEPlaceholder,
    IEPostList,
    IERankingList,
    IERate,
    IESearch,
    IESelect,
    IETab,
    IETheme,
    IEVideo,
    NotFind,
    RichTextEditor,
    Text
]

export default TemplateBuilder(describes);

const rnDescribes = [
    RNContainer,
    RNIEAudio,
    RNIEButton,
    RNIECard,
    RNIECarousel,
    RNIECategoryLabel,
    RNIEComment,
    RNIEImg,
    RNIEInfoGroup,
    RNIELayout,
    RNIELine,
    RNIEMenu,
    RNIEPlaceholder,
    RNIEPostList,
    RNIERankingList,
    RNIEScrollbar,
    RNIESearch,
    RNIETab,
    RNIETheme,
    RNIETwoDimensionalCode,
    RNIEVideo,
    RNNotFind,
    RNRichTextEditor,
    RNText
]

export const RNTemplate = TemplateBuilder(rnDescribes);