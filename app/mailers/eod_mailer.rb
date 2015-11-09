class EodMailer < ApplicationMailer
  add_template_helper(ApplicationHelper)
  include ApplicationHelper

  def eod_updates(from_team_location, categories)
    @from_team_location = from_team_location
    @categories = categories

    mail(
      to: from_team_location.team.mailing_list,
      reply_to: from_team_location.team.mailing_list,
      subject: subject(from_team_location)
    )
  end

  def subject(from_team_location)
    "[EOD] #{from_team_location.team.name} | #{from_team_location.name} | #{today_short(ActiveSupport::TimeZone.new(from_team_location.time_zone))}"
  end
end
