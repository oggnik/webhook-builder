#!/usr/local/bin/ruby

require 'sinatra'
require 'json'


set :port, 3205
script = './test'

post '/webhook' do
	puts request.body.read
	output = `#{script}`
end

