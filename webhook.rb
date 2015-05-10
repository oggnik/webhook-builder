#!/usr/local/bin/ruby

require 'sinatra'
require 'json'

require_relative 'webhook_request'

#set :bind, '0.0.0.0'
set :port, 3205
script = './test'
$admin_username = 'admin'
$admin_password = 'admin'


# Keep past webhook requests
past_requests = Array.new


helpers do
	def protected!
		return if authorized?
		headers['WWW-Authenticate'] = 'Basic realm="Restricted Area"'
		halt 401, "Not authorized\n"
	end

	def authorized?
		@auth ||=  Rack::Auth::Basic::Request.new(request.env)
		@auth.provided? and @auth.basic? and @auth.credentials and @auth.credentials == [$admin_username, $admin_password]
	end
end

# Run the script upon getting a webhook post request
post '/webhook' do
	output = `#{script}`
	webhook_request = WebhookRequest.new(request.body.read.to_s, output)
	past_requests.unshift webhook_request
	puts webhook_request.to_json
	""
end

# Get the admin page
get '/webhook' do
	protected!
	erb :admin, :locals => {:script => script}
end

# Make sure any requests requesting private files are authenticated
get '/private/*' do
	protected!
	send_file "private/#{params['splat'][0]}"
end

# Get the past requests in json format
get '/webhook/past_requests' do
	protected!
	erb :request_list, :locals => {:past_requests => past_requests}
end

