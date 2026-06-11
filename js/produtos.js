document.addEventListener("DOMContentLoaded", function() {
    const linkDropdown = document.querySelector('.linkprincipal');

    linkDropdown.addEventListener('click', function(event) {
        event.preventDefault();
        
        const submenu = this.nextElementSibling;
        
        if (submenu.style.display === "block") {
            submenu.style.display = "none";
        } else {
            submenu.style.display = "block";
        }
    });
});
