import { EmailTypeEnum } from '../enums/enums';

export const emailContent = {
    [EmailTypeEnum.WELCOME]: {
        subject: 'Welcome to account!',
        template: 'welcome',
        link: 'https://www.google.com/',
    },

    [EmailTypeEnum.RESULT]: {
        subject: 'Calculate mortgage amount!',
        template: 'result',
        link: 'https://www.google.com/',
    },

};
