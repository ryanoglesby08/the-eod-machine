require 'rails_helper'

describe EodMailer do
  before do
    ActionMailer::Base.deliveries.clear
  end

  let(:team) { FactoryGirl.create(:team, mailing_list: 'eod@myteam.test') }
  let(:team_location) { FactoryGirl.create(:new_york, eod_time: '9:00 PM', team: team) }

  let(:categories) do
    story_updates = Category.new(name: 'Stories')
    story_updates.entries.build(author: 'Sarah',  content: '#22 is ready for testing',      team_id: team.id)
    story_updates.entries.build(author: 'Jim',    content: '#11 still needs more analysis', team_id: team.id)
    other = Category.new(name: 'Other')
    other.entries.build(author: 'Max',            content: 'Spoke with Bob',                team_id: team.id)

    [story_updates, other]
  end

  before do
    allow_any_instance_of(ActiveSupport::TimeZone).to receive(:now).and_return(Time.zone.parse('2015-10-01') )
  end

  it 'sends a end of day update' do
    email = EodMailer.eod_updates(team_location, categories).deliver_now

    expect(ActionMailer::Base.deliveries).to have(1).email

    expect(email.from).to eq(['eod_machine@barclaycardus.com'])
    expect(email.to).to eq(['eod@myteam.test'])
    expect(email.reply_to).to eq(['eod@myteam.test'])
    expect(email.subject).to eq('[EOD] New York | Oct 01')

    text_body = email.body.parts.first.body.to_s
    expect(text_body).to eq(File.read('spec/fixtures/eod_updates.txt'))

    html_body = email.body.parts.second.body.to_s
    expect(html_body).to eq(File.read('spec/fixtures/eod_updates.html'))
  end
end