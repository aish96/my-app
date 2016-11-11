class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :user_id
      t.integer :micropost_id
      t.text :comment_text

      t.timestamps null: false
    end
  end
end
