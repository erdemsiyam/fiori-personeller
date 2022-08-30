sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel",
        "sap/ui/model/Filter",
        "sap/ui/model/FilterOperator",
        "sap/ui/core/Fragment",
        "sap/ui/model/Sorter"
    ],
    function (Controller, JSONModel, Filter, FilterOperator, Fragment, Sorter) {
        "use strict"

        return Controller.extend(
            "project.staff.controller.StaffList",
            {
                onInit: function () {
                    
                },
                onPressItem: function(oEvent){
                    // Get Current View
                    var oView = this.getView();
                    var oItem = oEvent.getSource();
                    var oSelectedStaff = oItem.getBindingContext("staff").getObject();
                    
                    

                    // Load the fragment
                    if(!this.byId("infoDialog")) { // fragmentin id'si(fragment.xml'de) if not exists, create
                        Fragment.load({
                            id: oView.getId(),
                            name: "project.staff.fragment.InfoDialog",
                            controller:{
                                // inner anonim controller yaptık buna
                                btnInfoDialogCloseOnClicked: function() {
                                    oView.byId("infoDialog").close();
                                }
                            }
                        }).then(
                            function(oDialog) {

                                // open dialog
                                oView.addDependent(oDialog); // connect the dialog to the root view of component (models, lifecycle)
                                oDialog.open();

                                // set model (https://answers.sap.com/questions/749337/table-row-binding-on-fragement.html)
                                var oModel = new JSONModel();
                                oModel.setData(oSelectedStaff);
                                oDialog.setModel(oModel);
                            }
                        );
                    } else { // if exists, just call it
                        this.byId("infoDialog").open();

                        // set model (https://answers.sap.com/questions/749337/table-row-binding-on-fragement.html)
                        var oModel = new JSONModel();
                        oModel.setData(oSelectedStaff);
                        this.byId("infoDialog").setModel(oModel);
                    }
                },
                onSearch: function(oEvent){
                    var oFilters= [];
                    var sQuery = oEvent.getParameter("query"); // Hali hazırda bir query varsa (filter,sort) bunları da dahil eder

                    if(sQuery){
                        oFilters.push(
                            new Filter(
                            {
                                    filters:[
                                        new Filter(
                                            {
                                                path: "name",
                                                operator: FilterOperator.Contains,
                                                value1: sQuery
                                            }
                                        ),
                                        new Filter(
                                            {
                                                path: "surname",
                                                operator: FilterOperator.Contains,
                                                value1: sQuery
                                            }
                                        ),
                                    ],
                                    and: false,
                            }
                            ),
                        );
                    }

                    // Filtrede de, sortta da tabloyu manipüle etme
                    var oTable = this.byId("table1");
                    var oBinding = oTable.getBinding("items"); // aggregationdaki itemleri aldık
                    oBinding.filter(oFilters);
                },
                btnSortOnClicked: function (){
                    // Get Current View
                    var oView = this.getView();

                    // Load the fragment
                    if(!this.byId("sortDialog")) { // fragmentin id'si(fragment.xml'de) if not exists, create
                        Fragment.load({
                            id: oView.getId(),
                            name: "project.staff.fragment.SortDialog",
                            controller: this, // bu controllerde halledeceğiz fonksiyonlarını
                        }).then(
                            function(oDialog) {
                                // open dialog
                                oView.addDependent(oDialog); // connect the dialog to the root view of component (models, lifecycle)
                                oDialog.open();
                            }
                        );
                    } else { // if exists, just call it
                        this.byId("sortDialog").open();
                    }
                },
                onSortDialogConfirm: function (oEvent) {

                    var oSortItem = oEvent.getParameter("sortItem"); // sort fragmentindeki sort elemanları (<sortItems>) alınır
                    var sColumnPath = "name"; // default sütun seçtik
                    var bDescending = oEvent.getParameter("sortDescending"); // viewSettings(fragment.xmldeki) default propertysi olan asc desc
                    var oSorters = [];

                    if(oSortItem){
                        sColumnPath = oSortItem.getKey(); // Sort sütun seçildiyse o sütun alınır (name idi)
                    }
                    oSorters.push(new Sorter(sColumnPath, bDescending));

                    // Filtrede de, sortta da tabloyu manipüle etme
                    var oTable = this.byId("table1");
                    var oBinding = oTable.getBinding("items"); // aggregationdaki itemleri aldık
                    oBinding.sort(oSorters);
                }
            }
        )
    }
)