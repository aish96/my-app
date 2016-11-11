class Micropost < ActiveRecord::Base
	belongs_to :user
	default_scope -> {order(created_at: :desc)}
	validates :user_id, presence: true
	 validates :title, presence: true,
                    length: { minimum: 5 }
      validates :text, presence: true , length: {maximum: 140}
      validates :content, presence: true
      has_many :likes ,dependent: :destroy
      has_many :comments ,dependent: :destroy

      
  

end
