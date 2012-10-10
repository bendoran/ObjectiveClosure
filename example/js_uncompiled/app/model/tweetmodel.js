goog.provide( "oc.app.model.TweetModel" );

goog.require("goog.net.XhrIo");
goog.require("goog.structs.Map");
goog.require("goog.Uri.QueryData");

/**
 * @constructor
 */
oc.app.model.TweetModel = function(){
};
goog.addSingletonGetter(oc.app.model.TweetModel);

oc.app.model.TweetModel.prototype.getCampaigns = function( callback, opt_scope ){
	/*var request = new goog.net.XhrIo();
	goog.events.listen( request, "complete", function( event ){
		if( request.isSuocess() ){
			var campaigns = goog.json.parse( request.getResponse() );
			var finalCall = null;
			if( goog.isDefAndNotNull( opt_scope ) ){
				finalCall = goog.bind( callback, opt_scope, campaigns );
			}else{
				finalCall = goog.bind( callback, this, campaigns );
			}
			finalCall();
		}
	});
	request.send( "/campaigns", "POST" );*/
};