goog.provide('bdoran.mvc.NavigationViewController');

goog.require('bdoran.mvc.ViewController');
goog.require('goog.array');

/**
* @constructor
*/
bdoran.mvc.NavigationViewController = function( name, opt_rootViewController ){
	if( !goog.isDefAndNotNull( name ) ){
		name = "NavigationViewController";
	}
	goog.base( this, name );
	if( goog.isDefAndNotNull( opt_rootViewController ) ){
		this.pushViewController( opt_rootViewController );
	}
};
goog.inherits( bdoran.mvc.NavigationViewController, bdoran.mvc.ViewController );

bdoran.mvc.NavigationViewController.prototype.topViewController = null;

/**
 * @private
 */
bdoran.mvc.NavigationViewController.prototype.viewControllerStack_ = [];

/**
 * Pushes a view controller to the top of the stack
 * @param {bdoran.mvc.ViewController} viewController
 * @param opt_animate
 */
bdoran.mvc.NavigationViewController.prototype.pushViewController = function( viewController, opt_animate ){
	if( goog.isDefAndNotNull( this.topViewController ) ){
		this.view.removeChild( this.topViewController.view, true );
	}
	this.view.addChild( viewController.view, true );
	goog.array.insert( this.viewControllerStack_,  viewController );
	
	this.topViewController = viewController;
	
	if( goog.DEBUG ){
		console.log( "NavigationViewController: Pushing [" + viewController.name + "] to [" + this.name + "]'s Stack, Current view stack: " );
		console.log( this.viewControllerStack_ );
	}
};

/**
 * Pops a view controller from the stack
 * @param {bdoran.mvc.ViewController} viewController
 * @param opt_animate
 */
bdoran.mvc.NavigationViewController.prototype.popViewController = function( viewController, opt_animate ){
	if( goog.array.contains( this.viewControllerStack_, viewController ) ){
		goog.array.remove( this.viewControllerStack_, viewController );
		if( viewController === this.topViewController ){
			this.view.removeChild( this.topViewController.view, true );
			this.topViewController = this.viewControllerStack_[ this.viewControllerStack_.length - 1 ];
			this.view.addChild( this.topViewController.view, true );
		}
	}
	
	if( goog.DEBUG ){
		console.log( "NavigationViewController: Popping [" + viewController.name + "] to [" + this.name + "]'s Stack, Current view stack: " );
		console.log( this.viewControllerStack_ );
	}
};

/**
 * Pops a view controller from the stack
 * @param {bdoran.mvc.ViewController} viewController
 * @param opt_animate
 */
bdoran.mvc.NavigationViewController.prototype.popTopViewController = function( opt_animate ){
	this.popViewController( this.topViewController, opt_animate );
};

/**
 * Replaces the Root (or Base) view controller with a new controller, 
 * also pops all the other view controllers from the stack. Handy for 
 * page wide transitions where new objects are needed
 * 
 * @param {bdoran.mvc.ViewController} viewController
 * @param opt_animate
 */
bdoran.mvc.NavigationViewController.prototype.replaceRootViewController = function( viewController, opt_animate ){
	goog.array.insertAt( this.viewControllerStack_, viewController, 0 );
	this.popToViewController( viewController, opt_animate );
};

/**
 * Pops all view controllers from the stack until a given view controller is met, 
 * does nothing if the view controller isn't int he stack
 * 
 * @param {bdoran.mvc.ViewController} viewController
 * @param opt_animate
 */
bdoran.mvc.NavigationViewController.prototype.popToViewController = function( viewController, opt_animate ){
	if( goog.array.contains( this.viewControllerStack_, viewController ) ){
		for( var i = this.viewControllerStack_.length - 1; i > 0; i-- ){
			if( this.viewControllerStack_[i] !== viewController ){
				this.popViewController( this.viewControllerStack_[i], opt_animate );
			}
		}
	}
};

/**
 * Pops to the root view controller
 * @param opt_animate
 */
bdoran.mvc.NavigationViewController.prototype.popToRootController = function( opt_animate ){
	if( this.viewControllerStack_.length > 0 ){
		for( var i = this.viewControllerStack_.length; i < 0; i-- ){
			if( i != 0 ){
				this.popToViewController( this.viewControllerStack_[i], opt_animate );
			}
		}
	}
};