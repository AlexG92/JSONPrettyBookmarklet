(function(){

if (!($ = window.jQuery)) { 
    script = document.createElement('script');  
  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js';   
    script.onload=kickOffThePrettyJSON;
    document.body.appendChild(script);  
}   
else {  
    kickOffThePrettyJSON();
}  

function kickOffThePrettyJSON() {
	bringInTheTableCSS();
	prettyTheJSON();
}


function bringInTheTableCSS() {
	externalLinkForTable = $(document.createElement('link')).attr({
		rel: 'stylesheet',
		type: 'text/css',
		href:'https://raw.github.com/AlexG92/JSONPrettyBookmarklet/master/bootstraptable.css'
	});
	$('body').append(externalLinkForTable);	
}


function prettyTheJSON() {
	var regularExpression = /{[\D\d]*}/g;
	var bodyContent = $('body').html();
	var regularExpressionResults;
	var regularExpressionResultsCleaned;
	
	while ((regularExpressionResults = regularExpression.exec(bodyContent)) !== null)
	{

	  regularExpressionResultsCleaned = regularExpressionResults[0]; 
	  
	}
	
	readyJSONToDisplay = $.parseJSON(regularExpressionResultsCleaned);
	console.log(readyJSONToDisplay);
	

	var tableHTML = $(document.createElement('table')).attr({
		class: "table table-bordered table-striped",
		cellPadding: 5,
		cellSpacing: 5,
	});

	for(var key in readyJSONToDisplay) {		
		
		var tableRow = $(document.createElement('tr'));
		tableHTML.append(tableRow);
		tableRow.append('<td>' + key + '</td>');
		
		
		
		if ($(readyJSONToDisplay[key]).is(Object)) {			

			
			loopThroughIterable(readyJSONToDisplay[key], 1);

			function loopThroughIterable (nonStringValue, calledAmount, rowToAttach) {
				var containerTD = $(document.createElement('td'));
				var innerTable = $(document.createElement('table'));
				
				
				if (calledAmount == 1) {
					tableRow.append(containerTD);
				} else {
					rowToAttach.append(containerTD);
				}
				
				containerTD.append(innerTable);

				for(var innerkey in nonStringValue) {
					var innerTableRow = $(document.createElement('tr'));
					innerTable.append(innerTableRow);
					innerTableRow.append('<td>' + innerkey + '</td>');
					if($(nonStringValue[innerkey]).is(Object)){
						console.log(readyJSONToDisplay[key]);
						loopThroughIterable(nonStringValue[innerkey], calledAmount += 1, innerTableRow);
					} else {
						innerTableRow.append('<td>' + String(nonStringValue[innerkey])+ '</td>');
					}
				}				

			
			}



		} else {
			
			var valueOfKey = String(readyJSONToDisplay[key]);
			tableRow.append('<td>' + valueOfKey + '</td>');
		}		
		
		
	}

	$('body').append(tableHTML);

}	

})();
