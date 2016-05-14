'use strict';
let generator = require('yeoman-generator');
const path = require('path');


const baseName = path.basename(process.cwd());

const getBaseDir = () => {
    return baseName;
};

module.exports = generator.Base.extend({

    constructor: function () {
        generator.Base.apply(this, arguments);

        // default
        this.appname = getBaseDir().toLowerCase();
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
                default: this.appname
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
                choices: ['css', 'sass', 'less', 'stylus'],
                default: this.styleLang
            },
            {
                name: 'dependencies',
                message: 'Would you like to install dependencies?',
                default: 'Y/n',
                warning: 'Yes: Enabling this will be totally awesome!'
            }
        ]
        ).then(function (answers) {

        }.bind(this));
    },

    writing: function () {
        console.log('create folder structures');

        this.conflicter.force = true;

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                name: this.appname,
                version: this.version
            }
        );

        let ref = this;
        ['actions', 'components', 'containers', 'constants', 'reducers', 'routes'].forEach(function (item) {
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

  /*  install: function () {
        console.log('install app dependencies');
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
            'classnames',
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
    } */
});