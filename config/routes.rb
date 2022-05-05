Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root to: redirect('/world')

  get 'world', to: 'world#index'
  get 'cart', to: 'world#index'
  get 'world/:name', to: 'world#index'
end
