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

