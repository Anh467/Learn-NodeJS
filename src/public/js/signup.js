function checkValidInput(e){
    e.preventDefault()
    var frm_signup= document.getElementById("frm-sign-up")
    try {
        //check RepeatPassword = Password
        var password= document.getElementsByName("Password")
        var repeatPassword= document.getElementsByName("RepeatPassword")
        if (repeatPassword.val !== password.val) throw new Error("mật khẩu không khớp\n")
        if (frm_signup)
            frm_signup.submit()
    } catch (error) {
        alert("error \n"+ error.message)
    }
}


function showAlert() {
    var myInput= $('.my-input')
    var input= myInput.find('input')
    alert('Please enter: '+ input.val());
}
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

