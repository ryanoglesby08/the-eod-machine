class CreateEntries < ActiveRecord::Migration[5.2]
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
