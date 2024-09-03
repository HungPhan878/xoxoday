function main() {
  $(document).ready(function () {
    // Nếu nhấn vào element có class .close sẽ ẩn phần tử cha
    $('.close').click(function () {
      $(this).parent().hide();
    });

    // kiểm tra xem trong vào element có class active hay chưa
    $('li').click(function () {
      // Nếu phần tử đang được chọn đã có class .selected thì loại b�� nó
      let parentUl = $(this).closest('ul');

      // Kiểm tra và lấy class của phần tử <ul>
      let ulClass = parentUl.hasClass('js-list');

      if (ulClass) {
        let activeLi = parentUl.find('li.active');
        if (activeLi.length) {
          activeLi.removeClass('active');
        }
        $(this).addClass('active');
      }
    });
  });
}

main();
