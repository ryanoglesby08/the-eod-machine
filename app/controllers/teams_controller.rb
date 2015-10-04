class TeamsController < ApplicationController
  def index
    @teams = Team.includes(:team_locations)
  end

  def new
    @team = Team.new
    2.times { @team.team_locations.build }
  end

  def create
    team = Team.new(team_params)

    unless team.save
      @team = team
      render :new and return
    end

    redirect_to root_path
  end

  def edit
    @team = Team.find(params[:id])
  end

  def update
    team = Team.find(params[:id])

    unless team.update(team_params)
      @team = team
      render :edit and return
    end

    redirect_to root_path
  end

  def select
    self.current_team_id = params[:id]
    redirect_to root_path
  end

  private

  def team_params
    params.require(:team)
          .permit(:name, :mailing_list, team_locations_attributes: [:id, :name, :time_zone, :eod_time])
  end
end