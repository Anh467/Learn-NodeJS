const ROUTER_QUIZ = "/quiz"
const GET = 'GET'
const DELETE = 'DELETE'
const POST = 'POST'
const PUT = 'PUT'
// [GET]    {/:quizzesid}        get list quiz according quizzesID
const API_GET_QUIZ    = {
    url : ROUTER_QUIZ,
    method: GET,
}
// [PUT] {/:quizzesid/:index} update quiz according quizzesID and index of question
const API_UPDATE_QUIZ = {
    url : ROUTER_QUIZ,
    method: PUT,
}
// [POST]   {/:quizzesid}        create new quiz according quizzesID
const API_CREATE_QUIZ = {
    url : ROUTER_QUIZ,
    method: POST,
}
// [DELETE] {/:quizzesid/:index} delete question according quizzesID and index of question
const API_DELETE_QUIZ = {
    url : ROUTER_QUIZ,
    method: DELETE,
}

// [GET]    {/:quizzesid}        get list quiz according quizzesID
function getQuiz(QuizzesID) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: `${API_GET_QUIZ.url}/${QuizzesID}`,
        type: API_GET_QUIZ.method,
        contentType: "application/json",
        success: function(data) {
          resolve(data);
        },
        error: function(xhr) {
          reject(xhr.responseText);
        }
      });
    });
  }
// [POST]   {/:quizzesid}        create new quiz according quizzesID
createQuiz = function(quizzesid, inputBody){

}
// [DELETE] {/:quizzesid/:index} delete question according quizzesID and index of question
deleteQuiz = function(quizzesid, index){

}
// [PUT] {/:quizzesid/:index} update quiz according quizzesID and index of question
updateQuiz = function(quizzesid, index){

}
// module.exports = {
//     getQuiz: getQuiz,
//     postQuiz: postQuiz,
//     deleteQuiz: deleteQuiz,
//     createQuiz: createQuiz
// };