class V1::EasyRedMineService

    class << self 
        def setComment(params)
            body = { issue: params[:issue] }
            uri = 'https://metalsa.easyredmine.com'
            endpoint = '/issues?format=json&key=f28d16974e7fedc2cb6365ec1c4f0e6e2ba9205b'
            headers = {
                'Content-Type': 'text/json',
                'Accept': 'text/json'
            }
            response = V1::Http::HttpService.request 'post', uri, endpoint, headers, body

            
            puts JSON.parse(response.body)
            JSON.parse(response.body)
        end
    end

end