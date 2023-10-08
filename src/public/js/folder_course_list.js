$(document).ready(function() {
    $(".read-more").click(function(e) {
        e.preventDefault();
        var $paragraph = $(this).prev(".truncate-text"); // Thêm dấu chấm trước "truncate-text"
        $paragraph.toggleClass("expanded");
        if ($paragraph.hasClass("expanded")) {
            $(this).text("Rút gọn");
        } else {
            $(this).text("Xem thêm");
        }
    });
});
function changeImageOnInput(event) {
    var input = event.target;
    var img = input.parentElement.getElementsByTagName('img')[0];
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$(document).ready(function(){
    $('form[name="form"]').on('submit', function(event){
        event.preventDefault();
        //get tag 
        var FolderImg = $('input[name="FolderImg"]')
        var FolderName = $('input[name="FolderName"]')
        var privacry = $('select[name="privacry"]')
        var Description= $('textarea[name="Description"]')
        //send by form data 
        var formData= new FormData();
        formData.append('FolderImg', FolderImg[0].files[0])
        formData.append('FolderName', FolderName.val())
        formData.append('privacry', privacry.val())
        formData.append('Description', Description.val())
        //send ajax req 
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
                message.innerHTML= data.message.value
                message.setAttribute("style", `color: ${data.message.color};` )
                //reset input 
                // element folder in list
                var folder_container = document.getElementById("folder-container")
                var folderChild= ` 
                                    <div class="col">
                                        <div class="card h-100">
                                        <a href="/foldercourse/${data.FolderCourse.CustomerID}/${data.FolderCourse.FolderName}">
                                            <img src="/img/user/${data.FolderCourse.CustomerID}/FolderCourse/${data.FolderCourse.FolderID}/${data.FolderCourse.FolderImg}" class="card-img-top h-70" 
                                                alt="${data.FolderCourse.FolderName}">
                                        </a>
                                        <div class="h-30 card-body">
                                            <div class="d-flex flex-row">
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
    })
})
