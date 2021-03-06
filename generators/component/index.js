'use strict';
let generator = require('yeoman-generator');

module.exports = generator.Base.extend({

    constructor: function () {
        generator.Base.apply(this, arguments);
        this.argument('name', {type: String, required: true});
    },

    writing: function () {
        console.log('writing ...');
        this.fs.copyTpl(
            this.templatePath('component.ejs'),
            this.destinationPath(this.name.toLowerCase() + '.js'),
            {name: this.name}
        );
    }
});