class ArticlesController < ApplicationController
  def home
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
