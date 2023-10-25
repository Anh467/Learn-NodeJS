//import {displayMessage} from "./common/displayMessage"
//import {getQuiz} from "./api/quizAPI"
    var questionTotal=[]    
/*var questionTotal = [
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
        question: "Trái Đất có mặt trời ở giữa không?",
        answer: [
            {
                value: "Có",
                isCorrect: false
            },
            {
                value: "Không",
                isCorrect: true
            }
        ]
    },
    {
        question: "Bao nhiêu ngày trong một năm?",
        answer: [
            {
                value: "365",
                isCorrect: true
            },
            {
                value: "366",
                isCorrect: false
            },
            {
                value: "360",
                isCorrect: false
            }
        ]
    },
    {
        question: "Mặt Trời có trái đất?",
        answer: [
            {
                value: "Có",
                isCorrect: true
            },
            {
                value: "Không",
                isCorrect: false
            }
        ]
    },
    {
        question: "Loài chim nào có khả năng bay ngược?",
        answer: [
            {
                value: "Kiwi",
                isCorrect: true
            },
            {
                value: "Đại bàng",
                isCorrect: false
            },
            {
                value: "Chim cánh cụt",
                isCorrect: false
            }
        ]
    },
    {
        question: "Con người có thể thở dưới nước không?",
        answer: [
            {
                value: "Có",
                isCorrect: false
            },
            {
                value: "Không",
                isCorrect: true
            }
        ]
    },
    {
        question: "Bao nhiêu quốc gia trên thế giới?",
        answer: [
            {
                value: "195",
                isCorrect: false
            },
            {
                value: "206",
                isCorrect: true
            },
            {
                value: "180",
                isCorrect: false
            }
        ]
    },
    {
        question: "Ngôn ngữ phổ biến nhất trên thế giới là gì?",
        answer: [
            {
                value: "Tiếng Anh",
                isCorrect: true
            },
            {
                value: "Tiếng Trung",
                isCorrect: false
            },
            {
                value: "Tiếng Tây Ban Nha",
                isCorrect: false
            }
        ]
    },
    {
        question: "Đâu là hành tinh lớn nhất trong Hệ Mặt Trời?",
        answer: [
            {
                value: "Sao Mộc",
                isCorrect: false
            },
            {
                value: "Sao Thổ",
                isCorrect: false
            },
            {
                value: "Sao Mộc",
                isCorrect: false
            },
            {
                value: "Sao Hỏa",
                isCorrect: true
            }
        ]
    },
    {
        question: "Bao nhiêu chữ cái trong bảng chữ cái tiếng Anh?",
        answer: [
            {
                value: "24",
                isCorrect: false
            },
            {
                value: "26",
                isCorrect: true
            },
            {
                value: "28",
                isCorrect: false
            }
        ]
    }
  ];*/
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
  function getDetailAnswer(pList){
    var isOwn = document.getElementById("isOwn").innerHTML
    var temp = ""
    for(let i = 0; i < pList.length; i++)
        temp += `   
                    <li name="answer"> 
                        ${String.fromCharCode(65 + i)}. <span name="value" ${(isOwn=="true")? `contentEditable = "true" `: `contentEditable = "false" `}>${pList[i].value}</span>
                        ${(isOwn=="true")?`<select name="isCorrect" class="is-correct">
                                            <option value="true" ${pList[i].isCorrect?"selected":""}> 
                                                true
                                            </option>
                                            <option value="false" ${pList[i].isCorrect?"":"selected"}> 
                                                false
                                            </option>
                                        </select>`
                                        :
                                        `<i class="fa-solid ${pList[i].isCorrect?"fa-check":"fa-xmark"}">
                                        </i>`
                                    }
                        
                    </li>`
    return temp
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
    questionTotal.push(question)
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
  clearAllData= function(){
    var carousel_indicator = document.querySelector(".carousel-indicators");
    var detail = document.querySelector("#detail");
    var carousel_indicatorButton = carousel_indicator.querySelectorAll("button");
    var carousel_inner = document.querySelector(".carousel-inner");
    var init = carousel_indicatorButton.length
    carousel_indicator.innerHTML = ""
    carousel_inner.innerHTML = ""
    detail.innerHTML = ""
    questionTotal= []
  }
  getDataByAjax = async function(QuizzesID) {
    try {
        var temp = await getQuiz(QuizzesID)
                        .catch(function(error) {
                            throw error;
                        });
        loadQuestion(temp.quizzes.questions)
        setCurrent()
    } catch (e) {
        showNotification({
            value: e.message,
            color: "red"
        }, 2000);
    }
  }
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
  resetQuestionEvent = async function(event){
    var buttonSave = event.target
    var containDetail = buttonSave.closest('.contain-detail')
    var index = containDetail.querySelector('span[name="index"]').innerHTML.trim()
    containDetail.innerHTML = getDetailContainer(questionTotal[0][parseInt(index)], parseInt(index))
  }
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
  addEventListener("load", (event) => {
    try {
        var QuizzesID= document.getElementById('QuizzesID').innerHTML
        getDataByAjax(QuizzesID)
       // loadQuestion(questionTotal)
        setCurrent()
    } catch (error) {
        alert(error.message)
    }
    
  });
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
  function setTotal(){
    var carousel_indicator = document.querySelector(".carousel-indicators");
    var carousel_indicatorButton = carousel_indicator.querySelectorAll("button");
    var total = document.getElementById('total')
    total.innerHTML = "Total: "+ carousel_indicatorButton.length
    GB_Total = carousel_indicatorButton.length
    //alert(GB_Total)
  }
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