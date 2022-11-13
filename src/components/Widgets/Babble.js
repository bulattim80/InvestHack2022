import React from 'react';


function formatDate(date) {
  let diff = new Date() - date; // разница в миллисекундах

  if (diff < 1000) { // меньше 1 секунды
    return 'прямо сейчас';
  }

  let sec = Math.floor(diff / 1000); // преобразовать разницу в секунды

  if (sec < 60) {
    return sec + ' сек. назад';
  }

  let min = Math.floor(diff / 60000); // преобразовать разницу в минуты
  if (min < 60) {
    return min + ' мин. назад';
  }

  // отформатировать дату
  // добавить ведущие нули к единственной цифре дню/месяцу/часам/минутам
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // взять последние 2 цифры из каждой компоненты

  // соединить компоненты в дату
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

function Babble(props, reverse=false, author_name="Пользователь", avatar) {
  let date = formatDate(new Date(props.timestamp))
  if (!reverse) {
    return (
      <div class="a mb-3 pr-0 pl-0 align-items-start">
        <h5>{author_name}</h5>
        <div class="card-body bg-light ">
          <p class="card-text text-dark">{props.text}</p>
        </div>
        <h6> {date}</h6>
      </div>
      );
  } else {
    return (
      <div class="a mb-3 pr-0 pl-0">
        <h5>{author_name}</h5>
        <div class="card-body">
          <p class="card-text">{props.text}</p>
        </div>
        <h6> {date}</h6>
      </div>
      );
  }

}

export default Babble;
