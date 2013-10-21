Ext.define('LTB.util.Initialize', {
    singleton: true,
    alternateClassName: 'LTB.Init',
    
    config: {

    },
    
    constructor: function (config) {
    	this.initConfig(config);
    },
    
    init: function() {
    	Ext.Logger.log('[LTB.util.Initialize] init');
    	
    	// load settings module
    	LTB.AppSettings.init();
    	
    	// load strings module
    	LTB.Strings.init(Ext.bind(this.ready, this));
    },
    
    ready: function () {
    	Ext.Logger.log('[LTB.util.Initialize] ready');
    	
    	LTB.History.backTo('home');
    }
});