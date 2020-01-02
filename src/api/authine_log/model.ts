import * as mongoose from 'mongoose';
import * as paginate from 'mongoose-paginate';

export default mongoose.model('Authinelog',
  new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    workItem: {
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