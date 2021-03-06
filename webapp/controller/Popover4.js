sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(ManagedObject, MessageBox, Utilities, History) {

	return ManagedObject.extend("com.sap.build.standard.untitledPrototype.controller.Popover4", {
		constructor: function(oView) {
			this._oView = oView;
			this._oControl = sap.ui.xmlfragment(oView.getId(), "com.sap.build.standard.untitledPrototype.view.Popover4", this);
			this._bInit = false;
		},

		exit: function() {
			delete this._oView;
		},

		getView: function() {
			return this._oView;
		},

		getControl: function() {
			return this._oControl;
		},

		getOwnerComponent: function() {
			return this._oView.getController().getOwnerComponent();
		},

		open: function() {
			var oView = this._oView;
			var oControl = this._oControl;

			if (!this._bInit) {

				// Initialize our fragment
				this.onInit();

				this._bInit = true;

				// connect fragment to the root view of this component (models, lifecycle)
				oView.addDependent(oControl);
			}

			var args = Array.prototype.slice.call(arguments);
			if (oControl.open) {
				oControl.open.apply(oControl, args);
			} else if (oControl.openBy) {
				oControl.openBy.apply(oControl, args);
			}
		},

		close: function() {
			this._oControl.close();
		
		},

		setRouter: function(oRouter) {
			this.oRouter = oRouter;

		},
		getBindingParameters: function() {
			return {};

		},
		
		_onAddMember: function(){
			//get all inserted/needed fields BY ID (you can access fields from detail page)
			var projectId = this.getView().byId("projectId").getText();
			var userId = this.getView().byId('comboboxUsers').getSelectedKey();
			var functionMember = this.getView().byId('memberFunction').getValue();
			//check if all required fields are submitted
			if (projectId === "" || userId === "" || functionMember === ""){
				sap.m.MessageToast.show('All fields are required');
			} else {
				var oModel = this.getView().getModel(); 
				//create your json object (based on the odata/cds!!)
				var oData = {
						UserId : parseInt(userId,10),
						Name : null,
						ProjectId : parseInt(projectId,10),
						Role : functionMember,
						Deleted : 0
				};
					//(only for update/insert //get csfr token)
					jQuery.ajax("/",{
						  type: "GET",
						  contentType: 'application/json',
						  dataType: 'json',
						  beforeSend: function(xhr){
						    xhr.setRequestHeader('X-CSRF-Token', 'fetch');
						  },
						  done : function(response) {
						        oModel.setRequestHeader("X-CSRF-Token",response.getResponseHeader('X-CSRF-Token'));
						    }});
					//oModel.update("</yourset>", oData<created_entity)
					oModel.create("/TeamMemberSet", oData, {
					  merge: true, //updates changed fields
					  success: function() { },
					  error: function(oError) { }
					});
					
					}
		},
		
		onInit: function() {
			var dropdown = new sap.m.ComboBox('comboboxUsers');
			
			  var itemTemplate = new sap.ui.core.ListItem({
			  text : "{Name}",
			  key :"{UserId}"
			  });
			
			dropdown.bindItems("/UserSet",itemTemplate);
			this._oDialog = this.getControl();

		},
		onExit: function() {
			this._oDialog.destroy();
		}

	});
}, /* bExport= */ true);
