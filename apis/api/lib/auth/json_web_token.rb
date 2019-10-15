require 'jwt'
class Auth::JsonWebToken
  # TODO: FBB20181001 Change the secret
  # To be used from env variables
  JWT_SECRET='MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAK4-Etst4Uh7zDom--z5CVH7sbHhMp00A8NclK_0NjvxEHIkpCkKQod6elVo3l2YIrdo_PnPkhnSgw35FNf3YLEEx_V9BnYENEXD703iV7NYNWHLeqSqw1wQHtKImue2Ve-Ia_Dd8M9X_i_0HHQnCwhD51nHzCX_TbU00kzda92DAgMBAAECgYBfuo7ViGFrV0ie8mgai8AJIMVBuz35jGg83xJ5kSxyxkCI1YSzX4WptSqc3h69QSZhqfbCsL3OHhAOjzhaZvjhnWHtw0MaZ6bPs2VAe_rim9Asx_ItPLyFWCXtWDdO2Nkq5y37IecJRcjqwotyiJNtGZf62Av7IL3osBM6Eh7D4QJBAPhtmO0x8yXqbRi2J8wAlkASSDycx731QxACss-JfZjyEhrBn1OR1ytPFZaKwrs_jKhC5nmJtMriBgwTBty3j4kCQQCzjaFVtRoXUM3yEvDeKYGjTR2CpR4LoqtuhJnMoUFGNxah43dEQG5ZkyDwW_LVDOzGyr3KAlEIyWlMEePG0tWrAkEA6l9TiGu4bkv1MvwfHZpsJfRZjD2JQBBUfZVeJugawyGVrQKAkvIjYmuQ_V7aCpgQ1mmPUJh3JXUJqXiF39OZqQJBAIoIYXUQKqSt_AUTRpSj-ANgb0VWRojPX1cxHUNQ3GtsQjvmMHQJzEuUbggZx869hvE0Pz8jFMTagdZ3ElJxFs0CQQCS2zLtxvLS5Cq6Mn7Xhe6Zv2NEvCW1F0IbRN6k7d8c8xonkiNLxZ0pDwV-5lMyQA7kjOV0OTamdVJWFn5DViwa'
  ALGORITHM = 'HS512'

  def self.issue(payload)
    payload.reverse_merge!(token_meta_data)
    JWT.encode(
           payload,
           JWT_SECRET,
           ALGORITHM
    )
  end

  def self.decode(token)
    JWT.decode(
        token,
        JWT_SECRET,
         true,
         { algorithm: ALGORITHM }
    ).first
    rescue JWT::ExpiredSignature, JWT::VerificationError => e
      # Token expired
      # puts 'TOKEN EXPIRED'
      # puts e.message
    rescue JWT::DecodeError, JWT::VerificationError => e
      # Invalid token
      # puts 'TOKEN INVALID'
      # puts e.message
  end

  def self.token_meta_data
    {
        exp: 12.hours.from_now.to_i,
        iss: 'sensai.net'
    }
  end

end