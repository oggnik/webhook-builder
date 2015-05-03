require 'json'

class WebhookRequest
	attr_reader :request_body, :request_time, :output
	def initialize(body, output)
		@request_body = body
		@request_time = Time.new
		@output = output
	end

	def to_json(options = nil)
		{'request_body' => @request_body, 'request_time' => @request_time, 'output' => @output}.to_json
	end
	def self.from_json(string)
		data = JSON.load string
		self.new data['request_body'], data['request_time'], data['output']
	end
end