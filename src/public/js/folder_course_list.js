function displayMessage(message) {
    var messageContainer= document.getElementById('message')
    messageContainer.innerHTML = 'message: '+ message.value
    messageContainer.style.color = message.color; 
  }
$(document).ready(function(){
    $('form[name="form"]').on('submit', function(event){
        event.preventDefault();
        //get tag 
        var spanID = $('span[name="span-id"]')
        var FolderImg = $('input[name="FolderImg"]')
        var FolderName = $('input[name="FolderName"]')
        var privacry = $('select[name="privacry"]')
        var Description= $('textarea[name="Description"]')
        var Button= document.getElementById('button-submit')
        //send by form data 
        var formData= new FormData();
        var text=  spanID.html()
        formData.append('FolderImg', FolderImg[0].files[0])
        formData.append('FolderName', FolderName.val())
        formData.append('privacry', privacry.val())
        formData.append('Description', Description.val())
        formData.append('FolderID', spanID.html())
        //send ajax req 
        var option = Button.innerHTML
        if(option == "Create Folder")
            insertFolderCourse(formData)
        else if (option == "Update Folder")
            updateFolderCourse(formData)
    })
})
function clearInput(){
    // get foldercourse-container
    var foldercourseform = document.querySelector('.foldercourse-container-form')
    // get component in input
    var inputFolderImg= foldercourseform.querySelector('img[name="FolderImg"]')
    var inputFolderName = foldercourseform.querySelector('input[name="FolderName"]')
    var inputDescription = foldercourseform.querySelector('textarea[name="Description"]')
    var inputPrivacry = foldercourseform.querySelector('select[name="privacry"]')
    var inputSpanID = foldercourseform.querySelector('span[name="span-id"]')
    var button= foldercourseform.querySelector('button[name="submit"]')
    // set value 
    inputFolderImg.setAttribute("src", "/img/common/add_image.png")
    inputFolderName.setAttribute("value", "")
    inputDescription.innerHTML = ""
    inputPrivacry.querySelector(`option[value="public"]`).selected = true
    inputSpanID.innerHTML = ""
    button.innerHTML = "Create Folder"
}
function setToForm(event){
    var input = event.target
    //
    // get foldercourse-container
    var foldercourse = input.closest(".foldercourse-container")
    var foldercourseform = document.querySelector('.foldercourse-container-form')
    // get component in foldercourse-container 
    var folderImg= foldercourse.querySelector('img[name="FolderImg"]')
    var folderName = foldercourse.querySelector('h5[name="FolderName"]')
    var description = foldercourse.querySelector('span[name="Description"]')
    var privacry = foldercourse.querySelector('p[name="privacry"]')
    var spanID = foldercourse.querySelector('span[name="span-id"]')
    // get component in input
    var inputFolderImg= foldercourseform.querySelector('img[name="FolderImg"]')
    var inputFolderName = foldercourseform.querySelector('input[name="FolderName"]')
    var inputDescription = foldercourseform.querySelector('textarea[name="Description"]')
    var inputPrivacry = foldercourseform.querySelector('select[name="privacry"]')
    var inputSpanID = foldercourseform.querySelector('span[name="span-id"]')
    var button= foldercourseform.querySelector('button[name="submit"]')
    // set value 
    inputFolderImg.setAttribute("src", folderImg.src)
    inputFolderName.setAttribute("value", folderName.innerHTML)
    inputDescription.innerHTML= description.innerHTML
    inputPrivacry.querySelector(`option[value="${privacry.innerHTML}"]`).selected = true
    inputSpanID.innerHTML = spanID.innerHTML
    button.innerHTML = "Update Folder"
    //alert("hello how r u?" + folderImg.src)
}

function getChoosenList(){
    var list = []
    var folderContainer= document.querySelectorAll(".foldercourse-container")
    for(let i= 0; i<folderContainer.length; i++){
        var divContainer = folderContainer[i]
        var choosen= divContainer.querySelector('input[name="choosen"]')
        var folderCourseName= divContainer.querySelector('h5[class="card-title"]')
        if(choosen.checked){
            list.push({
                id: choosen.value,
                name: folderCourseName.innerHTML
            })
        }
    }
    return list
}
function checkExistFolderName(event){
    try {
        var inputFolderName = event.target
        var inputValue = inputFolderName.value
        $.ajax({
            url: `/foldercourse/get`,
            type: "GET",
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify({ FolderName: inputValue }),
            success: function (data) {
            },
            error: function (xhr) {
                throw new Error("Something wrong happen")
            }
        })
    } catch (error) {
        displayMessage({
            value: error.message,
            color: 'red'
        })
    }
   
}
clearInput= function(event){
    var buttonClear = event.target
    var foldercourseform = buttonClear.closest(".foldercourse-container-form")
    // get component in input
    var inputFolderImg= foldercourseform.querySelector('img[name="FolderImg"]')
    var inputFolderName = foldercourseform.querySelector('input[name="FolderName"]')
    var inputDescription = foldercourseform.querySelector('textarea[name="Description"]')
    var inputPrivacry = foldercourseform.querySelector('select[name="privacry"]')
    var inputSpanID = foldercourseform.querySelector('span[name="span-id"]')
    var button= foldercourseform.querySelector('button[name="submit"]')
    //inputFolderImg
    inputFolderImg.setAttribute("src", "/img/common/add_image.png")
    inputFolderName.setAttribute("value", "")
    inputDescription.innerHTML= ""
    inputPrivacry.querySelector(`option[value="public"]`).selected = true
    inputSpanID.innerHTML = ""
    button.innerHTML = "Create Folder"
}
insertFolderCourse= function(formData){
    $.ajax({
        url: `/foldercourse`,
        type: "POST",
        processData: false,
        contentType: false,
        headers: {
            'Content-Type': undefined,
        },
        data: formData,
        success: function (data) {
            var message= document.getElementById("message")
            // message
            message.innerHTML=  data.message.value
            message.setAttribute("style", `color: ${data.message.color};` )
            //reset input 
            // element folder in list
            var folder_container = document.getElementById("folder-container")
            var folderChild= ` 
                                <div class="col foldercourse-container" name="${data.FolderCourse.FolderID}">
                                    <div class="card h-100">
                                    <a href="/foldercourse/${data.FolderCourse.CustomerID}/${data.FolderCourse.FolderName}">
                                        <img src="/img/user/${data.FolderCourse.CustomerID}/FolderCourse/${data.FolderCourse.FolderID}/${data.FolderCourse.FolderImg}" class="card-img-top h-70" 
                                            alt="${data.FolderCourse.FolderName}">
                                    </a>
                                    <span class="span-id" name="span-id">${data.FolderCourse.FolderID}</span>
                                    <div class="h-30 card-body">
                                        <div class="d-flex flex-row">
                                        <input class="card-checkbox" type="checkbox" id="choosen" name="choosen" value="${data.FolderCourse.FolderID}">
                                        <h5 class="card-title">${data.FolderCourse.FolderName}</h5>
                                        <p class="card-privacry">${data.FolderCourse.privacry}</p>
                                        </div>
                                        
                                        <p class="card-text">
                                        <span class="truncate-text ">${data.FolderCourse.Description}</span>
                                        <a href="#" class="read-more ">Xem thêm</a>
                                        </p>
                                    </div>
                                    </div>
                                </div>
                            `
            folder_container.innerHTML += folderChild
            
        },
        error: function (xhr) {
            console.log("Có lỗi xảy ra");
        }
    });
}
updateFolderCourse = function(formData){
    $.ajax({
        url: `/foldercourse`,
        type: "PUT",
        processData: false,
        contentType: false,
        headers: {
            'Content-Type': undefined,
        },
        data: formData,
        success: function (data) {  
            //var clear=  document.querySelector(`input[name="reset"]`)
            //click event
            //clear.click()
            //get container element
            var FolderCourse = data.FolderCourse
            var foldercourse = document.querySelector(`div[name="${FolderCourse.FolderID}"]`)
            // get component in foldercourse-container 
            var folderImg= foldercourse.querySelector('img[name="FolderImg"]')
            var folderName = foldercourse.querySelector('h5[name="FolderName"]')
            var description = foldercourse.querySelector('span[name="Description"]')
            var privacry = foldercourse.querySelector('p[name="privacry"]')
            // set value 
            folderImg.setAttribute("src", `/img/user/${data.CustomerID}/FolderCourse/${FolderCourse.FolderID}/${FolderCourse.FolderImg}`)
            folderName.innerHTML =  FolderCourse.FolderName
            description.innerHTML = FolderCourse.Description
            privacry.innerHTML = FolderCourse.privacry
            //
            displayMessage(data.message)
        },
        error: function (xhr) {
            console.log("Có lỗi xảy ra");
        }
    });
}
function deleteHanlder(){
    try {
        var list = getChoosenList()
        var id = []
        if(list.length <= 0) throw new Error("You must choose folder that need to delete")
        var temp = ""
        list.forEach(element => {
            temp += `\n + [${element.id}] ${element.name}`
            id.push(element.id)
        });
        if(!confirm(`Are you sure you want to delete[${list.length}] ${temp}`)) return
        $.ajax({
                url: `/foldercourse`,
                type: "DELETE",
                processData: false,
                contentType: 'application/json',
                data: JSON.stringify({ id: id }),
                success: function (data) {
                    var message= document.getElementById("message")
                    // message
                    displayMessage(data.message)
                    // display none all div that be deleted
                    var folderContainer= document.querySelectorAll(".foldercourse-container")
                    for(let i= 0; i<folderContainer.length; i++){
                        var divContainer = folderContainer[i]
                        var choosen= divContainer.querySelector('input[name="choosen"]')
                        if(id.indexOf(choosen.value) !== -1)
                            divContainer.setAttribute("style", "display: none")
                    }
                },
                error: function (xhr) {
                    throw new Error(xhr.responseText)
                }
            }
        )
    } catch (error) {
        displayMessage({
            value: error.message,
            color: 'red'
        })
    }
}