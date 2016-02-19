class CreateMicroposts < ActiveRecord::Migration
  def change
    create_table :microposts do |t|
      t.string :title
      t.text :text

      t.timestamps null: false
    end
  end
end
