document.getElementById("btnActionLogout").addEventListener("click",(e)=>{
    e.preventDefault()
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        document.getElementById("frmActionLogout").submit();
    }
})