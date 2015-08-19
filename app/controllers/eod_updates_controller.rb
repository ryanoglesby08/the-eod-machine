class EodUpdatesController < ApplicationController
  def new
    @categories = Category.includes(:entries)
  end

  def create
    eod_update = params[:eod_update]

    Entry.transaction do
      categories_with_content(eod_update[:content]).each do |category_id, content|
        entry = Entry.new(author: eod_update[:author], content: content, category_id: category_id)

        unless entry.save
          flash.now[:error] = "Oops! Something's wrong."
          @categories = Category.includes(:entries)
          render :new and return
        end

      end
    end

    flash[:info] = 'Thanks! Go home in peace.'
    redirect_to root_path
  end

  def categories_with_content(content_by_category)
    content_by_category.select { |_, content| content.present? }
  end
end