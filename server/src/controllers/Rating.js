const Rating = require("../models/Rating");
const NormalUser = require("../models/NormalUser");
const StoreOwner = require("../models/StoreOwner");

const getRatingSubmittedUsers = async (req, res) => {
  try {
    const { storeId } = req.params;
    if (!storeId) {
      return res.status(400).json({
        message: "Invalid StoreId",
      });
    }
    const result = await Rating.find({ store: storeId });

    res.status(200).json({
      message: "Rating submitted Users fetched",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const submitRating = async (req, res) => {
  try {
    const { rating } = req.body;
    const { userId, storeId } = req.params;
    const result = await Rating.create({
      user: userId,
      store: storeId,
      rating,
    });
    await StoreOwner.findByIdAndUpdate(
      storeId,
      { $push: { ratings: result._id } },
      { new: true, useFindAndModify: false }
    );
    await NormalUser.findByIdAndUpdate(
      userId,
      { $push: { ratings: result._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json({
      message: "Rating Submitted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateSubmittedRating = async (req, res) => {
  try {
    const { updatedRating } = req.body;
    const { ratingId } = req.params;

    await Rating.findByIdAndUpdate(ratingId, { rating: updatedRating });
    res.status(200).json({
      message: "Rating Submitted.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  getRatingSubmittedUsers,
  submitRating,
  updateSubmittedRating,
};
