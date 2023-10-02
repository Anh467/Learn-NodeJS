function checkValidInput(e){
    try {
        var frm_signup= document.getElementById("frm-sign-up")
        //check RepeatPassword = Password
        var password= document.getElementsByName("Password")[0]
        var repeatPassword= document.getElementsByName("RepeatPassword")[0]
        //alert("repeatPassword: "+ repeatPassword.value + "\npassword: "+ password.value)
        if (repeatPassword.value !== password.value) throw new Error("mật khẩu không khớp\n" + "repeatPassword: "+ repeatPassword.value + ", password: "+ password.value)
        if (frm_signup)
            frm_signup.submit()
    } catch (error) {
        e.preventDefault()
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

