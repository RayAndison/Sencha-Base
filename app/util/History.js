/**
 * @class LTB.util.helpers.History
 * @alternateClassName LTB.History
 * @singleton
 *
 * @author Torsten Dinkheller
 * @author Annika Külzer for some fixes and additions
 *
 * Use this class to go back any point in the history.
 *
 *      LTB.History.backTo('home');
 *
 * Further functionality uses the Sencha History
 * To use the HTML history-like functions you can use
 *
 *      LTB.History.back();
 *      LTB.History.home();
 *
 * Same functionality as history.go(-number)
 * With our functionality you have to add a positive number, while the browser usually takes a negative one
 *
 *      LTB.History.go(number);
 *
 */
Ext.define('LTB.util.History', {
    singleton: true,
    alternateClassName: 'LTB.History',

    HOME: 'home',
    LEAVEATHOME: true,
    isMasked: false,
    viewBeforeBackClick: '',

    /**
     * Go back one step
     * if the current view is masked do not allow to go back
     *
     * @public
     */
    back: function () {
        //console.log('[LTB.util.helpers.History] back ');
        this.viewBeforeBackClick = Ext.Viewport.getActiveItem().getItemId();

        // be sure to remove mask
        Ext.Viewport.setMasked(false);

		// abort any outstanding requests
        Ext.Ajax.abort();

        var activeView = Ext.Viewport.getActiveItem();

        // Check if home then exit app
        if (this.LEAVEATHOME && this.viewBeforeBackClick === this.HOME) {
            if (Ext.browser.is.PhoneGap) {
                Ext.device.Notification.show({
                    title: LTB.Strings.msg('prompt'),
                    message: LTB.Strings.msg('prompt_message_stop_app'),
                    buttons: [Ext.MessageBox.CANCEL, Ext.MessageBox.OK],
                    callback: function (button) {
                        if (button === "ok") {
                            navigator.app.exitApp();
                        }
                    }
                });
            }
        } else {
            // Main back functionality
            this.go(1);
        }
    },

    skipAndGo: function (pageName) {
        //console.log('[LTB.util.helpers.History] skipAndGo ' + pageName);
        LTB.app.getHistory().getActions().pop();
        LTB.app.redirectTo(pageName);
    },

    /**
     * Go back to a certain page name
     *
     * @param {String} pageName
     */
    backTo: function (pageName) {
        //console.log('[LTB.util.helpers.History] backTo ' + pageName);
        var isInHistory = false,
            myArray = LTB.app.getHistory().getActions();

        for (var i = myArray.length; i > 0; i--) {
            if (pageName === myArray[i - 1].getUrl()) {
                this.go(myArray.length - i);
                isInHistory = true;
                break;
            }
        }

        // If the page could not be found in the history, go forward
        if (isInHistory === false) {
            LTB.app.redirectTo(pageName);
        }
    },

    /**
     * Go to the home view
     */
    home: function () {
        this.backTo(this.HOME);
    },

    /**
     * Same as the history.go(-n) method, but here we add a positive value
     * This shortens Sencha history and goes back in browser history
     *
     *     LTB.history.go(4);
     *
     * @param {Number} steps
     */
    go: function (steps) {
        //console.log('[LTB.util.helpers.History] go back ' + steps + ' steps');
        var urls = LTB.app.getHistory().getActions();
        for (var i = 0; i < steps; i++) {
            urls.pop();
        }
        var goToView = urls.pop();
        LTB.app.redirectTo(goToView.getUrl())
    },

    /**
     * set-masked and un-mask the view
     * @param setMask
     * @param {String} [message='Lade...']
     *
     */
    setMasked: function (setMask, message) {
        setMask = setMask || false;
        if (setMask) {
            this.isMasked = true;
            message = message || LTB.Strings.msg('loading');
            Ext.Viewport.mask({
                xtype: 'loadmask',
                message: message
            });
        } else {
            Ext.Viewport.setMasked(false);
            this.isMasked = false;
        }
    }
});
