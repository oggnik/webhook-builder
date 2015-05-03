$(document).ready(function() {
	
})


function refresh() {
	$.get("/webhook/past_requests", function(data) {
		console.log(data);
	});
}

function sendWebhookRequest() {
	$.post("/webhook", {"sender": "Admin Page"});
}