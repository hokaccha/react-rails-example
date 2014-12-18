class PostsController < ApplicationController
  def index
    @posts = Post.select(:id, :title, :created_at).all
  end

  def show
    @post = Post.find params[:id]

    #render 'show_erb'
    #render 'show_haml'
    #render 'show_slim'
  end
end
