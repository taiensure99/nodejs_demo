const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  _id:{ type: Number},
  name: { type: String, require: true },
  description: { type: String },
  image: { type: String, maxlength: 255 },
  slug: { type: String, slug: 'name', unique: true },
  videoId: { type: String, require: true },
  level: { type: String, maxlength: 255 },
}, {
  _id:false,
  timestamps: true,
});

//Custom query helper
CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty('_sort')) {
    const isValidType = ['asc', 'desc'].includes(req.query.type);//kiểm tra type có hợp lệ hay không
    return this.sort({
      [req.query.column]: isValidType ? req.query.type : 'desc',
    });   
  }
  return this;//nhớ kĩ ngoài vòng if
}

//add flugin 
mongoose.plugin(slug);
 CourseSchema.plugin(AutoIncrement)

//soft delete
CourseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});


module.exports = mongoose.model('Course', CourseSchema);