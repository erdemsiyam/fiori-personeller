sap.ui.define(
    [
        "sap/ui/core/mvc/XMLView",
    ],
    function (XMLView) {
        "use strict";

        // App.view Binding
        var oView = new XMLView({
            viewName: "staff.view.App"
        });
        oView.placeAt("content");
    }
);