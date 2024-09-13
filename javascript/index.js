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

        // change width of border
        if (itemSelector === '.solution-item') {
          const separates = $('.solution-item__separate');
          if (separates.length > 0) {
            const separate = separates.eq($(this).index());
            separate.css('width', '0%');
          }
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
      // let startTime;
      // let remainingTime = timeout;
      let autoChangeInterval;

      function autoChangeActive() {
        console.log('auto change active');
        items.removeClass(activeClass);
        items.eq(currentIndex).addClass(activeClass);

        if (callback) {
          callback(items.eq(currentIndex), activeClass);
        }

        // change width of border
        if (itemSelector === '.solution-item') {
          const separates = $('.solution-item__separate');
          if (separates.length > 0) {
            const separate = separates.eq(currentIndex);
            separate.css('width', '0%');
            // startTime = Date.now(); // Bắt đầu đếm thời gian
            separate.animate({ width: '100%' }, timeout);
          }
        }

        // set currentIndex
        currentIndex = (currentIndex + 1) % items.length;
        // remainingTime = timeout; // Reset lại thời gian cho lần tiếp theo
      }
      // call f autoChangeActive immediately
      autoChangeActive();

      function startAutoChangeInterval(time) {
        autoChangeInterval = setInterval(autoChangeActive, time);
      }

      startAutoChangeInterval(timeout);

      // handle hover to pause and resume autoChangeActive
      // items.on('mouseenter', function () {
      //   clearInterval(autoChangeInterval);
      //   const separate = $(this).find('.solution-item__separate');
      //   if (separate.length > 0) {
      //     let elapsedTime = Date.now() - startTime; // Tính thời gian đã chạy
      //     remainingTime -= elapsedTime; // Dừng animate tại thời điểm hiện tại
      //     separate.stop(true);
      //   }
      // });

      // items.on('mouseleave', function () {
      //   const separate = $(this).find('.solution-item__separate');
      //   if (separate.length > 0 && remainingTime > 0) {
      //     startTime = Date.now(); // Reset thời gian bắt đầu
      //     separate.animate({ width: '100%' }, remainingTime, 'linear'); // Tiếp tục animate với thời gian còn lại
      //   }
      //   // Tiếp tục autoChange sau khi hết hover
      //   startAutoChangeInterval(remainingTime);
      // });

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
      10000,
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
            10000,
            function (item, activeClass) {
              toggleActiveClass(item, activeClass, tagToggle);
            }
          );
        }, 0);
        if (tagToggle) {
          toggleActiveClass(item, activeClass, '.solution-img');
        }
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
