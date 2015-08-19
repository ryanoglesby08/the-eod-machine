class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.string :content
      t.string :author
      t.boolean :delivered, default: false
      t.references :category

      t.timestamps
    end
  end
end
