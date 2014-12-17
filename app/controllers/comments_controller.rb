class CommentsController < ApplicationController
  before_action :set_post, only: [:create]

  def create
    comment = @post.comments.new(comment_params)

    if comment.save
      render json: comment
    else
      render json: comment.errors, status: :unprocessable_entity
    end
  end

  private def comment_params
    params.require(:comment).permit(:name, :body)
  end

  private def set_post
    @post = Post.find(params[:post_id])
  end
end
