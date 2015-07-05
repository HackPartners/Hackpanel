'use strict';

module.exports = {
    app: {
        title: 'Hackpanel',
        description: 'Hack Partners control panel',
        keywords: 'Hack Partners Hackpanel'
    },
    assets: {
        lib: {
            js: [
                "app/node_modules/jquery/jquery.min.js",
                "app/node_modules/angular/angular.min.js",
                "app/node_modules/angular-ui-router/angular-ui-router.min.js",
                "app/node_modules/oclazyload/dist/ocLazyLoad.min.js",
                "node_modules/angular-mocks/angular-mocks.js"
            ]
        },
        css: [
			'app/application.css',
            'app/application.min.css'
        ],
        hackstrapJS: [
            'app/assets/hackstrap/js/transition.js',
            'app/assets/hackstrap/js/alert.js',
            'app/assets/hackstrap/js/button.js',
            'app/assets/hackstrap/js/carousel.js',
            'app/assets/hackstrap/js/collapse.js',
            'app/assets/hackstrap/js/dropdown.js',
            'app/assets/hackstrap/js/modal.js',
            'app/assets/hackstrap/js/tooltip.js',
            'app/assets/hackstrap/js/popover.js',
            'app/assets/hackstrap/js/scrollspy.js',
            'app/assets/hackstrap/js/tab.js',
            'app/assets/hackstrap/js/affix.js'
        ],
        less: [
            'app/**/*.less',

            '!app/assets/hackstrap/less/*.less',

            'app/assets/hackstrap/less/hackstrap.less',
            'app/assets/less/global.less',

            "!app/node_modules/**/*.less"
        ],
        js: [
            // Add core module
            'app/core/core.module.js',

            // Adding config
            'app/core/**/*.config.js',
            'app/modules/**/*.config.js',

            // Adding all modules
            'app/core/**/*.module.js',
            'app/modules/**/*.module.js',

            // Add services
            'app/**/services/*.service.js',

            // Add rest of files
            "app/core/**/*.js",
            "app/modules/**/*.js",

            // Exclude any non-project files
            "!app/assets/**/*.js",
            "!app/app.js",
            "!app/node_modules/**/*.js",
            "!app/**/*.test.js"
        ],
        tests: [
            'app/core/**/*test.js',
			'app/modules/**/*test.js',
        ]
    }
};