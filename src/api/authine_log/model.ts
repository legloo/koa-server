import * as mongoose from 'mongoose';
import * as paginate from 'mongoose-paginate';

export default mongoose.model('Authinelog',
  new mongoose.Schema({
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    title: {
      type: String,
      required: true
    },
    workItem: {
      type: String,
      required: true
    },
    month: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      default: Date.now()
    }
  })
    .plugin(paginate)
);