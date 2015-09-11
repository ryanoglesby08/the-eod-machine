class EodUpdatesController < ApplicationController
  def new
    @categories = Category.includes(:entries)
    @eod_update = EodUpdate.new
  end

  def create
    eod_update = EodUpdate.build(params[:eod_update])

    unless Entry.save_eod_update(eod_update)
      flash.now[:error] = "Oops! Something's wrong."

      @categories = Category.includes(:entries)
      @eod_update = eod_update

      render :new and return
    end

    flash[:info] = 'Thanks! Go home in peace.'
    redirect_to root_path
  end
end