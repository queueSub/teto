const mongoose = require("mongoose");

const surveySchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  // uploadTime: {
  //   year: {

  //   }
  // },
  types: {
    type: Array,
  },
  questions: {
    type: Array,
  },
});

//mongoose의 메소드, index.js에서 save전에 수행할 내용 정의
// surveySchema.pre("save", function (next) {
//   let survey = this; //저장될 survey 정보를 가져온다.

//   // save 이전 처리할 사항 작성
//   if (survey.isModified("title")) {
//   } else {
//     next();
//   }
// });

//스키마를 모델로 감싸준다.
const Survey = mongoose.model("Survey", surveySchema);

//이 모델을 다른 곳에서 쓸 수 있도록
module.exports = { Survey };
