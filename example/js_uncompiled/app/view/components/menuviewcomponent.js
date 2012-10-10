goog.provide('oc.app.view.components.MenuViewComponent');

goog.require('bdoran.utils.SoyViewComponent');
goog.require('oc.app.view.templates.ViewComponentTemplates');
goog.require('goog.events.EventType');
goog.require('goog.events');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('soy');

/**
* @constructor
*/
oc.app.view.components.MenuViewComponent = function( menuItems, opt_dom_helper ){
	if( goog.isDefAndNotNull( menuItems ) ){
		this.setModel( menuItems );
	}
	goog.base( this, oc.app.view.templates.ViewComponentTemplates.MenuTemplate, opt_dom_helper );
};
goog.inherits( oc.app.view.components.MenuViewComponent, bdoran.utils.SoyViewComponent );

oc.app.view.components.MenuViewComponent.EventType = {
		MENU_ITEM_CLICK : "menuItemClick"
};

/**
 * @override
 */
oc.app.view.components.MenuViewComponent.prototype.createDom = function(){
	goog.base( this, 'createDom' );
	
	//Get Elements from the Template
	var menuElements = goog.dom.getElementsByTagNameAndClass( "li", "menu-item", this.getElement() );
	
	//Record menu items and add listners
	for( var i = 0; i < menuElements.length; i++ ){
		this.menuItems.push( {item: menuElements[i], id : this.getModel().items[i].id } );
		goog.events.listen( menuElements[i], goog.events.EventType.CLICK, this.menuClickHandler, false, this );
	}
};

oc.app.view.components.MenuViewComponent.prototype.menuItems = [];

oc.app.view.components.MenuViewComponent.prototype.menuClickHandler = function( event ){
	event.preventDefault();
	for( var i = 0; i < this.menuItems.length; i++ ){
		if( this.menuItems[i].item === event.currentTarget ){
			goog.dom.classes.add( this.menuItems[i].item, "active" );
			var menuClickEvent = new goog.events.Event( oc.app.view.components.MenuViewComponent.EventType.MENU_ITEM_CLICK, { id : this.menuItems[i].id } );
			this.dispatchEvent( menuClickEvent );
		}else{
			goog.dom.classes.remove( this.menuItems[i].item, "active" );
		}
	}
};