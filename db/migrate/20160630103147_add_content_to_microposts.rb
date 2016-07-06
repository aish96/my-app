class AddContentToMicroposts < ActiveRecord::Migration
  def change
    add_column :microposts, :content, :text
  end
end
