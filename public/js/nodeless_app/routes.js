
	// what steps are going to do graphically , extracted from './graphics.js'
	// on toggle (both opening / closing) and focus events
	
	var graphics = require('./graphics') ;
	
	var json = require('/json/') ;
	var jsonexamples = json['examples'] ;
	//trace(jsonexamples) ;
	var jadepath = './jade/nodeless_app/' ;
	var jsonpath = './json/nodeless_app/' ;
	var examplepath = './examples/' ;
	
	module.exports = {
		intro : (function(){

			var intro = function intro (req, res){
				if(res.opening){
					res.userData.urljade = jadepath + 'intro.jade' ;
					res.userData.urljson = jsonpath + 'intro.json' ;
					res.userData.parameters = {response:res} ;
				}
				return res ;
			} ;
			
			intro['@focus'] = graphics.focus ;
			intro['@toggle'] = graphics.toggle ;

			return intro ;
		})(),
		examples:(function(){

			var examples = function examples (req, res){
				if(res.opening){
					res.userData.urljade = jadepath + 'examples.jade' ;
					res.userData.urljson = jsonpath + 'examples.json' ;
					res.userData.parameters = {response:res, examples:json} ;
				}
				return res ;
			} ;

			examples['@focus'] = graphics.focus ;
			examples['@toggle'] = graphics.toggle ;
			
			
			for(var s in jsonexamples){
				(function(s, jsonexamples){
					var ex = jsonexamples[s] ;
					var example = examples[s] = function(req, res){
						
						if(res.opening){
							res.userData.urljade = jadepath + ex['template'] ;
							res.userData.parameters = {response:res, script:examplepath + ex['script']} ;
						}
						return res ;
					}
					
					example['@focus'] = graphics.example_focus ;
					example['@toggle'] = graphics.example_toggle ;

				})(s, jsonexamples) ;
			}
			
			
			return examples ;
		})()
	} ;

	
	
	
	
	
	