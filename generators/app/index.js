'use strict';
let generator = require('yeoman-generator');
const path = require('path');
const _ = require('lodash');


const baseName = path.basename(process.cwd());

const getBaseDir = () => {
    return baseName;
};

module.exports = generator.Base.extend({

    constructor: function () {
        generator.Base.apply(this, arguments);

        // default
        this.appName =  _.camelCase(getBaseDir());
        this.root = "app";
        this.version = "0.1.0";
        this.styleLang = "css";
        this.installingDependencies = false;
    },

    prompting: function () {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appName
            },
                {
                    type: 'input',
                    name: 'version',
                    message: 'Your project version',
                    default: this.version
                },
            {
                type: 'list',
                name: 'style',
                message: 'Which style language do you want to use?',
                choices: ['css', 'sass'],
                default: this.styleLang
            },
            {
                name: 'dependencies',
                message: 'Would you like to install dependencies?',
                default: 'Y/n',
                warning: 'Yes: Enabling this will install all default dependencies!'
            }
        ]
        ).then(function (answers) {
                let dependencies = _.lowerCase(_.trim(answers.dependencies));
                this.installingDependencies = _.indexOf(["yes", "y n"], dependencies) >= 0;
                this.styleLang = answers.style;
                this.version = answers.version;
                this.appName = _.camelCase(answers.name);
        }.bind(this));
    },

    writing: function () {
        console.log('Creating folder structures ...');
        let ref = this;

        this.conflicter.force = true;
        ['_package.json',
            '_.gitignore']
        .forEach(function(item) {
                ref.fs.copy(
                    ref.templatePath(item),
                        ref.destinationPath(_.trim(item, '_')), {
                        name: ref.appName,
                        version: ref.version
                    }
                )
            });

            ['./',
            'actions',
            'components',
            'containers',
            'constants',
            'reducers',
            'routes',
            'stores']
            .forEach(function (item) {
            ref.fs.copy(
                ref.templatePath(item + '/index.js'),
                ref.destinationPath(ref.root +'/' + item + '/index.js')
            );
        });

        this.fs.copy(
            this.templatePath('app.ejs'),
            this.destinationPath(ref.root +'/app.js')
        );
    },

    install: function () {
        if (!this.installingDependencies) {
            return;
        }

        console.log('Installing dependencies ...');
        return;
        this.npmInstall([
            'flux',
            'marked',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-immutable-proptypes',
            'react-transform-catch-errors',
            'react-transform-hmr',
            'react-addons-css-transition-group',
            'react-addons-update'], {save: true});

        console.log('install dev dependencies');

        this.npmInstall([
            'babel-core',
            'babel-jest',
            'babel-loader',
            'babel-plugin-react-transform',
            'babel-plugin-transform-decorators-legacy',
            'babel-plugin-transform-runtime',
            'babel-polyfill',
            'babel-preset-es2015',
            'babel-preset-react',
            'babel-preset-stage-0',
            'babel-register',
            'babel-runtime',
            'cross-env',
            'css-loader',
            'expect',
            'flux-standard-action',
            'html-webpack-plugin',
            'jsdom',
            'mocha',
            'node-sass',
            'sass-loader',
            'style-loader',
            'webpack',
            'webpack-dev-server'], {saveDev: true});

        if (this.styleLang == "sass") {
            this.npmInstall([
                'css-loader',
                'node-sass',
                'sass-loader',
                'style-loader',
            ], {saveDev: true});
        }
    }
});