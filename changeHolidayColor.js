function changeHolidayColor() {
  const holidayBackgroundColor = 'rgba(255, 192, 203, 1.0)';
  const calendarType = $('#CalendarType').val();

  $p.apiGet({
    id: 14215105,
    done: function (res) {
      const body = res.Response.Data[0].Body;
      const holidays = body
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => line.split(','))
        .map(([date, name]) => ({
          date,
          name,
        }));
      switch (calendarType) {
        case 'Standard':
          $(document).ready(function () {
            $('#Grid td').each(function () {
              var dataId = $(this).data('id');
              const dayOfWeek = new Date(dataId).getDay();
              switch (dayOfWeek) {
                case 0:
                  $(`td[data-id=\"${dataId}\"]`).addClass('sunday');
                  break;
                case 6:
                  $(`td[data-id=\"${dataId}\"]`).addClass('saturday');
                  break;
                default:
                  break;
              }
            });
          });
          holidays.forEach((holiday) => {
            let dateId = new Date(holiday.date).toLocaleDateString();
            $(`#Grid td[data-id=\"${dateId}\"]`).css(
              'background-color',
              holidayBackgroundColor
            );
            const $day = $(`#Grid td[data-id=\"${dateId}\"] .day`);

            // この方法だと標準カレンダーで分類指定されると文字が6つ重なってしまう？pleasanterのバグ？
            //  const text = $day.text();
            // $day.text(`${text} (${holiday.name})`);

            const d = holiday.date.split('-')[2].replace(/^0+/, '');
            $day.text(`${d} (${holiday.name})`);
          });
          break;
        case 'FullCalendar':
          holidays.forEach((holiday) => {
            $(`td[data-date=\"${holiday.date}\"]`).css(
              'background',
              holidayBackgroundColor
            );
            const $day = $(
              `td[data-date=\"${holiday.date}\"] .fc-daygrid-day-number`
            );
            const text = $day.text();
            $day.text(`${text} (${holiday.name})`);
          });
          break;
        default:
          break;
      }
    },
    fail: function (res) {
      console.log(res);
    },
  });
}
