require 'sinatra'
require "sinatra/json"
require 'json'
require 'mongo'
require 'bson'

db = Mongo::MongoClient.new.db('rdto')
comments = db['comments']

comments.create_index('url')
comments.create_index('comment_id')

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
get '/page/:url' do
  json(comments.find('url' => params[:url]).to_a)
end

get '/comments' do
  json(comments.find().to_a)
end

# Add new comment
post '/comment' do
  request.body.rewind  # in case someone already read it
  data = JSON.parse request.body.read
  # Unverified
  json(comments.insert(data))
end

# Modify an existing comment identified by a comment_id
put '/comment/:id' do
  request.body.rewind  # in case someone already read it
  data = JSON.parse request.body.read, symbolize_names: true
  json(comments.update({'_id'  => BSON::ObjectId(params[:id])},
                       {'$set' => {'content' => data[:content]}}
                      ))
end

# Delete an existing comment
delete '/comment/:id' do
  json(comments.remove("_id" => BSON::ObjectId(params[:id])))
end
