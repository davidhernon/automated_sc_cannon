var max_index = 217100000;
var max_chunk = 0;
var base = 335848;
var baseport = 2202;
var num_instances = 300;
var index = 231;

var fs = require('fs');
var jsonfile = require('jsonfile')
require('shelljs/global');

var final_command = 'echo Starting to Run; ';

console.log('number instances: ' + num_instances)
var process = function(ind)
{
	fs.mkdir('./nodes/'+ind, (err, folder) => {
	  if(!err)
	  {
	  	console.log('about to execute git clone')
	  	if(exec('git clone git@github.com:davidhernon/soundcloud_parse.git /Volumes/MyBook/Coding/sc_parse/nodes/'+ind).code===0) {
	  		echo('Cloen worked but failed: going to recheckout now: ');
	  		if(exec('cd ./nodes/'+ind+'; git fetch; git checkout script; git reset --hard origin/script').code===0) {
	  			console.log("\n\n\nWE ARE IN THE RIGHT PART")

		  		var obj = { "start": base + Math.floor((ind * ((max_index - base)/num_instances))) }
		  		console.log('start index: ' + obj.start + ' for index: ' + ind)
		  			jsonfile.writeFile('./nodes/'+ind+'/private/init.json', obj, function(err) {
		  				if(err){
		  					console.log('err: ' + err)
		  				}
		  				if(!err){
		  					console.log('\n\nAdding start command for index: ' + ind + ' out of: ' + max_index)
		  					// exec('cd ./nodes/'+ind+'/; meteor --port ' + (baseport+(2*ind)) +' &' );
		  					// var child = spawn('cd ./nodes/'+ind+'/; meteor --port ' + (baseport+(2*ind)) +' &' )
		  					// parallelshell 'cd ./nodes/'+ind+'/; meteor --port ' + (baseport+(2*ind)) +' &' 
		  					final_command += 'cd ./nodes/'+ind+'/; meteor reset; meteor --port ' + (baseport+(2*ind)) +' & cd ../..; '
		  					if(ind == num_instances - 1)
		  					{
		  						jsonfile.writeFile('./run', {"final": final_command }, function(err) {
		  							console.log('wrote file' + err)
		  						})
		  					}
		  					console.log('Meteor Started at port' + ind)
		  				}
		  			})
		  		}else{
		  			console.log("\n\n\nWE ARE IN THE WRONG")
		  		}
	  	


	  	}else{
	  		if(exec('cd ./nodes/'+ind+'; git fetch; git checkout script; git reset --hard origin/script').code===0) {
	  			echo(' clone worked');
	  			//write init file
	  			// var obj = { "start": base + (ind * ((max_index - base)/num_instances)  )}
	  			// jsonfile.writeFile('./nodes/'+ind+'/private/init.json', obj, function(err) {
	  			// 	if(err){
	  			// 		console.log('err: ' + err)
	  			// 	}
	  			// 	if(!err){
	  			// 		console.log('\n\nAdding start command for index: ' + ind + ' out of: ' + max_index)
	  			// 		// exec('cd ./nodes/'+ind+'/; meteor --port ' + (baseport+(2*ind)) +' &' );
	  			// 		// var child = spawn('cd ./nodes/'+ind+'/; meteor --port ' + (baseport+(2*ind)) +' &' )
	  			// 		// parallelshell 'cd ./nodes/'+ind+'/; meteor --port ' + (baseport+(2*ind)) +' &' 
	  			// 		final_command += 'cd ./nodes/'+ind+'/; meteor --port ' + (baseport+(2*ind)) +' &; cd ../..;'
	  			// 		if(ind == max_index)
	  			// 		{
	  			// 			jsonfile.writeFile('./run', final_command, function(err) {
	  			// 				console.log('wrote file' + err)
	  			// 			})
	  			// 		}
	  			// 		console.log('Meteor Started at port' + ind)
	  			// 	}
	  			// })
	  			//start meteor
	  		}
	  	}
	  }
	});
}

var ind = 0;
while(ind < 226)
{
	final_command += 'cd ./nodes/'+ind+'/; meteor reset; meteor --port ' + (baseport+(2*ind)) +' & cd ../..; '
	// console.log(index)
	// process(index);
	ind++;
	index++
}

console.log(final_command)