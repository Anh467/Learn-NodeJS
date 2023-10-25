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
getQuiz = function(quizzesid) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: `${API_GET_QUIZ.url}/${quizzesid}`,
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
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `${API_CREATE_QUIZ.url}/${quizzesid}`,
            type: API_CREATE_QUIZ.method,
            contentType: "application/json",
            data: JSON.stringify(inputBody),
            success: function(data) {
              resolve(data);
            },
            error: function(xhr) {
              reject(xhr.responseText);
            }
        });
    });
}
// [DELETE] {/:quizzesid/:index} delete question according quizzesID and index of question
deleteQuiz = function(quizzesid, index){
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `${API_DELETE_QUIZ.url}/${quizzesid}/${index}`,
            type: API_DELETE_QUIZ.method,
            contentType: "application/json",
            success: function(data) {
              resolve(data);
            },
            error: function(xhr) {
              reject(xhr.responseText);
            }
        });
    })
}
// [PUT] {/:quizzesid/:index} update quiz according quizzesID and index of question
updateQuiz = function(quizzesid, index, inputBody){
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `${API_UPDATE_QUIZ.url}/${quizzesid}/${index}`,
            type: API_UPDATE_QUIZ.method,
            contentType: "application/json",
            data: JSON.stringify(inputBody),
            success: function(data) {
              resolve(data);
            },
            error: function(xhr) {
              reject(xhr.responseText);
            }
        });
    })
}
// module.exports = {
//     getQuiz: getQuiz,
//     postQuiz: postQuiz,
//     deleteQuiz: deleteQuiz,
//     createQuiz: createQuiz
// };