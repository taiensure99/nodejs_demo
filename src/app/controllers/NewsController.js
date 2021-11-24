class NewsController {
    //[GET] new
    index(req, res) {
        res.render('news');
    }

    //[GET] slug
    show(req, res) {
        res.send('NEW DETAIL');
    }
}

module.exports = new NewsController();
