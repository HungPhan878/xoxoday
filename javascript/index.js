function main() {
  $(document).ready(function () {
    // Nếu nhấn vào element có class .close sẽ ẩn phần tử cha
    $('.close').click(function () {
      $(this).parent().hide();
    });

    // kiểm tra xem trong vào element có class active hay chưa
    $('li, div').click(function () {
      // Nếu phần tử đang được chọn đã có class .selected thì loại b�� nó
      let parentUl = $(this).closest('ul');
      let parentDiv = $(this).closest('div');

      // Kiểm tra và lấy class của phần tử <ul>
      let ulClass = parentUl.hasClass('js-list');
      let divClass = parentDiv.hasClass('js-list');

      if (ulClass || divClass) {
        let activeLi = parentUl.find('li.active');
        let activeDiv = parentDiv.find('div.active');
        if (activeLi.length) {
          activeLi.removeClass('active');
        } else if (activeDiv.length) {
          activeDiv.removeClass('active');
        }
        $(this).addClass('active');
      }
    });
    // trượt đến đầu trang
    document
      .querySelector('.footer-icon__back-img')
      .addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  });
}

main();
