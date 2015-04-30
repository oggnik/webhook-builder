function sendWebhookRequest() {
	$.post("/webhook", {"sender": "Admin Page"});
}