class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter do
    @current_team = Team.find_by_id(current_team_id) if team_selected?
  end

  def current_team_id=(team_id)
    session[:team_id] = team_id
  end

  def team_selected?
    current_team_id.present?
  end

  private

  def current_team_id
    session[:team_id]
  end
end
