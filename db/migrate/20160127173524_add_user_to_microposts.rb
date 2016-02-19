class AddUserToMicroposts < ActiveRecord::Migration
  def change
    add_reference :microposts, :user, index: true, foreign_key: true
  add_index :microposts, [:user_id, :created_at]
    
  end
end
