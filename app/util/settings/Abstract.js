Ext.define('LTB.util.settings.Abstract', {

	config: {
		name: 'default',
		defaults: {},
		prefix: 'cfg-',
		configs: {}
	},
	
	constructor: function (config) {
		this.initConfig(config);
	},
	
	init: function () {	
		this._loadCfgs();
	},
	
	/**
	 * private
	 * Load the configs. Setup defaults if configs have not been set yet
	 */
	_loadCfgs: function () {
		// load saved config objec from localstorage 
		var tmp = Ext.JSON.decode(localStorage.getItem(this._cfgName()));
		
		// setup new default configs if no former configs could be found
		if (Ext.isEmpty(tmp)) {
			this._setupCfgs();
		} else {
			this.setConfigs(tmp);
		}
	},
	
	/*
	 * Create localstorage id of prefix and config name
	 * @return The localstorage id
	 */
	_cfgName: function () {
		return this.getPrefix() + this.getName();
	},
	
	/**
	 * private
	 * Setup the configs: overwrite and set to default values
	 */
	_setupCfgs: function (reset) {
		var defaults = this.getDefaults();
		
		this.setCfg(defaults, reset);
	},
	
	/**
	 * Get the value of a single config
	 * @return Single config value
	 */
	getCfg: function (cfgName) {
		return this.getConfigs()[cfgName];
	},
	
	/**
	 * Set the value of a single or multiple configs
	 * @param cfgs An object with settings
	 */
	setCfg: function (cfgs, reset) {
		var tmpCfg = reset ? {} : this.getConfigs(),
			tmpDefaults = this.getDefaults();
			
		// set to defaults
		for (property in cfgs) {
			if (Ext.isEmpty(tmpDefaults[property])) {
				Ext.Logger.warn('Setting config "' + property + '" in settings manager "' + this.getName() + '" without a default value set. This property will be removed upon reset.');
			}
			
			tmpCfg[property] = Ext.clone(cfgs[property]);				
		}
		
		// save config object to localstorage
		localStorage.setItem(this._cfgName(), Ext.JSON.encode(tmpCfg));
		this.setConfigs(tmpCfg);
	},
	
	/**
	 * Reset all configs and set them to default
	 */
	reset: function () {
		this._setupCfgs(true);
	}
});