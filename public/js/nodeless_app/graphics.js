

var Displayer = require('./graphics/index.js') ;
var Events = require('./events/index.js') ;


module.exports = {
	
	// TOP
	focus : function(e){
		return Displayer.focus(e, 'top') ;
	},
	toggle : function(e){
		return Displayer.toggle(e, 'top') ;
	},
	
	// EXAMPLE
	example_focus : function(e){
		return Displayer.focus(e, 'example') ;
	},
	
	example_toggle : function(e){
		return Displayer.toggle(e, 'example') ;
	}
		
}

