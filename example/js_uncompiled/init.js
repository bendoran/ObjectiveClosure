goog.provide('oc.init');

//Dependancies
goog.require('oc.app.controller.FrontViewController');

/**
* @constructor
*/
oc.init = function( parent ){
	new oc.app.controller.FrontViewController( parent );
};

goog.exportSymbol('oc.init', oc.init);
