document.addEventListener("DOMContentLoaded", () => {
    const menuItems = document.querySelectorAll(".sidebar ul li");

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            alert(item.textContent.trim() + " Clicked! (Add Page Link)");
        });
    });
});
