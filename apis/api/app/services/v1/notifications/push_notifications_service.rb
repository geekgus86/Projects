
module V1
  module Notifications
    class PushNotificationsService
      class << self
        APP_ID = '6af7b8a1-67f1-4ef3-a28b-c07a504e7db2'
        APP_KEY = 'ZGIzNzE5YTgtMzAxNS00MDJhLTliZDAtN2RiZjNkYjNmZTkx'
        def get_notification_token(push_token, os_id)
          device_type = os_id == 'Android' ? 1 : 0
          body = { app_id: APP_ID, identifier: push_token, device_type: device_type }
          headers = { Authorization: "Bearer #{APP_KEY}" }
          response = V1::Http::HttpService.request 'post', 'https://onesignal.com', '/api/v1/players', headers, body
          JSON.parse(response.body)['id']
        end

        def notify_user(user_id, about)
          @user = User.find user_id
          send_to_event_bus @user.notification_token, about
        end

        def notify_current_user(about)
          send_to_event_bus Auth::Current.user.notification_token, about
        end

        def notify_users(user_ids, about)
          user_ids.each do |user_id|
            notify_user user_id, about
          end
        end

        def send_to_event_bus(token, about)
          V1::EventBus::EventBusService.publish 'metalsa/push_notification', { token: token, about: about }
        end
      end
    end
  end
end
