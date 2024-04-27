const Lang = (function() {
    const lang = document.querySelector('.language-box');

    return {
        show: function() {
            lang.classList.add('show');
        },
        hide: function() {
            lang.classList.remove('show');
        }
    };
})();