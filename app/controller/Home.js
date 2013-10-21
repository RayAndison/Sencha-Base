Ext.define('LTB.controller.Home', {
    extend: 'Ext.app.Controller',

    config: {
        routes: {
        	'home': 'showHome'
        },
        
        refs: {
        	currentView: {
        		selector: '.container[itemId=home]',
        		itemId: 'home',
        		xtype: 'home',
        		autoCreate: true
        	}
        }
    },
    
    showHome: function () {
    	Ext.Logger.log('[LTB.controller.Home] showHome');
    	var currentView = this.getCurrentView();
    	
    	Ext.Viewport.add(currentView);
    	Ext.Viewport.setActiveItem(currentView);
    }
});