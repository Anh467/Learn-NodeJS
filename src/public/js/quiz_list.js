
  var GB_questionTotal=[]    
  var questionLoadMore =  [
    {
        question: "Trái Đất là hành tinh thứ mấy trong Hệ Mặt Trời?",
        answer: [
            {
                value: "Hành tinh thứ 1",
                isCorrect: true
            },
            {
                value: "Hành tinh thứ 2",
                isCorrect: false
            },
            {
                value: "Hành tinh thứ 3",
                isCorrect: true
            },
            {
                value: "Hành tinh thứ 4",
                isCorrect: false
            }
        ]
    },
    {
        question: "Ai là người phát minh ra đèn đom?",
        answer: [
            {
                value: "Thomas Edison",
                isCorrect: true
            },
            {
                value: "Albert Einstein",
                isCorrect: false
            },
            {
                value: "Isaac Newton",
                isCorrect: false
            },
            {
                value: "Galileo Galilei",
                isCorrect: false
            }
        ]
    },
    {
        question: "Ai là tác giả của bức tranh Mona Lisa nổi tiếng?",
        answer: [
            {
                value: "Leonardo da Vinci",
                isCorrect: true
            },
            {
                value: "Vincent van Gogh",
                isCorrect: false
            },
            {
                value: "Pablo Picasso",
                isCorrect: false
            },
            {
                value: "Claude Monet",
                isCorrect: false
            }
        ]
    },
    {
        question: "Câu nói 'I have a dream' nổi tiếng được phát biểu bởi ai?",
        answer: [
            {
                value: "Martin Luther King Jr.",
                isCorrect: true
            },
            {
                value: "Abraham Lincoln",
                isCorrect: false
            },
            {
                value: "John F. Kennedy",
                isCorrect: false
            },
            {
                value: "Winston Churchill",
                isCorrect: false
            }
        ]
    },
    {
        question: "Ngôn ngữ lập trình JavaScript được tạo bởi ai?",
        answer: [
            {
                value: "Brendan Eich",
                isCorrect: true
            },
            {
                value: "Linus Torvalds",
                isCorrect: false
            },
            {
                value: "Mark Zuckerberg",
                isCorrect: false
            },
            {
                value: "Tim Berners-Lee",
                isCorrect: false
            }
        ]
    }
  ];

  var GB_Total = 0
  var GB_current = 0
  var GB_Index = 0
// render ui
  function getCarouselIndicatorsButton(i){
    if(i == GB_Index)
      return `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i+1}">
            </button>`;
    return `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}">
        </button>`;
  }
  function getAnswerP(pList, check){
    var temp = ""
    if(!check)
        for(let i = 0; i < pList.length; i++)
          temp += `<p>${String.fromCharCode(65 + i)}. ${pList[i].value}</p>`
    else{
      for(let i = 0; i < pList.length; i++)
        if(pList[i].isCorrect)
          temp += `<p>${String.fromCharCode(65 + i)}. ${pList[i].value}</p>`
    } 
    return temp
  }
  function getCarouselItemDiv(input, i){
    var pList= input.answer
    var question= input.question
    return `
        <div class="carousel-item ${i == GB_Index ? "active" : ""} w-100 h-100 " style="background-color: black;">     
            <div class="w-100 h-100 d-flex align-items-center justify-content-center flip-card">
              <div class="flip-card-inner ">
                <div class="flip-card-front w-100 h-100 d-flex align-items-center justify-content-center">
                  <div class="mx-auto " style="width: 90%; margin-bottom: 0;">
                    <p style="color: azure; margin: 0px 0px 10px 0px;">${i + 1}. ${question}</p>
                    ${getAnswerP(pList, false)}
                  </div>
                </div>
                <div class="flip-card-back w-100 h-100 d-flex align-items-center justify-content-center">
                  <div class="row" style="display: flex; flex-wrap: wrap;">
                    ${getAnswerP(pList, true)}                                                 
                  </div>
                </div>
              </div>
            </div>
        </div>`
  }
  function getAnswer(input, i){
    var isOwn = document.getElementById("isOwn").innerHTML
    return `   <li name="answer"> 
        ${(isOwn=="true")?`<i class=" fa-solid fa-trash-can" 
                                onclick="deleteLiAnswer(event)"> 
                            </i>`
                            :
                            ''}
        ${String.fromCharCode(65 + i)}. <span class="border-solid" name="value" ${(isOwn=="true")? `contentEditable = "true" `: `contentEditable = "false" `}
        style=" min-width: 20px;
                display: inline-block;
                white-space: pre-wrap;
                min-height: 1em;
                outline: none;"
        >${input.value}</span>
        ${(isOwn=="true")?`<select name="isCorrect" class="is-correct">
                            <option value="true" ${input.isCorrect?"selected":""}> 
                                true
                            </option>
                            <option value="false" ${input.isCorrect?"":"selected"}> 
                                false
                            </option>
                        </select>`
                        :
                        `<i class="fa-solid ${input.isCorrect?"fa-check":"fa-xmark"}">
                        </i>`
                    }
        
        </li>`
  }
  function getDetailAnswer(pList){
    
    var temp = ""
    for(let i = 0; i < pList.length; i++)
        temp += getAnswer(pList[i], i)
    return temp
  }
  function addLiAnswerInUl(event){
    var button = event.target
    var containDetail = button.closest('.contain-detail')
    var answerUl = containDetail.querySelector('ul');
    var answerLi =  answerUl.querySelectorAll('li')
    answerUl.innerHTML = answerUl.innerHTML + getAnswer({
                                                            value: "",
                                                            isCorrect: false
                                                        },
                                                        answerLi.length
                                                    )
  }
  function getDetailContainer(input, i){
    var pList= input.answer
    var question= input.question
    var isOwn = document.getElementById("isOwn").innerHTML
    return `
                <span name="index" style="display:none">${i}</span>
                <div style="display: inline;" class="w-50" >

                <div class="d-flex">
                    <span class="mx-auto index" style="display: inline;"> ${i + 1}</span>
                    <span>.</span>
                    <span class="text-start textarea question w-90 border-none" 
                        role="textbox" 
                        name="question"
                        contentEditable = "false">${question}</span>
                </div>
                
               
                <i class=" fa-solid fa-play rotate-ele-0 " 
                    onclick="toggleDetails(event)"
                    title="Click to list answer!">
                </i>
                ${(isOwn=="true")?` <i class="fa-style fa-solid fa-pen " 
                                        style="display: inline;" 
                                        onclick="editEvent(event)"
                                        title="Click to edit question!">
                                    </i>
                                    <i class="fa-style fa-solid fa-square-check " 
                                        style="display: inline;" 
                                        onclick="saveQuestionEvent(event)"
                                        title="Click to save input!">
                                    </i>
                                    <i class="fa-style fa-solid fa-trash-can"
                                        style="display: inline;" 
                                        onclick="deleteQuestionEvent(event)"
                                        title="Click to delete this question!">
                                    </i>
                                    <i class="fa-style fa-solid fa-rotate-left"
                                        style="display: inline;" 
                                        onclick="resetQuestionEvent(event)"
                                        title="Click to reset all input!">
                                    </i>
                                    <i class="fa-style fa-solid fa-plus"
                                        style="display: inline;" 
                                        onclick="addLiAnswerInUl(event)"
                                        title="Click to add new answer!">
                                    </i>
                                    `: ""}
                
                
                </div>
                <div class= "details display-none" style="background-color: none; border: none;">
                <ul>
                    ${getDetailAnswer(pList)}

                </ul>
                </div>
                
            `
  }
  function loadQuestion(question) {
    if (question.length == 0) {
        
        showNotification({
            value: "There are no quiz in this cover: ",
            color: "red"
        }, 2000);
    }
    GB_questionTotal.push(question)
    var carousel_indicator = document.querySelector(".carousel-indicators");
    var detail = document.querySelector("#detail");
    var carousel_indicatorButton = carousel_indicator.querySelectorAll("button");
    var carousel_inner = document.querySelector(".carousel-inner");
    var init = carousel_indicatorButton.length
    // carousel_indicators.innerHTML = "";
    // carousel_inner.innerHTML = "";
    for (let i = 0 + init; i < question.length + init; i++) {
      carousel_indicator.innerHTML = carousel_indicator.innerHTML + getCarouselIndicatorsButton(i);
      carousel_inner.innerHTML = carousel_inner.innerHTML + getCarouselItemDiv(question[i-init], i);
      detail.innerHTML = detail.innerHTML + `<div class="contain-detail ">
                                                ${getDetailContainer(question[i-init], i)}
                                            </div>`
    }
    setTotal()
  }
// common handler
  // clear all input, data, and field
  clearAllData= function(){
    var carousel_indicator = document.querySelector(".carousel-indicators");
    var detail = document.querySelector("#detail");
    var carousel_indicatorButton = carousel_indicator.querySelectorAll("button");
    var carousel_inner = document.querySelector(".carousel-inner");
    var init = carousel_indicatorButton.length
    carousel_indicator.innerHTML = ""
    carousel_inner.innerHTML = ""
    detail.innerHTML = ""
    GB_questionTotal= []
  }
  // get input the block arccoring button position
  getInputContainDetail= function(containDetail){
    // trong mảng question answer đại diện cho danh sách các đáp án 
    var input
    var answerList= []
    var questionSpan = containDetail.querySelector('span[name="question"]')
    var answers = containDetail.querySelectorAll('li[name="answer"]')
    answers.forEach(element => {
        var value = element.querySelector('span[name="value"]')
        var options = element.querySelector('select[name="isCorrect"]')
        var isCorrect = false
        if( options.value == "true")
            isCorrect = true
        answerList.push({
            value: value.innerHTML,
            isCorrect: isCorrect
        })
    });
    input = {
        question: questionSpan.innerHTML,
        answer: answerList
    }
    //alert(input)
    return input
  }
  // set total
  function setTotal(){
    var carousel_indicator = document.querySelector(".carousel-indicators");
    var carousel_indicatorButton = carousel_indicator.querySelectorAll("button");
    var total = document.getElementById('total')
    total.innerHTML = "Total: "+ carousel_indicatorButton.length
    GB_Total = carousel_indicatorButton.length
    //alert(GB_Total)
  }
  // set current
  function setCurrent(){
      // Lấy phần tử carousel
      var myCarousel = $('#carouselExampleIndicators');
      // Lấy chỉ số của slide hiện tại
      var activeSlideIndex = myCarousel.find('.carousel-item.active').index();
      var current = document.getElementById('current')
      current.innerHTML = 'Current: ' + (activeSlideIndex + 1) 
      GB_current = activeSlideIndex + 1
      //alert(GB_current)
  }
// button event
  // delete an Answer
  deleteLiAnswer = function(event){
    try{
        var button = event.target
        var answerLi = button.closest('li[name="answer"]');
        var answer = answerLi.querySelector('span[name="value"]')
        if(!confirm('Are you sure you want to delete answer: ' + answer.innerHTML))
            return
        answerLi.remove()   
        showNotification({
            value: "delete success answer: " + answer.innerHTML,
            color: "green"
        }, 2000);
    }catch(err){
        showNotification({
            value: err.message,
            color: "red"
        }, 2000);
    }
  }
  // render data questions from db
  getDataByAjax = async function(QuizzesID) {
    try {
        if(QuizzesID== undefined || QuizzesID== "" ) throw new Error('No quiz found')
        var temp = await getQuiz(QuizzesID)
                        .catch(function(error) {
                            throw error;
                        });
        if(temp == undefined) throw new Error('No quiz found')
        if(!temp.quizzes) throw new Error('No quiz found')
        if(!temp.quizzes.questions) throw new Error('No quiz found')
        loadQuestion(temp.quizzes.questions)
        setCurrent()
    } catch (e) {
        showNotification({
            value: e.message,
            color: "red"
        }, 2000);
    }
  }
  // create a question and save in the database
  insertQuestionEvent = async function(event){
    try {
        var buttonSave = event.target
        var containDetail = buttonSave.closest('.contain-detail')
        var input = getInputContainDetail(containDetail)
        // validate
        if( input.question.trim() == undefined || input.question.trim() == "" ) throw new Error('Câu hỏi không được để trống')
        if( input.answer.length == 0 ) throw new Error('Phải có ít nhất 1 câu trả lời')
        // do ajax
        var QuizzesID= document.getElementById('QuizzesID').innerHTML
        var temp = await createQuiz(QuizzesID,
                                    {
                                        param: input
                                    }
                                    )
                                    .catch(function(error) {
                                        throw error;
                                    });
        clearAllData()
        loadQuestion(temp.quiz.questions)
        showNotification(temp.message, 2000);
        setCurrent()
    }catch(error){
        showNotification({
            value: error.message,
            color: "red"
        }, 2000);
    }
  }
  // update a question and save in the database
  saveQuestionEvent = async function(event){
    try {
        var buttonSave = event.target
        var containDetail = buttonSave.closest('.contain-detail')
        var index = containDetail.querySelector('span[name="index"]').innerHTML.trim()
        var input = getInputContainDetail(containDetail)
        var QuizzesID= document.getElementById('QuizzesID').innerHTML
        var temp = await updateQuiz(QuizzesID,
                                    index, 
                                    {
                                        param: input
                                    },
                                    )
                                    .catch(function(error) {
                                        throw error;
                                    });
        clearAllData()
        loadQuestion(temp.quiz.questions)
        showNotification(temp.message, 2000);
        setCurrent()
    } catch (error) {
        showNotification({
            value: error.message,
            color: "red"
        }, 2000);
    }
   
  }
  // set input data return to the begining
  resetQuestionEvent = async function(event){
    var buttonSave = event.target
    var containDetail = buttonSave.closest('.contain-detail')
    var index = containDetail.querySelector('span[name="index"]').innerHTML.trim()
    containDetail.innerHTML = getDetailContainer(GB_questionTotal[0][parseInt(index)], parseInt(index))
  }
  // delete a question in the database
  deleteQuestionEvent = async function(event){
    if(!confirm('Are you sure you want to delete')) return
    try{
         var buttonSave = event.target
        var containDetail = buttonSave.closest('.contain-detail')
        var index = containDetail.querySelector('span[name="index"]').innerHTML.trim()
        var QuizzesID= document.getElementById('QuizzesID').innerHTML
        var temp = await deleteQuiz(
                                        QuizzesID,
                                        index, 
                                    )
                                    .catch(function(error) {
                                        throw error;
                                    });
        clearAllData()
        loadQuestion(temp.quiz.questions)
        showNotification(temp.message, 2000);
        setCurrent()
    }catch(error){
        showNotification({
            value: error.message,
            color: "red"
        }, 2000);
    }
  }
// event when load page and auto render data
  addEventListener("load", (event) => {
    try {
        var QuizzesID= document.getElementById('QuizzesID').innerHTML
        getDataByAjax(QuizzesID)
       // loadQuestion(GB_questionTotal)
        setCurrent()
    } catch (error) {
        alert(error.message)
    }
    
  });
// others
  function reachTo(){
      try {
          // giá trị mà slide mới đến 
          var value = document.getElementById('number').value
          // lấy giá trị mà có bao nhiêu
          var total = GB_Total
           // lấy giá trị hiện tại
           var current = GB_current
          // kiểm tra có phải là số không 
          if(!value)
              throw new Error("Please Enter a number")
          // kiểm tra số có nằm trong khoảng phù hợp 
          if(value > total)
              throw new Error("Please select value under total")
          // kiểm tra số nhập vào có phải là số dương không 
          if(value <= 0)
              throw new Error("Please Enter positive number")
          // lấy danh sách của item 
          var currentActiveSlide = document.querySelector("#carouselExampleIndicators .carousel-item.active");
          // Kiểm tra nếu có phần tử hiện tại có class "active"
          if (currentActiveSlide) {
              // Loại bỏ class "active" khỏi phần tử hiện tại
              currentActiveSlide.classList.remove("active");
          }
          document.querySelector(`#carouselExampleIndicators .carousel-item:nth-child(${value})`).classList.add("active");
          setCurrent()
      } catch (error) {
          alert(error.message)
      }
      
  }
  function loadmore(){
    loadQuestion(questionLoadMore)
  }
  $(document).ready(function() {
      // Lắng nghe sự kiện 'slide.bs.carousel'
      $('#carouselExampleIndicators').on('slide.bs.carousel', function (e) {
          var slideFrom = $(this).find('.active').index();
          var slideTo = $(e.relatedTarget).index();
          var current = document.getElementById('current')
          current.innerHTML = 'Current: ' + (slideFrom + 1) 
          console.log('Slide từ: ' + slideFrom + ' đến: ' + slideTo);
          GB_current = slideFrom + 1
          // Thực hiện hành động cần thiết ở đây
      });
  });
  function toggleDetails(event) {
    //var button = event.target
    var iconDropDown = event.target
    var containDetail = iconDropDown.closest('.contain-detail')
    var details = containDetail.querySelector('.details')

    iconDropDown.classList.toggle('rotate-ele-90')
    iconDropDown.classList.toggle('rotate-ele-0')
    details.classList.toggle('display-block')
    details.classList.toggle('display-none')
  }
  function editEvent(event){
    var iconEdit = event.target
    var containDetail = iconEdit.closest('.contain-detail')
    var details = containDetail.querySelector('.details') 
    var question = containDetail.querySelector('.question')

    iconEdit.classList.toggle('fa-pen')
    iconEdit.classList.toggle('fa-lock')
    question.classList.toggle('border-none')
    question.classList.toggle('border-solid')
    // Đảm bảo phần tử <span> có thể chỉnh sửa
    var tempCheck 
    if (question.contentEditable.toString() === "false")
      tempCheck = true
    else tempCheck = false
    question.contentEditable = tempCheck;
  }