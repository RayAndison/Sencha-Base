Ext.define('LTB.view.Home', {
    extend: 'Ext.Container',
    xtype: 'home',
    
    config: {
    	
	},
	
	initialize: function () {
		this.addToolbar();	
	},
	
	addToolbar: function() {
		this.add({
			xtype: 'titlebar',
			docked: 'top',
			items: [{
				align: 'right',
				iconCls: 'list',
				actionId: 'showMenu'
			}]
		});
	}
	
});
