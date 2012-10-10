goog.provide('bdoran.mvc.ViewController');

goog.require('goog.ui.Component');

/**
* @constructor
*/
bdoran.mvc.ViewController = function( name ){
	this.name = name;
	if( goog.isDefAndNotNull( name ) ){
		this.name = name;
	}else{
		this.name = "ViewController";
	}
	
	if( goog.DEBUG ){
		console.log( "ViewController: [" + this.name + "] Created");
	}
	this.createView();
};

bdoran.mvc.ViewController.prototype.createView = function(){
	this.view = new goog.ui.Component();
};

bdoran.mvc.ViewController.prototype.view = null;