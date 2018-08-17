sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"MW_DHA_IOT_DataCenterMonitor/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("MW_DHA_IOT_DataCenterMonitor.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
				//initialize router
			jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
			var router = this.getRouter();
			this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
			router.initialize();
		}
	});
});