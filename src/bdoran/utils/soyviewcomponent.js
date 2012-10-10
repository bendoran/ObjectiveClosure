goog.provide('bdoran.utils.SoyViewComponent');

goog.require('goog.ui.Component');

/**
* @constructor
*/
bdoran.utils.SoyViewComponent = function( soyTemplate, opt_dom_helper ){
	goog.base( this, opt_dom_helper );
	this.soyTemplate_ = soyTemplate;
};
goog.inherits( bdoran.utils.SoyViewComponent, goog.ui.Component );

bdoran.utils.SoyViewComponent.prototype.soyTemplate_ = null;

bdoran.utils.SoyViewComponent.prototype.createDom = function(){
	var element = soy.renderAsElement( this.soyTemplate_, this.getModel() );
	this.decorateInternal( element );
};

/**
 * @override
 */
bdoran.utils.SoyViewComponent.prototype.canDecorate = function(){
	return false;
};