new Swiper('.employee-statistics__swiper-content', {

    slidesPerView: 1,
    pagination:{
        el: '.swiper-pagination',
        type:'fraction',
        // clickable: true,
        // dynamicBullets: true,
        // renderFraction: function(index, className) {
        //     return '<span class="'+ className + '">' + (index + 1) + '</span>';
        // } 
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,
    autoplay:{
        delay: 3000,
    }
})

const burgerBars = document.querySelector('.user-profile__burger-bars');
const navigMenuMobile = document.querySelector('.navig-menu-mobile');

const employeeStatistics = document.querySelector('.employee-statistics'); 
const createNews = document.querySelector('.create-news');
const createEvent = document.querySelector('.create-event');

const mainContainerFirstChild = document.querySelector('.main-container__first-child');

const newsListButton = document.querySelectorAll('.news-list__button');
const newsItem = document.querySelector('.list-detailed-news__news-item');

const navigMenuItem = document.querySelectorAll('.navig-menu-mobile__item');

const closeButtonEmployee = document.querySelector('.employee-statistics__button-closing'); 
const returnButtonEmployee = document.querySelector('.employee-statistics__return-button');

let buttonsCloseEmployee = [];
buttonsCloseEmployee.push(closeButtonEmployee, returnButtonEmployee);

const arrSelector = ['employee-statistics_show-mob', 'create-news_show-mob', 'create-event_show-mob'];

const addContestButton = document.querySelector('.employee-statistics__add-contest');
const addNewsButton = document.querySelector('.employee-statistics__add-news');

function returnMainPage() {

    if(event.target.closest('.employee-statistics')){
        const section = event.target.closest('.employee-statistics');
        section.classList.remove('employee-statistics_show-mob');

        buttonsCloseEmployee.forEach(elem => elem.removeEventListener('click', returnMainPage));
    };

    if(event.target.closest('.create-news')){
        const section = event.target.closest('.create-news');
        section.classList.remove('create-news_show-mob');

        const modalCloseButton = section.querySelector('.create-news__button-closing');

        modalCloseButton.removeEventListener('click', returnMainPage);
    }

    if(event.target.closest('.create-event')){
        const section = event.target.closest('.create-event');
        section.classList.remove('create-event_show-mob');

        const modalCloseButton = section.querySelector('.create-event__button-closing');

        modalCloseButton.removeEventListener('click', returnMainPage);
    }
}

const addHandlerCloseWinndow = selector => {
    const modalCloseButton = document.querySelector(selector);
    modalCloseButton.addEventListener('click', returnMainPage);
}

const modalWindow = event => {

    // отображение окна с МТУ
    if(event.target.classList.contains('navig-menu-mobile__employee-statistics')){
        navigMenuMobile.classList.remove('navig-menu-mobile_show');
        employeeStatistics.classList.add('employee-statistics_show-mob');

        buttonsCloseEmployee.forEach(elem => elem.addEventListener('click', returnMainPage));
    }

    // отображение окна создания новости 
    if(event.target.classList.contains('navig-menu-mobile__create-news')){
        navigMenuMobile.classList.remove('navig-menu-mobile_show');
        createNews.classList.add('create-news_show-mob');

        addHandlerCloseWinndow('.create-news__button-closing');
    }

    // отображение окна создания события
    if(event.target.classList.contains('navig-menu-mobile__create-event')){
        navigMenuMobile.classList.remove('navig-menu-mobile_show');
        createEvent.classList.add('create-event_show-mob');

        addHandlerCloseWinndow('.create-event__button-closing')
    }

    // отображение окна создания собютия из мониторинга твоих успехов
    if(event.target.classList.contains('employee-statistics__add-contest')){
        employeeStatistics.classList.remove('employee-statistics_show-mob');
        createEvent.classList.add('create-event_show-mob');

        addHandlerCloseWinndow('.create-event__button-closing')
    }

    // отображение окна создания собютия из мониторинга твоих успехов
    if(event.target.classList.contains('employee-statistics__add-news')){
        employeeStatistics.classList.remove('employee-statistics_show-mob');
        createNews.classList.add('create-news_show-mob');

        addHandlerCloseWinndow('.create-news__button-closing')
    }

}

burgerBars.addEventListener('click', () => {

    const arrSection = [...document.querySelectorAll('.section')];

    let elemUnderMenu = arrSection.find(section => {
        return arrSelector.find(elem => section.classList.contains(elem))
    })

    // Удаление активного окна при открытии выпадающего меню
    if(elemUnderMenu){ 
        let arrSelectors = [...elemUnderMenu.classList]
        arrSelectors.pop();
        elemUnderMenu.className = '';
        arrSelectors.forEach(selector => elemUnderMenu.classList.add(selector))
    };
    
    navigMenuMobile.classList.toggle('navig-menu-mobile_show');

    if(navigMenuMobile.classList.contains('navig-menu-mobile_show')){
        navigMenuItem.forEach(elem => {
            elem.addEventListener('click', modalWindow);
        }) 
    }

})

newsListButton.forEach( elem => {

    elem.addEventListener('click', () => {
        newsItem.classList.toggle('list-detailed-news__news-item_show-mob');

        const returnElement = newsItem.querySelectorAll('.list-detailed-news__return-element');

        const handlerWindowClosing = () => {
            event.target.closest('.list-detailed-news__news-item_show-mob').classList.toggle('list-detailed-news__news-item_show-mob');
            
            returnElement.forEach(button => {
                button.removeEventListener('click', handlerWindowClosing);
            });
        }
        
        returnElement.forEach(button => {
            button.addEventListener('click', handlerWindowClosing);
        });
    })

})

addContestButton.addEventListener('click', modalWindow);
addNewsButton.addEventListener('click', modalWindow);







