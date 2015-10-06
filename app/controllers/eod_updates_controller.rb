class EodUpdatesController < ApplicationController
  before_filter :ensure_team_selected

  def new
    @categories = Category.all
    @eod_update = EodUpdate.new
  end

  def create
    eod_update_params = params[:eod_update]

    @eod_update = EodUpdate.build(eod_update_params[:author], eod_update_params[:entries], eod_update_params[:team_id])

    unless @eod_update.valid?
      @categories = Category.all
      render :new and return
    end

    @eod_update.save

    flash[:notice] = 'Thanks! Go home in peace.'
    redirect_to root_path
  end

  private

  def ensure_team_selected
    redirect_to(teams_path, alert: 'You must select a team first.') unless team_selected?
  end
end