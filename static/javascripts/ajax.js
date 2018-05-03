

function QueryFeats(){

	console.log("QueryFeats ran");

	$("#search-results-div").show();
	  	
	$('#feat-search-form').submit(function(event){

		$.post($(this).attr('action'), 
			$(this).serialize(), 
				function(response){		
				    
				    const $tbody = $('tbody');

				    $('tbody').html('');
				    

				    response.forEach (feat => {
						const row = $tbody[0].insertRow();
						if (feat.type == true)
						{
							feat.type = 'Active';
							row.insertCell().textContent = feat.type;
						}
						else {
							feat.type = "Passive";
							row.insertCell().textContent = feat.type;
						}
						row.insertCell().textContent = feat.school;
						row.insertCell().textContent = feat.name;
						row.insertCell().textContent = feat.effect;
						row.insertCell().textContent = feat.description;
						row.insertCell().textContent = feat.prereq.misc_req;
						row.insertCell().textContent = feat.prereq.skill_req;		
						var statReqCell = row.insertCell();	
							for (var i = 0; i < feat.prereq.stat_req.length; i++){	
								var min = JSON.stringify(feat.prereq.stat_req[i].is_limit_min); 
								var statType = JSON.stringify(feat.prereq.stat_req[i].stat_type);    
								var statLimit = JSON.stringify(feat.prereq.stat_req[i].stat_limit);

								if (min == 'true')
									min = 'Minimum';
								else min = 'Maximum';
								
								statType = statType.replace(/\"/g, "");
								statLimit = statLimit.replace(/\"/g, "");


								

								statReqCell.innerHTML += min + ' ' + statType+':' + ' ' + statLimit + '\n';			
							}



		
					}); // end forEach

				}); // end function(response)

		return false;
	}); // end submit function event

}// QueryFeats end




