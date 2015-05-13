$(document).ready(function() {
	var window_height = $(window).height();
	var content_height = window_height - 200;
	console.log(content_height);
	$('.requests').height(content_height);

	refresh();
});

$(window).resize(function() {
	var window_height = $(window).height();
	var content_height = window_height - 200;
	$('.requests').height(content_height);
});

function refresh() {
	$('.requests').load('/webhook/past_requests');
	// $.get('/webhook/past_requests', null, function(data) {
	// 	if (data.requests) {
	// 		console.log(data.requests);
	// 		$('.requests').empty();
	// 		var request_list = data.requests;

	// 		request_list.forEach(function(currentVal, index, array) {
	// 			$('.requests').append('<div class="row">' + currentVal.request_time + '</div>');
	// 		});
	// 	}
	// }, 'json');
}

function sendWebhookRequest() {
	$.post("/webhook", {"sender": "Admin Page"}, function(data) {
		refresh();
	});
}

function showRequest(request_body, request_time, request_output) {
	console.log($(".request_time_info"));
	$(".request_time_info").text(request_time);
	$(".request_body_info").text(request_body);
	$(".request_output_info").text(request_output);
}