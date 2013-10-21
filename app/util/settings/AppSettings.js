Ext.define('LTB.util.settings.AppSettings', {
	extend: 'LTB.util.settings.Abstract',
	singleton: true,
	alternateClassName: 'LTB.AppSettings',
	
	config: {
		name: 'appsettings',
		defaults: {
			'lang': 'de_DE'
		}
	}
});