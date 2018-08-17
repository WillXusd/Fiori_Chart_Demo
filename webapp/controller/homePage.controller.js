sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"MW_DHA_IOT_DataCenterMonitor/model/formatter"
], function(Controller, JSONModel, FlattenedDataset, FeedItem, formatter) {
	"use strict";

	var oPageController = Controller.extend("MW_DHA_IOT_DataCenterMonitor.controller.homePage", {
		/* ============================================================ */
		/* Constants                                                    */
		/* ============================================================ */
		/**
		 * Constants used in the example.
		 *
		 * @private
		 * @property {String} sampleName Name of the chart container sample
		 * @property {Object} vizFrame Viz Frame used in the view
		 * @property {String} vizFrame.id Id of the Viz Frame
		 * @property {Object} vizFrame.dataset Config used for the Viz Frame Flattened data
		 * @property {Object[]} vizFrame.dataset.dimensions Flattened data dimensions (x)
		 * @property {Object[]} vizFrame.dataset.measures Flattened data measures (y)
		 * @property {Object} vizFrame.dataset.data Flattened data other config
		 * @property {Object} vizFrame.dataset.data.path Flattened data path
		 * @property {String} vizFrame.modulePath Path to the module's data
		 * @property {String} vizFrame.type Viz Frame Type
		 * @property {Object} vizFrame.properties Viz Frame properties
		 * @property {Object} vizFrame.properties.plotArea Viz Frame plot area property
		 * @property {Object} vizFrame.properties.plotArea.showGap Viz Frame plot area property
		 * @property {Object[]} vizFrame.feedItems Viz Frame feed items
		 */
		formatter: formatter,
		_constants: {
			sampleName: "MW_DHA_IOT_DataCenterMonitor",
			vizFrame: {
				id: "chartContainerVizFrame",
				dataset: {
					//x 轴
					dimensions: [{
						name: 'Tem',
						value: "{Tem}"
					}],
					//y 轴
					measures: [{
						name: 'Profit',
						value: '{Profit}'
					}, {
						name: 'Revenue',
						value: '{Revenue}'
					}],
					data: {
						path: "/Products"
					}
				},
				modulePath: "../../model/mock-lineChartData.json",
				type: "column",
				properties: {
					plotArea: {
						referenceLine: {
							line: self.lines
						},
						showGap: false
					},
					title: {
						visible: false
					},
					valueAxis: {
						title: {
							visible: false
						}
					},
					categoryAxis: {
						title: {
							visible: false
						}
					}
				},
				feedItems: [{
					'uid': "primaryValues",
					'type': "Measure",
					'values': ["Revenue", "Profit"]
				}, {
					'uid': "axisLabels",
					'type': "Dimension",
					'values': ["Tem"]
				}]
			}
		},
		_constantsLine: {
			sampleName: "MW_DHA_IOT_DataCenterMonitor",
			vizFrame: {
				id: "chartContainerVizFrameLine",
				dataset: {
					//x 轴
					dimensions: [{
						name: 'Tem',
						value: "{Tem}"
					}],
					//y 轴
					measures: [{
						name: 'Profit',
						value: '{Profit}'
					}, {
						name: 'Revenue',
						value: '{Revenue}'
					}],
					data: {
						path: "/Products"
					}
				},
				modulePath: "../../model/mock-lineChartData.json",
				type: "line",
				properties: {
					plotArea: {
						referenceLine: {
							line: {
								valueAxis: [{
									value: 25,
									visible: true,
									label: {
										visible: true
									},
									color: '#DE1E1F'
								}, {
									value: 14,
									visible: true,
									label: {
										visible: true
									},
									color: '#DE1E1F'
								}]
							}
						},
						showGap: false

					},
					title: {
						visible: false
					},
					valueAxis: {
						title: {
							visible: false
						}
					},
					categoryAxis: {
						title: {
							visible: false
						}
					}
				},
				feedItems: [{
					'uid': "primaryValues",
					'type': "Measure",
					'values': ["Revenue", "Profit"]
				}, {
					'uid': "axisLabels",
					'type': "Dimension",
					'values': ["Tem"]
				}]
			}
		},
		_constantsNSD: {
			sampleName: "MW_DHA_IOT_DataCenterMonitor",
			vizFrame: {
				id: "chartContainerVizFrameLine",
				dataset: {
					//x轴
					dimensions: [{
						name: 'Tem',
						value: "{Tem}"
					}],
					//y轴
					measures: [{
						name: 'Profit',
						value: '{Profit}'
					}, {
						name: 'Revenue',
						value: '{Revenue}'
					}],
					data: {
						path: "/Products" //?
					}
				},
				modulePath: "../../model/mock-lineChartData.json",
				type: "line",
				properties: {
					plotArea: {
						showGap: false
					},
					title: {
						visible: false
					},
					valueAxis: {
						title: {
							visible: false
						}
					},
					categoryAxis: {
						title: {
							visible: false
						}
					}
				},
				feedItems: [{
					'uid': "primaryValues",
					'type': "Measure",
					'values': ["Revenue", "Profit"]
				}, {
					'uid': "axisLabels",
					'type': "Dimension",
					'values': ["Tem"]
				}]
			}
		},
		/* ============================================================ */
		/* Life-cycle Handling                                          */
		/* ============================================================ */
		/**
		 * Method called when the application is initalized.
		 *
		 * @public
		 */
		onInit: function() {
			var oVizFrame = this.getView().byId("chartContainerVizFrame");
			var oVizFrameLine = this.getView().byId("chartContainerVizFrameLine");
			var oVizFrameNSD = this.getView().byId("chartContainerVizFrameNSD");
			this._updateVizFrame(oVizFrame);
			this._updateVizFrameLine(oVizFrameLine);
			this._updateVizFrameNSD(oVizFrameNSD);
			var oWifiModel = new JSONModel();
			oWifiModel.setData([{
				name: "DLW_DHA_Evaluate",
				value: 10
			},{
				name: "DLW_DHA_Guest",
				value: 20
			}]);
			this.getView().setModel(oWifiModel, "oWifiModel");
		},
		/* ============================================================ */
		/* Helper Methods                                               */
		/* ============================================================ */
		/**
		 * Updated the Viz Frame in the view.
		 *
		 * @private
		 * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame that needs to be updated
		 */
		_updateVizFrame: function(vizFrame) {
			var oVizFrame = this._constants.vizFrame;
			var oVizFramePath = jQuery.sap.getModulePath(this._constants.sampleName, oVizFrame.modulePath);
			var oModel = new JSONModel(oVizFramePath);
			var oDataset = new FlattenedDataset(oVizFrame.dataset);
			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			vizFrame.setModel(oModel);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},
		_updateVizFrameLine: function(vizFrame) {
			var oVizFrame = this._constantsLine.vizFrame;
			var oVizFramePath = jQuery.sap.getModulePath(this._constantsLine.sampleName, oVizFrame.modulePath);
			var oModel = new JSONModel(oVizFramePath);
			var oDataset = new FlattenedDataset(oVizFrame.dataset);
			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			vizFrame.setModel(oModel);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},
		
		_updateVizFrameNSD: function(vizFrame) {
			var oVizFrame = this._constantsNSD.vizFrame;
			var oVizFramePath = jQuery.sap.getModulePath(this._constantsNSD.sampleName, oVizFrame.modulePath);
			var oModel = new JSONModel(oVizFramePath);
			var oDataset = new FlattenedDataset(oVizFrame.dataset);
			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			vizFrame.setModel(oModel);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},
		/**
		 * Adds the passed feed items to the passed Viz Frame.
		 *
		 * @private
		 * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame to add feed items to
		 * @param {Object[]} feedItems Feed items to add
		 */
		_addFeedItems: function(vizFrame, feedItems) {
			for (var i = 0; i < feedItems.length; i++) {
				vizFrame.addFeed(new FeedItem(feedItems[i]));
			}
		}

	});
	return oPageController;
});