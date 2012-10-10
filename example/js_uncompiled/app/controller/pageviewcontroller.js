goog.provide('oc.app.controller.PageViewController');

goog.require('bdoran.mvc.ViewController');
goog.require('goog.ui.Container');

/**
* @constructor
*/
oc.app.controller.PageViewController = function( pageTitle ){
	this.pageTitle = pageTitle;
	goog.base( this, "AocountViewController" );
};
goog.inherits( oc.app.controller.PageViewController, bdoran.mvc.ViewController );


/**
 * @private
 */
oc.app.controller.PageViewController.prototype.pageTitle = null;

/**
 * @override
 */
oc.app.controller.PageViewController.prototype.createView = function(){
	var container = new goog.ui.Container();
	var element = document.createElement('div');
	container.decorateInternal( element );
	container.getElement().setAttribute('class','page');
	container.getContentElement().innerHTML = "<h1>"+this.pageTitle+"<h1/>";
	this.view = container;
};