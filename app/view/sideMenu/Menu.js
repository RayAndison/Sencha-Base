Ext.define('LTB.view.sideMenu.Menu', {
    extend: 'Ext.Menu',
    
    xtype: 'sideMenu',
    
    config: {
    	width: '70%',
    	scrollable: 'vertical',
    	items: [
    	    {
    	    	xtype: 'button',
    	        text: 'Opening',
    	        iconCls: 'time',
    	        menu:"opening"
    	    },
    	    {
    	        xtype: 'button',
    	        text: 'Theatres',
    	        iconCls: 'locate',
    	        menu: "theatres"
    	    },
    	    {
				xtype: 'button',
    	        text: 'Upcoming',
    	        iconCls: 'team',
    	        menu:"upcoming"
    	    },
    	    {
				xtype: 'button',
    	        text: 'Top',
    	        iconCls: 'bank',
    	        menu:'top'
    	    },
    	    {
				xtype: 'button',
    	        text: 'Search',
    	        iconCls: 'search',
    	        menu:"search"
    	    }
    	]
	}
});
