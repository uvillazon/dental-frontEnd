Ext.application({
    name: 'App',
    appFolder: 'App',
    launch: function () {
        Ext.tip.QuickTipManager.init();
        var panel = Ext.create('App.View.Principal.Principal', {
            app : this
            //            renderTo: 'contenido'
        });
    }
});
