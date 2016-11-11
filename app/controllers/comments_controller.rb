class CommentsController < ApplicationController
	def create
		@micropost =Micropost.find(params[:micropost_id])
		@comment=@micropost.comments.find_or_create_by( comment_params )
		@comment.user_id=current_user.id
		if @comment.save
   		flash.now[:success] = "Your comment was successfully created!"
   		end
   		# redirect_to @micropost
	end

	def destroy
		@micropost =Micropost.find(params[:micropost_id])
		Comment.find(params[:comment_id]).destroy

	end
private
  def comment_params
    params.require(:comment).permit(:comment_text,{:user_id=>[current_user.id]})
  end


end

