class EodUpdate
  attr_reader :author, :content_by_category

  def initialize(author = '', content_by_category = {})
    @author = author
    @content_by_category = content_by_category
  end

  def content_for(category_id)
    content_by_category[category_id.to_s]
  end


  def self.build(eod_update_params)
    EodUpdate.new(eod_update_params[:author], categories_with_content(eod_update_params[:content]))
  end

  private

  def self.categories_with_content(content_by_category)
    content_by_category.select { |_category_id, content| content.present? }
  end
end