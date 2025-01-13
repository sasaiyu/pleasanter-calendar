function deleteCalendarClass() {
  const options = $('#CalendarGroupBy > option');
  const excludeValues = ['管理者', '担当者', '作成者', '更新者'];

  options.each((index, opt) => {
    const text = $(opt).text();
    if (excludeValues.includes(text)) {
      $(opt).remove();
    }
  });
}
