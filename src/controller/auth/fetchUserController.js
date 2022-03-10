const fetchUser = {
    fetch(req, res, next) {
        res.json({
            user: req.user || null
        })
    }
}

export default fetchUser;