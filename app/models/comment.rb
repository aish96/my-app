class Comment < ActiveRecord::Base
	belongs_to :user
	belongs_to :micropost
	validates :comment_text ,presence: true,
						length: { minimum: 1 }
end
