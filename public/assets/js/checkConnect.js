let background_box_facebook = document.querySelectorAll(
    ".background_box_facebook"
);
let background_box_google = document.querySelectorAll(".background_box_google");
let toggle_box_facebook = document.querySelector(".toggle_box_facebook");
let toggle_box_google = document.querySelector(".toggle_box_google");
let circle_facebook = document.querySelectorAll(".circle");
let checkbox_fb = document.getElementById("checkbox_fb");
let checkbox_google = document.getElementById("checkbox_google");

toggle_box_facebook.onclick = function (e) {
    if (checkbox_fb.checked) {
        const status = alert("Bạn có chắc muốn tắt liên kết?");
        console.log(status);
    } else {
        e.preventDefault();
        window.location.href = "/connect/facebook/redirect";
    }
};

toggle_box_google.onclick = function (e) {
    if (checkbox_google.checked) {
        const status = alert("Bạn có chắc muốn tắt liên kết?");
        console.log(status);
    } else {
        e.preventDefault();
        window.location.href = "/connect/google/redirect";
    }
};
