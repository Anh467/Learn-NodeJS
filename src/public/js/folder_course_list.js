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

function AddNewFolderCourses(event, CustomerID){
    // get button position
    alert("Please")
    var input = event.target
    //get form 
    var form= input.closest('form')
    //get component
    var FolderImage = form.querySelector('input[name="FolderImage"]')
    var FolderName = form.querySelector('input[name="FolderName"]')
    var privacry = form.querySelector('select[name="privacry"]')
    var Description= form.querySelector('textarea[name="Description"]')
    // from data to send to server
    var formData= new FormData();
    formData.append('FolderImage', FolderImage.value)
    formData.append('FolderName', FolderName.value)
    formData.append('privacry', privacry.value)
    formData.append('Description', Description.value)
    // sending by using ajax
    $.ajax({
        url: `/foldercourse/${CustomerID}`,
        type: "POST",
        processData: false,
        contentType: false,
        data: {
            'FolderImage': FolderImage.value,
            'FolderName': FolderName.value,
            'privacry': privacry.value,
            'Description': Description.value,
        },
        success: function (data) {
            if (data === "null")
                alert("!!!Somthing wrong happen!!!");
            else {
                location.reload();
            }
        },
        error: function (xhr) {
            console.log("Có lỗi xảy ra");
        }
    });
}
