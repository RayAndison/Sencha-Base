Ext.define('LTB.util.strings.Strings', {
    singleton: true,
    alternateClassName: 'LTB.Strings',
    
   	requires: ['LTB.util.strings.de_DE.Strings'],
    
    config: {
    	strings: null
    },
    
    constructor: function (config) {
    	this.initConfig(config);
    },
    
    init: function(callback) {
    	//Ext.Logger.log('[LTB.util.Strings] index for language: ' + LTB.AppSettings.getCfg('lang') );
    	this.setStrings(eval('LTB.util.strings.' + LTB.AppSettings.getCfg('lang') + '.Strings'));
    	callback();
    },
    
    msg: function(key) {
    	var string = this.getStrings()[key];
    	
    	return string;
    }
});