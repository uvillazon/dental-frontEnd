Ext.define("App.View.Principal.Principal", {
    extend: "Ext.Viewport",
    requires: [
		"App.Config.Constantes",
        "App.Config.Funciones"
    ],
    title: 'Principal',
    layout: 'border',
    frame: false,
    defaults: {
        split: false
    },
    code: 'es',
    app : null,
    initComponent: function () {
        var me = this;
        //
        // //creamos un componente
        Constantes.CargarTamano();
        Constantes.CargarHost();
        me.bbar_pie = new Ext.Toolbar({
            iconCls: 'an-icon',
            statusAlign: 'right',
            items: [
                {
                    iconCls: 'calendar',
                    text: Ext.Date.format(new Date(), 'd/n/Y'),

                }, '-', {
                    id: 'clock',
                    //                iconCls         : 'time',
                    text: Ext.Date.format(new Date(), 'g:i:s A')
                },
                        {
                            xtype: 'label',
                            //width: 800,
                            padding: '0 100 0 0',
                            autoHeight: true,
                            html: Constantes.PIEPAGINA,
                            border: false

                        },

                         '->'
                        , me.progress

            ]

        });

        me.panel_centro = new Ext.TabPanel({
            activeItem: 0,
            region: 'center',
            margins: '1 0 0 0',
            autoHeigth: true,
            enableTabScroll: true,
            itemId: 'maintab', /* necesito para encontrar la referencia en el controller principal*/
            plain: true,
            defaults: { autoScroll: true, layout: 'fit' },
            items: [{
                title: 'Sistema Dental',
                iconCls: 'application_home',
                // items: me.panel

            }
            ]

        });

        me.panel_cabecera = Ext.create("App.View.Principal.Cabecera", { tabPanel: me.panel_centro , app : me.app});
        me.panel_pie = new Ext.Panel({
            region: 'south',
            border: true,
            margins: '0 0 1 0',
            //height: 30,
            bbar: me.bbar_pie

        });

        // me.items= [
        //     {
        //         region: 'north',
        //         html: '<h1 class="x-panel-header">Page Title</h1>',
        //         border: false,
        //         margins: '0 0 5 0'
        //     }, {
        //         region: 'west',
        //         collapsible: true,
        //         title: 'Navigation',
        //         width: 150
        //         // could use a TreePanel or AccordionLayout for navigational items
        //     }, {
        //         region: 'south',
        //         title: 'South Panel',
        //         collapsible: true,
        //         html: 'Information goes here',
        //         split: true,
        //         height: 100,
        //         minHeight: 100
        //     }, {
        //         region: 'east',
        //         title: 'East Panel',
        //         collapsible: true,
        //         split: true,
        //         width: 150
        //     }, {
        //         region: 'center',
        //         xtype: 'tabpanel', // TabPanel itself has no title
        //         activeTab: 0,      // First tab active by default
        //         items: {
        //             title: 'Default Tab',
        //             html: 'The first tab\'s content. Others may be added dynamically'
        //         }
        //     }
        //
        // ];
        me.items = [ me.panel_cabecera ,me.panel_centro, me.panel_pie];
        me.InicializarRunner();

        this.callParent();
    },
    doLoad: function (url, successFn) {
        Ext.Ajax.request({
            url: url,
            disableCaching: false,
            success: successFn,
            failure: function () {
                Ext.Msg.alert('Failure', 'Failed to load locale file.');
                //renderUI();
            }
        });
    },
    InicializarRunner: function () {
        var me = this;
        me.runner = new Ext.util.TaskRunner();
        me.task = me.runner.newTask({
            run: Funciones.ActualizarReloj,
            interval: 1000
        });

        me.task.start();
    },
});














