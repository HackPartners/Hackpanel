'use strict';

module.exports = {
    app: {
        title: 'Hackpanel',
        description: 'Hack Partners control panel',
        keywords: 'Hack Partners Hackpanel'
    },
    assets: {
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
            'app/core/config/*.config.js',

            // Adding all modules
            'app/core/**/*.module.js',
            'app/modules/**/*.module.js',

            // Add services
            'app/**/services/*.service.js',

            // Add rest of files
            "app/**/*.js",

            // Exclude any non-project files
            "!app/assets/**/*.js",
            "!app/app.js",
            "!app/node_modules/**/*.js"
        ],
        tests: [
			'app/**/*test*.js',
            "!app/node_modules"
        ]
    }
};