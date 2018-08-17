sap.ui.define([], function () {
	"use strict";
	return {
	
		wifiState: function (nNumber) {
			
			if (nNumber < 30) {
				return "Good";
			} else if (nNumber >= 30 && nNumber < 50) {
				return "Error";
			} else if (nNumber >= 50 && nNumber < 80) {
				return "Critical";
			} else {
				return sap.m.ValueColor.Good;
			}
		}
	};
});