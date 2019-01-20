require 'sinatra'
require 'net/http'
require 'json'

get '/' do
    response = Net::HTTP.get(URI.parse('https://api.stlouisfed.org/fred/series/observations?series_id=HOUST&api_key=192aaa570ef43206ffc1912f5231b5c5&file_type=json')) 
    respJson = JSON.parse(response)
    startsData = respJson["observations"]
    @data = startsData.map { |hash| { date: hash["date"], starts: hash["value"] }}
    erb :index  
end