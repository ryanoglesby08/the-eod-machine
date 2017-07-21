Rails.application.routes.draw do
  root 'eod_updates#new'

  resources :teams, only: [:index, :new, :create, :edit, :update] do
    get :select, on: :member
  end

  resources :eod_updates, only: [:new, :create]
end
