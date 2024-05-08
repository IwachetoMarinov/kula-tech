export const stickyHeader = () => {
    const header = document.getElementById("headerSticky");
    
    if (header !== null && typeof window !== 'undefined') {
        const sticky = header.offsetTop;
        
        if (window.pageYOffset > sticky) {
            header.classList.add('header--sticky');
        } else {
            header.classList.remove('header--sticky');
        }
    }
};