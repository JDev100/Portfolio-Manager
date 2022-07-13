module.exports.getDow = async (req, res, next) => {
    try {
        res.json({msg: "poop"})
    } catch (error) {
        next(error)
    }
}