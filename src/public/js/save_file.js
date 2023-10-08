
async function AddNewFolderCourses(event, CustomerID){
    // get button position
    var input = event.target
    //get form 
    var form= input.closest('div[name="form"]')
    //get component
    var FolderImage = form.querySelector('input[name="FolderImage"]')
    var FolderName = form.querySelector('input[name="FolderName"]')
    var privacry = form.querySelector('select[name="privacry"]')
    var Description= form.querySelector('textarea[name="Description"]')
    // from data to send to server
    var formData= new FormData();
    formData.append('FolderImage', FolderImage.files[0])
    formData.append('FolderName', FolderName.value)
    formData.append('privacry', privacry.value)
    formData.append('Description', Description.value)
    // sending by using ajax
    $.ajax({
        url: `/foldercourse/${CustomerID}`,
        type: "POST",
        processData: false,
        contentType: false,
        /*
        headers: {
            'Content-Type': 'application/json',
        },
        */
        data: formData,
        /*
        JSON.stringify(
                {
                'FolderImage': FolderImage,
                'FolderName': FolderName.value,
                'privacry': privacry.value,
                'Description': Description.value,
            }
        ),
        */
        success: function (data) {
            document.getElementById("message").innerHTML= data.message
        },
        error: function (xhr) {
            console.log("Có lỗi xảy ra");
        }
    });
}