class PostsController < ApplicationController
  def index
    @posts = Post.select(:id, :title, :created_at).all
  end

  def show
    @post = Post.find params[:id]
  end
end
