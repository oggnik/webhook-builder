#!/usr/local/bin/ruby

require 'sinatra'
require 'json'

require_relative 'webhook_request'

#set :bind, '0.0.0.0'
set :port, 3205
script = './test'
$admin_username = 'admin'
$admin_password = 'admin'

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

post '/webhook' do
	webhook_request = WebhookRequest.new(request.body.read.to_s)
	puts webhook_request.request_body
	output = `#{script}`
	puts output
	""
end

get '/webhook' do
	protected!
	erb :admin
end

get '/private/*' do
	protected!
	send_file "private/#{params['splat'][0]}"
end