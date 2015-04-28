#!/usr/local/bin/ruby

require 'sinatra'
require 'json'

#set :bind, '0.0.0.0'
set :port, 3205
script = './test'


helpers do
	def protected!
		return if authorized?
		headers['WWW-Authenticate'] = 'Basic realm="Restricted Area"'
		halt 401, "Not authorized\n"
	end

	def authorized?
		@auth ||=  Rack::Auth::Basic::Request.new(request.env)
		@auth.provided? and @auth.basic? and @auth.credentials and @auth.credentials == ['admin', 'admin']
	end
end

post '/webhook' do
	output = `#{script}`
	puts output
	""
end

get '/webhook' do
	protected!
	erb :admin, :locals => {:script => script}
end

get '/private/*' do
	protected!
	send_file "private/#{params['splat'][0]}"
end