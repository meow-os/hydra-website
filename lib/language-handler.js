const Lang = {
    menu: document.querySelector('.language-box'),
    show: function() {
        this.menu.classList.add('show');
    },
    hide: function() {
        this.menu.classList.remove('show');
    }
};