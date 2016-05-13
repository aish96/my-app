class MicropostsController < ApplicationController
	def index
   # if user_signed_in?
    @microposts = Micropost.all
 # else 
   # render 'articles/home'
  #end
 end
   def show
    @micropost = Micropost.find(params[:id])
  end
	def new
    @micropost =  Micropost.new
	end
  def edit
  @micropost = Micropost.find(params[:id])
end
	def create
  @micropost = Micropost.new(micropost_params)
  @micropost.user = current_user
 if @micropost.save
   flash[:success] = "Your post has been created!"
    redirect_to @micropost
  else
   flash[:alert] = "Your new post couldn't be created!  Please check the form."
    render 'new'
  end
end
def update
  @micropost = Micropost.find(params[:id])
 
  if @micropost.update(micropost_params)
    redirect_to @micropost
  else
    render 'edit'
  end
end 

def destroy
    @micropost = Micropost.find(params[:id])
    @micropost.destroy
 
    redirect_to microposts_path
  end
private
  def micropost_params
    params.require(:micropost).permit(:title, :text)
  end

end
