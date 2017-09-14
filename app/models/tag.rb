class Tag < ApplicationRecord
  belongs_to :product, dependent: :destroy
end
