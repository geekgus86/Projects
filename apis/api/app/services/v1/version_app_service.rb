class V1::VersionAppService
    class << self 
        def check(params)
            version = VersionApp.select(:id, :version).last()
        end
    end
end