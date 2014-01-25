require 'sinatra'
require "sinatra/json"
require 'json'
require 'mongo'

configure do
  set :environment, :development
  set :server, 'thin'
  enable :sessions, :logging
end

get '/' do
  json 'Server is up and running'
end

# Set a session secret
get '/set/:secret' do
  session[:secret] = params[:secret]
end

# Get a session secret
get '/get' do
  session[:secret]
end

# Retrieve all comments at a given URL
get '/comments/:url' do
  json()
end

# Add new comment
post '/comment' do
  request.body.rewind  # in case someone already read it
  data = JSON.parse request.body.read
  json()
end

# Modify an existing comment
put '/comment/:id' do
  request.body.rewind  # in case someone already read it
  data = JSON.parse request.body.read
  json()
end

# Delete an existing comment
delete '/comment/:id' do
  json()
end
