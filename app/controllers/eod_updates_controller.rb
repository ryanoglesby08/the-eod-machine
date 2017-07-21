class EodUpdatesController < ApplicationController
  before_action :ensure_team_selected

  def new
    @categories = @current_team.categories

    entries = @categories.map { |category| Entry.new(category_id: category.id) }
    @eod_update = EodUpdate.new(entries: entries)
  end

  def create
    create_params = eod_update_params

    eod_update = EodUpdate.build(create_params[:author], create_params[:entries].to_h, create_params[:team_id])

    unless eod_update.valid?
      @categories = @current_team.categories
      @eod_update = eod_update

      render :new and return
    end

    eod_update.save

    redirect_to root_path, notice: 'Thanks! Go home in peace.'
  end

  private

  def ensure_team_selected
    redirect_to(teams_path, alert: 'You must select a team first.') unless team_selected?
  end

  private

  def eod_update_params
    params.require(:eod_update).permit!
  end
end
