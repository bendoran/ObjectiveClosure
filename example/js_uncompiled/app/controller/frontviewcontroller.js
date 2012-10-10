goog.provide('oc.app.controller.FrontViewController');

goog.require('bdoran.mvc.ViewController');
goog.require('bdoran.mvc.NavigationViewController');
goog.require('oc.app.controller.PageViewController');
goog.require('oc.app.view.components.MenuViewComponent');
goog.require('goog.structs.Map');

/**
* @constructor
*/
oc.app.controller.FrontViewController = function( rootComponent ){
	this.rootComponent = rootComponent;
	goog.base( this, "FrontViewController" );
	this.createMenu();
	this.createNavViewController();
};
goog.inherits( oc.app.controller.FrontViewController, bdoran.mvc.ViewController );

/**
 * @private
 */
oc.app.controller.FrontViewController.navigationViewController_;

/**
 * @private
 */
oc.app.controller.FrontViewController.domHelper_;

/**
 * @private
 */
oc.app.controller.FrontViewController.navigationViewController_;

/**
 * @private
 */
oc.app.controller.FrontViewController.menuItems_;

/**
 * @private
 */
oc.app.controller.FrontViewController.menu_;

oc.app.controller.FrontViewController.prototype.createView = function(){
	this.view = new goog.ui.Component();
	this.view.decorate( this.rootComponent );
};

oc.app.controller.FrontViewController.prototype.createMenu= function(){
	//Create the Menu Items
	var menuItems = { items: [
      { id: "home", label: "Home", active: true },
      { id: "tweets", label: "Tweets", active: false},
      { id: "about", label: "About", active: false}
    ] };
	
	//Create the Menu Component
	var menu = new oc.app.view.components.MenuViewComponent( menuItems );
	this.view.addChild( menu, true );
	
	menu.addEventListener( oc.app.view.components.MenuViewComponent.EventType.MENU_ITEM_CLICK, this.menuClickHandler, false, this );
	
	this.menu_ = menu;
	this.menuItems_ = menuItems;
};

oc.app.controller.FrontViewController.prototype.createNavViewController = function(){
	//create first view controller
	var newViewController = new oc.app.controller.PageViewController( "Home" );
	
	//register main 'nav' controller
	var navigationViewController = new bdoran.mvc.NavigationViewController( "MainNavigationViewController", newViewController );
	this.view.addChild( navigationViewController.view, true );
	navigationViewController.view.getElement().setAttribute( "class", "viewnav" );
	
	//Store the nav view controller
	this.navigationViewController_ = navigationViewController;
};

oc.app.controller.FrontViewController.prototype.menuClickHandler = function( event ){
	if( goog.DEBUG ){
		console.log( "Changing to section: " + event.target.id );
	}
	
	var newViewController = null;
	
	switch( event.target.id ){
		case "home" : 
			newViewController = new oc.app.controller.PageViewController( "Home" );
			break;
		case "tweets" : 
			newViewController = new oc.app.controller.PageViewController( "Tweets" );
			break;
		case "about" : 
			newViewController = new oc.app.controller.PageViewController( "About" );
			break;
			
	}
	
	if( !goog.isNull( newViewController ) ){
		this.navigationViewController_.replaceRootViewController( newViewController );
	};
};