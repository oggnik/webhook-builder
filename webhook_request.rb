class WebhookRequest
	attr_reader :request_body, :request_time
	def initialize(body)
		@request_body = body
		@request_time = Time.new
	end
end