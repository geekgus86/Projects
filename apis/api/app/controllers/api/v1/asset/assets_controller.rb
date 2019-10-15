class Api::V1::Asset::AssetsController < ApplicationController

  def image
    image = params[:id]
    a = Dir.glob("public/images/quality/*").map{|s| s.split("/")[-1]}
    b = a.map
    img = a.select{|a| a == "#{image}.png" || a == "#{image}.jpg" || a == "#{image}.jpeg" }[0]
    send_file "public/images/quality/#{img}", type: 'image/png', disposition: 'inline'
  end
end