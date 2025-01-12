$p.events.on_calendar_load = function () {
  let map = new Map([
    ['-1', '#FFFFFF'],
    ['1', '#EB6EA0'],
    ['2', '#F0670F'],
    ['3', '#006400'],
    ['4', '#223A70'],
    ['5', '#F8B500'],
    ['6', '#0040D4'],
    ['7', '#A40000'],
    ['11', '#800080'],
    ['14', '#2CA9E1'],
    ['15', '#9CBB1C'],
    ['16', '#646464'],
    ['17', '#8B4513'],
  ]);

  // カレンダーの分類あり/なしのスケジュール要素を指定
  const $elements = $(`#Grid .item.ui-draggable.ui-draggable-handle`).add(
    `#Grid div.item`
  );
  $elements.each((_, elem) => {
    // 色を塗る要素（title要素は背景色を変えないが、フォントの色は変える）
    const $elem = $(elem).add($(elem).find('div.connection'));
    const $title = $(elem).find('div.title');

    // カレンダースケジュールのページID
    const id = $elem[0].attributes[1].nodeValue;

    // ページIDから色を塗る条件（業務区分）を取得
    const res = $p.apiGet({
      id: id,
      data: {
        View: {
          ApiDataType: 'KeyValues',
          GridColumns: [
            'ClassA',
            'ClassB',
            'ClassC',
            'ClassD',
            'ClassE',
            'ClassF',
            'ClassG',
            'ClassH',
          ],
        },
      },
      done: function (ret) {
        const key = ret.Response.Data[0]['業務区分']?.split('：')[0] ?? -1;
        const color = map.get(key);
        if (color != '#FFFFFF') {
          $title.css('color', '#FFFFFF');
        }
        $elem.css('background-color', color);
      },
    });
  });
};
