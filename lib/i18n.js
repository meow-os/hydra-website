document.addEventListener('DOMContentLoaded', () => {
    const userLanguage = navigator.languages

    i18next.init({
        lng: userLanguage,
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    currentLang:        'English',
                    ptLang:             'Portuguese',
                    enLang:             'English',

                    voxelLink:          'The Unstoppable Launcher.',

                    mainTextOne:        'Experience the ultimate',
                    mainTextTwo:        'repacks launcher app',

                    mobileDiscord:      'Meet us on discord',
                    mobileGithub:       "View source code",

                    descriptionOne:     'Hydra is a free, open source',
                    descriptionTwo:     '— and self-sufficient launcher',

                    // downloadButton:     'Download for Windows',
                    changeLog:          'Changelog',
                    sourceCodeButton:   'View Source Code',

                    cardOneTitle:       'Free',
                    cardTwoTitle:       'Open Source',
                    cardThreeTitle:     'No Ads',

                    cardOneTxtOne:      'We',
                    cardOneTxtTwo:      'don\'t care',
                    cardOneTxtThree:    'about',
                    cardOneTxtFour:     'your',
                    cardOneTxtFive:     'money',

                    cardTwoTxtOne:      'Feel free to read',
                    cardTwoTxtTwo:      'our',
                    cardTwoTxtThree:    'source code',

                    cardThreeTxtOne:    'Do you hate ads?',
                    cardThreeTxtTwo:    'We do it too!',
                }
            },
            pt: {
                translation: {
                    currentLang:        'Português',
                    ptLang:             'Português',
                    enLang:             'Inglês',

                    voxelLink:          '',

                    mainTextOne:        '',
                    mainTextTwo:        '',

                    descriptionOne:     '',
                    descriptionTwo:     '',

                    // downloadButton:     '',
                    changeLog:          '',
                    sourceCodeButton:   '',

                    cardOneTitle:       '',
                    cardTwoTitle:       '',
                    cardThreeTitle:     '',

                    cardOneTxtOne:      '',
                    cardOneTxtTwo:      '',
                    cardOneTxtThree:    '',
                    cardOneTxtFour:     '',
                    cardOneTxtFive:     '',

                    cardTwoTxtOne:      '',
                    cardTwoTxtTwo:      '',
                    cardTwoTxtThree:    '',

                    cardThreeTxtOne:    '',
                    cardThreeTxtTwo:    '',
                }
            }
        }
    }, () => {
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const key = element.getAttribute('data-i18n');
            element.textContent = i18next.t(key);
        });
    });
});

const Lang = {
    menu: document.querySelector('.language-box'),
    show: function() {
        this.menu.classList.add('show');
    },
    hide: function() {
        this.menu.classList.remove('show');
    }
};
