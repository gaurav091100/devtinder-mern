const getProfileDetailsController = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({
      data: user
    })
  } catch (error) {
    res.status(400).send("Error retriving user profile " + error.message)
  }
}


module.exports = { getProfileDetailsController }