Ext.define('LTB.controller.Viewport', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            '#ext-viewport': { activeitemchange: 'onContainerActiveItemChange' },
            '.button[ui=back]': { tap: 'onBackButtonTap' },
            '.button[actionId=showMenu]': { tap: 'toggleSideMenu' }
        }
    },
    
    launch: function () {
		this.addSideMenu();
    },
    
    /**
   	 * add a side Menu on the right side
     */
    addSideMenu: function () {
    	var menu = Ext.create('LTB.view.sideMenu.Menu');
    	
    	Ext.Viewport.setMenu(menu, {
    		side: 'right',
    		cover: false
		})
    },
    
    toggleSideMenu: function () {
    	Ext.Viewport.toggleMenu('right');
    },

    /**
     * remove and destroy the old card
     * @param {Ext.Container} container
     * @param {int} value
     * @param {int} oldValue
     */
    onContainerActiveItemChange: function (container, item, oldItem) {
        if (oldItem !== 0) {
            oldItem.destroy();
        }
    },

    /**
     * Covers all back buttons, except the hardware back button
     */
    onBackButtonTap: function () {
        LTB.History.back();
    }
});