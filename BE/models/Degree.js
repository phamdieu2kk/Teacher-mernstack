const degreeSchema = new mongoose.Schema({
  type: { type: String, required: true, trim: true },
  school: { type: String, default: '' },
  major: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  isGraduated: { type: Boolean, default: true },
}, { _id: false });
