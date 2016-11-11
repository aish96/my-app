class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.float :latitude
      t.float :longitude
      t.integer :user_id
      t.string :address
      t.text :tweet

      t.timestamps null: false
    end
  end
end
