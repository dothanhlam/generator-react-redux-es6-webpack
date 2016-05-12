'use strict';
let generator = require('yeoman-generator');
const path = require('path');


const baseName = path.basename(process.cwd());

const getBaseDir = () => {
    return baseName;
};

module.exports = generator.Base.extend({

    constructor: function() {
        generator.Base.apply(this, arguments);
        this.appname = getBaseDir().toLowerCase();
    },

    prompting: function () {
        return this.prompt({
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.appname
        }).then(function (answers) {
        }.bind(this));
    },

    writing: function() {
        this.conflicter.force = true;

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'), {
                name: this.appname
            }
        );

        var ref = this;
        ['actions', 'components', 'containers', 'constants', 'reducers', 'routes'].
        forEach(function(item) {
            ref.fs.copy(
                ref.templatePath(item+'/index.js'),
                ref.destinationPath('app/'+item+'/index.js')
            );
        });
    }
});