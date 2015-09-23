class EodUpdatesController < ApplicationController
  before_filter :ensure_team_selected

  def new
    @categories = Category.includes(:entries)
    @eod_update = EodUpdate.new
  end

  def create
    eod_update_params = params[:eod_update]

    @eod_update = EodUpdate.build(eod_update_params[:author], eod_update_params[:entries])

    unless @eod_update.valid?
      @categories = Category.includes(:entries)
      render :new and return
    end

    @eod_update.save

    flash[:info] = 'Thanks! Go home in peace.'
    redirect_to root_path
  end

  private

  def ensure_team_selected
    redirect_to teams_path unless team_selected?
  end
end