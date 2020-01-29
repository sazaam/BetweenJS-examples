
require('../node_modules/node_modules/jquery-1.8.1.min.js') ;
require('../node_modules/node_modules/jquery.ba-hashchange.min.js') ;
require('../node_modules/betweenjs_b4.js') ;

var PARAMS = {
	EASE:Quad,
	TIME:0.025,
	DELAY:0.001
} ;

var Helper = require('./helper.js') ;
var TweenControl = Helper.TweenControl ;
var Closure = Helper.Closure ;


// TOPSECTIONS MAIN TWEEN
new Closure('top', function(res){
	
	var template 					= res.template ;
	var tweens 						= [] ;
	
	var noID 						= res.id == '' ;
	var id 							= noID ? res.parentStep.id : res.id ;
	var ind 						= noID ? res.parentStep.index : res.index ;
	
	id = id == '@' ? 'home' : id ;

	var body 						= $('#frame') ;
	var delay 						= .001 ;


	if(res.opening){
		// trace('opening', id)
		
		TweenControl.register('TEMPLATE_ADD', 
			// TEMPLATE ADDING
			BetweenJS.addChild(template, body)
		) ;
		
		if(id == 'examples'){


		}


		tweens = ['TEMPLATE_ADD'] ;
		
		
	} else {
		// trace('closing', id)

		TweenControl.register('TEMPLATE_ADD_OUT', 
			// TEMPLATE REMOVING
			BetweenJS.removeFromParent(template)
		) ;
		

		if(id == 'examples'){


		}


		tweens = ['TEMPLATE_ADD_OUT'] ;
		
	}
	
	return TweenControl.registerAlias(this.id, tweens) ;
	
}) ;

var ctrlEnterFunc, runFunc, showFunc ;

new Closure('example', function(res){
	
	var template 					= res.template ;
	var tweens 						= [] ;
	
	var noID = res.id == '' ;
	var id 							= noID ? res.parentStep.id : res.id ;
	var ind 						= noID ? res.parentStep.index : res.index ;
	
	var test, scr ;
	
	var body 						= $('#zone') ;
	
	if(res.opening){
		
		var path = res.userData.parameters.script ;
		test = res.userData.test = res.userData.test || require(path) ;
		scr = test.load.toString().replace(/(^function\(\)\{)|(\}$)/gi, '') ;
		

		TweenControl.register('TEMPLATE_EXAMPLE_ADD', 
			// TEMPLATE ADDING
			BetweenJS.addChild(template, body),
			BetweenJS.func(function(){
				var win = $(window) ;
				var frame = $('#frame') ;
				
				var li = $('#li_' + res.id) ;
				var desc = li.find('.desc') ;
				
				desc.appendTo(frame).attr({id:'curdesc'}) ;
				
				var run = desc.find('.run') ;
				var show = desc.find('.show') ;
				var code = $('#sidecode') ;
				var codetext = code.find('textarea') ;
				
				codetext.text(scr) ;
				
				li.addClass('cur') ;

				run.bind('click', runFunc = function(e){
					e.preventDefault() ;
					test.run(e) ;
				}) ;

				show.bind('click', showFunc = function(e){
					e.preventDefault() ;
					code.toggleClass('none') ;
				}) ;

				win.bind('keydown', ctrlEnterFunc = function(e){
					e.keyCode == 13 && e.ctrlKey && e.preventDefault() ;
					if(e.keyCode == 13 && e.ctrlKey){
						test.run(e) ;
					}
				})

				test.load() ;
			})
		) ;
		
		tweens = ['TEMPLATE_EXAMPLE_ADD'] ;
	} else {
		
		test = res.userData.test ;
		
		TweenControl.register('TEMPLATE_EXAMPLE_ADD_OUT', 
			
			BetweenJS.func(function(){
				var win = $(win) ;
				var frame = $('#frame') ;
				var li = $('#li_' + res.id) ;
				var desc = frame.find('#curdesc') ;
				

				var run = desc.find('.run') ;
				var show = desc.find('.show') ;
				var code = $('#sidecode') ;
				var codetext = code.find('textarea') ;
				
				desc.appendTo(li).attr({id:''}) ;

				codetext.text('') ;
				
				code.addClass('none') ;
				li.removeClass('cur') ;

				run.unbind('click', runFunc ) ;
				show.unbind('click', showFunc ) ;
				win.unbind('keydown', ctrlEnterFunc) ;
				
				test.unload() ;
			}),
			// TEMPLATE REMOVING
			BetweenJS.removeFromParent(template)
		) ;
		
		tweens = ['TEMPLATE_EXAMPLE_ADD_OUT'] ;
	}
	
	return TweenControl.registerAlias(this.id, tweens) ;
	
}) ;


module.exports = Helper ;
