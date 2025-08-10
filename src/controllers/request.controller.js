const ConnectionRequest = require("../models/connectionRequest.model");
const User = require("../models/user.model");

const sendConnectionRequestController = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status type " + status
      })
    }

    const toUser = await User.findById(toUserId);

    if (!toUser) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    // if there is an existingg connection request
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId }
      ]
    });

    if (existingConnectionRequest) {
      return res.status(400).send({
        message: "Connection request already exists."
      })
    }


    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status
    });

    const data = await connectionRequest.save();

    res.status(200).json({
      message: req.user.firstName + ' is ' + status + ' in ' + toUser.firstName,
      data
    })
  } catch (error) {
    res.status(400).send("ERROR: " + error.message)
  }
}
const reviewConnectionRequestController = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const requestId = req.params.requestId;
    const status = req.params.status;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status type " + status
      })
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUserId,
      status: "interested"
    });

    if (!connectionRequest) {
      return res.status(404).json({
        message: "Connection request not found"
      })
    }
    connectionRequest.status = status;
    const data = await connectionRequest.save();
    res.status(200).json({
      message: "Connection Request " + status,
      data
    })
  } catch (error) {
    res.status(400).send("ERROR: " + error.message)
  }
}

module.exports = { sendConnectionRequestController, reviewConnectionRequestController }