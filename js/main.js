// スクロールに応じてjs-activeクラスのつけ外し
$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('.header').addClass('js-active');
    } else {
        $('.header').removeClass('js-active');
    }
});

// 交差監視API
function callback(entries, obs) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('js-appear');
            obs.unobserve(entry.target);
        }
    });
}

const options = {
    threshold: 0.2,
}

const observer = new IntersectionObserver(callback, options);

document.querySelectorAll('.js-animate').forEach(el => {
    observer.observe(el);
});

// タブ切り換え
$('.trainer__list').not('#tab1').hide();

$('.trainer__tab').on('click', function (e) {
    e.preventDefault();

    if ($(this).hasClass('current')) {
        return;
    }

    const targetId = $(this).find('a').attr('href').substring(1);

    $('.trainer__list').hide().filter(`#${targetId}`).show();

    // タブ内の全てのアイテムにアニメーションを強制追加
    $(`#${targetId} .trainer__item`).each(function () {
        $(this).addClass('fadeUp');
    });

    $('.trainer__tab.js-current').removeClass('js-current');
    $(this).addClass('js-current');
});

// Swiperの初期化
const swiper = new Swiper('.swiper', {
    loop: true,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
    },
});

// アコーディオン
$('.faq__question').on('click', function () {
    $(this).toggleClass('js-open');
    $(this).next('dd').slideToggle();
});

// トップへ
const toTop = $('.to-top');
$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        toTop.stop(true, true).fadeIn();
    } else {
        toTop.stop(true, true).fadeOut();
    }
});
toTop.on('click', function (e) {
    e.preventDefault(); 
    $('html, body').animate({
        scrollTop: 0,
    }, 300);
    return false;
});