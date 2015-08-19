class EodMailer < ApplicationMailer
  add_template_helper(ApplicationHelper)
  include ApplicationHelper

  def eod_updates(from_team, categories)
    subject = "[EOD] #{from_team.location} | #{today_short(from_team.time_zone)}"

    @from_team = from_team
    @categories = categories

    mail(to: from_team.to, reply_to: from_team.to, subject: subject)
  end
end
