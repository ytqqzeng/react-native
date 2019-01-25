import { HelpApi } from '../config/api/helpCenter'
import Fetch from "../util/fetchRequest";

export default class HelpCenterModel {
    static getTitleFn() {
        return Fetch.fetchGet(HelpApi.getTitle)
    }
    static getHelpPage(params) {
        return Fetch.fetchGet(HelpApi.getHelpPage, params )
        .catch ((error)=>{
            console.warn('error::获取页面错误',error);
            return false
        })
    }
}