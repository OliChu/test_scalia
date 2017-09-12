Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users

  root to: "products#index"
  resources :products, only: [:index, :new, :create, :edit, :update]
end
