sap.ui.define(
    [
        "sap/ui/core/UIComponent",
        "sap/ui/model/json/JSONModel",
        "./model/models"
    ],
    function (UIComponent, JSONModel, models) {
        "use strict";

        return UIComponent.extend(
            "project.staff.Component",
            {
                metadata: {
                    manifest: "json"
                },
                init: function () {
                    // call the base component's init function
                    UIComponent.prototype.init.apply(this, arguments);  // içinde bulunduğumuz bu fonksiyonu init olarak verdik

                    // set the device model
                    this.setModel(models.createDeviceModel(), "device");

                    // set the mock data model
                    this.setModel(models.createMockDataModel(), "staff");

                    // enable routing
                    this.getRouter().initialize();
                    
                }
            }
        );
    }
);