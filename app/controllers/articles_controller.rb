class ArticlesController < ApplicationController
  def home
    if user_signed_in?
    @microposts = Micropost.all
  render :template => 'microposts/index'
end
  end
  def contact
  end
  def help
  end
  def about	
  end
  def profile
     @user = current_user
     @posts = @user.microposts
  end
end
