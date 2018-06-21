# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2015_11_09_032029) do

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "team_id"
  end

  create_table "entries", force: :cascade do |t|
    t.string "content"
    t.string "author"
    t.boolean "delivered", default: false
    t.integer "category_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer "team_id"
  end

  create_table "team_locations", force: :cascade do |t|
    t.string "name"
    t.string "time_zone"
    t.string "eod_time"
    t.integer "team_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "name"
    t.string "mailing_list"
  end

end
