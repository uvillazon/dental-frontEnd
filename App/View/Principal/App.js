/* File Created: August 4, 2013 */

Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath('App', 'App')
Ext.require([
    'App.*'
]);
if(window.localStorage.length === 0){
    //alert("as");
    document.location = 'logon';

}
else{
    console.dir(window.localStorage);
}
Ext.application({
    name: 'App',
    appFolder: 'App',
    controllers: ["App.controller.Proformas.Proformas"],
    launch: function () {
        Ext.tip.QuickTipManager.init();
        var panel = Ext.create('App.View.Proformas.Principal', {
            app : this
            //            renderTo: 'contenido'
        });
    }
});
