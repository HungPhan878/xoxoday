function main() {
  $(document).ready(function () {
    // custom function
    function handleActiveToggle(
      selector,
      itemSelector,
      activeClass = 'active',
      callback = null
    ) {
      $(selector).on('click', itemSelector, function (e) {
        e.stopPropagation();
        let parent = $(this).closest('.js-toggle-list');
        if (parent.length) {
          parent
            .find(itemSelector + '.' + activeClass)
            .removeClass(activeClass);
          $(this).addClass(activeClass);
        }

        if (callback) {
          callback($(this), activeClass);
        }
      });
    }

    // Nếu nhấn vào element có class .close sẽ ẩn phần tử cha
    $('.close').click(function () {
      $(this).parent().hide();
    });

    // trượt đến đầu trang
    document
      .querySelector('.footer-icon__back-img')
      .addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

    //handle Toggle explore
    handleActiveToggle(
      '.explore-list__features',
      '.explore-item',
      'active',
      function (item, activeClass) {
        let itemIndex = item.index();
        let tagToggle = $('.explore-img');
        if (tagToggle) {
          tagToggle.removeClass(activeClass);
          let targetTagToggle = tagToggle.eq(itemIndex);
          if (targetTagToggle) {
            targetTagToggle.addClass(activeClass);
          }
        }
      }
    );

    //handle Toggle distribute
    handleActiveToggle(
      '.distribute-list',
      '.distribute-item',
      'active',
      function (item, activeClass) {
        let itemIndex = item.index();
        let tagToggle = $('.distribute-content__wrap');
        if (tagToggle) {
          tagToggle.removeClass(activeClass);
          let targetTagToggle = tagToggle.eq(itemIndex);
          if (targetTagToggle) {
            targetTagToggle.addClass(activeClass);
          }
        }
      }
    );

    // // kiểm tra xem trong vào element có class active hay chưa
    // $('li, div').click(function (event) {
    //   // Ngăn chặn sự kiện không ảnh hưởng đến thẻ cha
    //   event.stopPropagation();

    //   let parentUl = $(this).closest('ul');
    //   let parentDiv = $(this).closest('div');
    //   // Kiểm tra và lấy class của phần tử <ul>
    //   let ulClass = parentUl.hasClass('js-list');
    //   let divClass = parentDiv.hasClass('js-list');

    //   if (ulClass || divClass) {
    //     let activeLi = parentUl.find('li.active');
    //     let activeDiv = parentDiv.find('div.active');
    //     if (activeLi.length) {
    //       activeLi.removeClass('active');
    //     } else if (activeDiv.length) {
    //       activeDiv.removeClass('active');
    //     }
    //     $(this).addClass('active');
    //   }
    //   // slide feedback
    //   const feedbackRow = parentUl.prev('.feedback-row');
    //   if (feedbackRow.length) {
    //     let index = $(this).index();
    //     let newWidth = index * -100;
    //     feedbackRow.css('--width', newWidth + '%');
    //   }

    //   // distribute
    //   const distributeId = $(this).closest('ul').attr('id');
    //   if (distributeId === 'distribute') {
    //     let liIndex = $(this).index();
    //     let article = $('.distribute-content__wrap');
    //     if (article) {
    //       article.removeClass('active');
    //       let targetArticle = article.eq(liIndex);
    //       if (targetArticle) {
    //         targetArticle.addClass('active');
    //       }
    //     }
    //   }
    // });
  });
}

main();
