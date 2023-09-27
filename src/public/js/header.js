document.getElementById("btnActionLogout").addEventListener("click",(e)=>{
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
        document.getElementById("frmActionLogout").submit();
    }
})