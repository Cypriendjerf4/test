import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  productFamily: { type: String, required: true },
  ropeDiameter: { type: String, required: true },
  ropeColor: { type: String, required: true },
  ropeType: { type: String, required: true },
  configType: { type: String, required: true },
  totalLength: { type: Number, required: true },
  mainConnector: { type: String, required: true },
  ceMarking: { type: String, required: true },
  strand1Length: { type: Number, required: true },
  strand1Termination: { type: String, required: true },
  strand2Length: { type: Number },
  strand2Termination: { type: String },
  clientInfo: {
    companyName: String,
    email: String
  },
  productReference: String,
  price: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Quote', quoteSchema);
