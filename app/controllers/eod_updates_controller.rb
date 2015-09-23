class EodUpdatesController < ApplicationController
  def new
    redirect_to teams_path and return unless team_selected?

    @categories = Category.includes(:entries)
    @eod_update = EodUpdate.new
    @team = Team.find(current_team)
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
end