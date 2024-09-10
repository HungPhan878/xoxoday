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

    // common function
    function toggleActiveClass(item, activeClass, tagToggleSelector) {
      let itemIndex = item.index();
      let tagToggle = $(tagToggleSelector);
      if (tagToggle) {
        tagToggle.removeClass(activeClass);
        let tagToggleTarget = tagToggle.eq(itemIndex);
        if (tagToggleTarget) {
          tagToggleTarget.addClass(activeClass);
        }
      }
    }

    // function auto active
    function autoActive(
      selector,
      itemSelector,
      activeClass = 'active',
      index,
      timeout,
      callback = null
    ) {
      console.log('auto active');
      let currentIndex = index;
      let items = $(selector).find(itemSelector);

      function autoChangeActive() {
        items.removeClass(activeClass);
        items.eq(currentIndex).addClass(activeClass);

        if (callback) {
          callback(items.eq(currentIndex), activeClass);
        }
        currentIndex = (currentIndex + 1) % items.length;
      }
      let autoChangeInterval = setInterval(autoChangeActive, timeout);

      return {
        stop: function () {
          clearInterval(autoChangeInterval);
        },
        getCurrentIndex: function () {
          return currentIndex;
        },
      };
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

    //handle Toggle solution
    let handelAutoChange = autoActive(
      '.solution-list',
      '.solution-item',
      'active',
      0,
      3000,
      function (item, activeClass) {
        toggleActiveClass(item, activeClass, '.solution-img');
      }
    );

    handleActiveToggle(
      '.solution-list',
      '.solution-item',
      'active',
      function (item, activeClass) {
        let itemIndex = item.index();
        let tagToggle = $('.solution-img');

        handelAutoChange.stop();

        setTimeout(function () {
          // Phải gán lại như thế này không sẽ tạo ra nhiều setInterval nha.
          handelAutoChange = autoActive(
            '.solution-list',
            '.solution-item',
            'active',
            itemIndex,
            3000,
            function (item, activeClass) {
              toggleActiveClass(item, activeClass, tagToggle);
            }
          );
        }, 0);
        if (tagToggle) {
          toggleActiveClass(item, activeClass, '.solution-img');
          // phần animate thì chỉ là ui thôi set time out = time ỉnterval là được
        }
        // if (tagToggle) {
        //   tagToggle.removeClass(activeClass);
        //   let tagToggleTarget = tagToggle.eq(itemIndex);
        //   let tagWidthChange = $('.solution-item__separate');
        //   let animatedWidthChange;
        //   console.log(itemIndex);

        // if (tagWidthChange.length > 0) {
        //   let tagWidthChangeTarget = tagWidthChange.eq(itemIndex);
        //   if (tagWidthChangeTarget) {
        //     console.log('Starting animation...');
        //     // tagWidthChangeTarget.animate({ width: '100%' }, 10000);
        //     function startAnimation() {
        //       animatedWidthChange = tagWidthChangeTarget.animate(
        //         { width: '100%' },
        //         10000
        //       );
        //     }
        //     startAnimation();

        //     tagWidthChangeTarget.hover(
        //       function () {
        //         animatedWidthChange.stop();
        //       },
        //       function () {
        //         startAnimation();
        //       }
        //     );

        //     startAnimation();
        //   }
        // }
      }
    );

    //handle Toggle possibility
    handleActiveToggle(
      '.possibilities-content__top',
      '.possibilities-tab',
      'active',
      function (item, activeClass) {
        let itemIndex = item.index();
        let tagToggle = $('.possibilities-item');
        if (tagToggle) {
          tagToggle.removeClass(activeClass);
          let tagToggleTarget = tagToggle.eq(itemIndex);
          if (tagToggleTarget) {
            tagToggleTarget.addClass(activeClass);
          }
        }
      }
    );

    //handle Toggle feedback
    handleActiveToggle(
      '.feedback-icons',
      '.feedback-icon',
      'active',
      function (item) {
        //slide feedback
        const feedbackCol = $('.feedback-col');
        if (feedbackCol.length) {
          let feedbackParent = feedbackCol.closest('.feedback-row');
          let index = item.index();
          let newWidth = index * -100;
          feedbackParent.css('--width', newWidth + '%');
        }
      }
    );
  });
}

main();
