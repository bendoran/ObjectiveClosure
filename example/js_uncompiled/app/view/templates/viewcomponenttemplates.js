// This file was automatically generated from viewcomponenttemplates.soy.
// Please don't edit this file by hand.

goog.provide('oc.app.view.templates.ViewComponentTemplates');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string}
 * @notypecheck
 */
oc.app.view.templates.ViewComponentTemplates.MenuTemplate = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('\t<div class="navbar"><div class="navbar-inner"><a class="brand" href="#">Test Site</a><ul class="nav">');
  var itemList4 = opt_data.items;
  var itemListLen4 = itemList4.length;
  for (var itemIndex4 = 0; itemIndex4 < itemListLen4; itemIndex4++) {
    var itemData4 = itemList4[itemIndex4];
    output.append('<li class="menu-item', (itemData4.active) ? ' active' : '', '"><a href="#">', soy.$$escapeHtml(itemData4.label), '</a></li>');
  }
  output.append('</ul></div></div>');
  return opt_sb ? '' : output.toString();
};
