class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_team
    session[:team_id]
  end

  def current_team=(team_id)
    session[:team_id] = team_id
  end

  def team_selected?
    current_team.present?
  end
end
