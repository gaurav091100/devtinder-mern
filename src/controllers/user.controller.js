const ConnectionRequest = require("../models/connectionRequest.model");


const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "gender",
  "about",
  "skills"
]
const userRequestsController = async (req, res) => {
  try {
    const loggedInUser = req.user;
    // const connectionRequests = await ConnectionRequest.find({
    //   toUserId: loggedInUser._id,
    //   status: "interested"
    // }).populate("fromUserId",["firstName","lastName", "photoUrl", "age", "gender", "about", "skills"])

    // res.status(200).json({
    //   message: "Fetched all connection requests",
    //   data: connectionRequests
    // })

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested"
    }).populate("fromUserId", USER_SAFE_DATA);

    // Transform result: move fromUserId data into "user" key
    const formattedRequests = connectionRequests.map(request => {
      const { fromUserId, ...rest } = request.toObject();
      return {
        ...rest,
        user: fromUserId
      };
    });

    res.status(200).json({
      message: "Fetched all connection requests",
      data: formattedRequests
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message)
  }
}

const userConnectionsController = async (req, res) => {
  try {
    const loggedInUser = req.user;


    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ]
    })
      .populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)

    const data = connections.map((connection) => {
      if (connection.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return connection.toUserId;
      } else {
        return connection.fromUserId;
      }
    })

    res.status(200).json({
      message: "Fetched all connection requests",
      data
    });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message)
  }
}


module.exports = { userRequestsController, userConnectionsController }