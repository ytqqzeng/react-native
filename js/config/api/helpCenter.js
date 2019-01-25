import { env } from '../index';

const ROOT_URL = `${env.apiHost}/`;

export const HelpApi = {
    getTitle: {
        url: `${ROOT_URL}shop/api/shop/help-ext/get-help-list.do`,
        method: 'GET'
    },
    getHelpPage: {
        url: `${ROOT_URL}shop/api/shop/help-ext/get-help.do`,
        method: 'GET'
    }
   
}
