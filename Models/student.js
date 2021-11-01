const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
  name: String,
  day: String,
  hour: String,
  registerAt: String,
});

const StudentSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  studentNumber: String,
  phone: String,
  career: String,
  Activities: [ActivitySchema],
});

StudentSchema.methods.AddActivity = function (activity) {
  if (!this.Activities.includes(activity)) {
    this.Activities.push(activity);
  }
};

StudentSchema.methods.IsActivityRegistered = function(activityFromParam) {
    for(let activity of this.Activities){
        if(activity.name === activityFromParam){
            return true;
        }
    }
    return false;
}

module.exports = mongoose.model("Student", StudentSchema);
