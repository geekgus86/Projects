class V1::UserService
  class << self
    def get_profile
         user = Auth::Current.user

        begin
            tlname = user.team.group.try(:leader).try(:name)
        rescue => ex
            tlname = "N/A"
        end
        
        begin
            glname = user.team.leader.try(:name)
        rescue => ex
            glname = "N/A"
        end

        begin
            teamname = user.team.group.try(:Description)
        rescue => ex
            teamname = "N/A"
        end

        begin
            teamalias = user.team.group.try(:Alias)
        rescue => ex
            teamalias = ""
        end

        {
          tl: {
              nombre: tlname,
              apellidoPaterno: nil,
              apellidoMaterno: nil
          },
          gl: {
              nombre: glname,
              apellidoPaterno: nil,
              apellidoMaterno: nil,
          },
          organization: {
              name: teamname,
              org: nil,
              alias: teamalias 
          }
        }
    end
  end
end
