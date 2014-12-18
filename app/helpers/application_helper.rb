module ApplicationHelper
  def turbolinks_request?
    request.headers["X-XHR-Referer"].present?
  end
end
