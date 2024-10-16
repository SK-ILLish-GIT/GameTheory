import mongoose from "mongoose";
const CourtSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    sport: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sports',
      required: true,
    }
  });
  
const courtModel = mongoose.model('Courts', CourtSchema);
export default courtModel;