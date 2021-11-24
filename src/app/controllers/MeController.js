const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    //[GET] /stored
    storedCourses(req, res, next) {
        // res.json(res.locals._sort);
        let courseQuery = Course.find({}).sortable(req);//let là gán lại được
        let countDeleteQuery = Course.countDocumentsDeleted();
        // //sort cơ bản có url trên web
        // if(req.query.hasOwnProperty('_sort')){
        //     const isValidType=['asc','desc'].includes(req.query.type);//kiểm tra type có hợp lệ hay không
        //     courseQuery=courseQuery.sort({
        //         [req.query.column]: isValidType ? req.query.type :'desc',
        //     });
        // }

        //Promise ==> bất đồng bộ
        //khi trả về mảng sẽ nhận về đối số tương ứng với 2 kết quả tương ứng truyền vào
        Promise.all([
            courseQuery,
            countDeleteQuery,
        ])
            .then(([courses, deleteCount]) =>
                res.render('me/stored-courses', {
                    deleteCount,
                    courses: mutipleMongooseToObject(courses)
                })
                //res.json(courses)
            )
            .catch(next);

        // Đã sữ dụng promise
        // Course.countDocumentsDeleted()
        //     .then((deleteCount) => {
        //         console.log(deleteCount);
        //     })
        //     .catch(() => { });

        // Course.find({})
        //     .then(courses => {
        //         res.render('me/stored-courses', {
        //             courses: mutipleMongooseToObject(courses),
        //         })
        //         //res.json(courses)
        //     })
        //     .catch(next);
    }

    //[GET] /trash
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => {
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
