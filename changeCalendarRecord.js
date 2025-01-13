function PaintCalendar() {
  // サイトIDと業務区分のMap
  const sections = new Map();

  // 業務区分と色のMap
  const colors = new Map([
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
  const $elements = $(`#Grid div.item`);

  const ids = [];
  $elements.each((_, elem) => {
    const $elem = $(elem);

    // カレンダースケジュールのページID
    const id = $elem[0].attributes[1].nodeValue;
    if (!ids.includes(id)) {
      ids.push(id);
    }
  });

  for (let i = 0; i < ids.length; i++) {
    $p.apiGet({
      id: ids[i],
      data: {
        View: {
          ApiDataType: 'KeyValues',
          GridColumns: ['ClassD'],
        },
      },
      done: function (ret) {
        const sec = ret.Response.Data[0]['業務区分']?.split('：')[0] ?? '-1';
        sections.set(ids[i], sec);

        if (i == ids.length - 1) {
          $elements.each((_, elem) => {
            // 色を塗る要素（title要素は背景色を変えないが、フォントの色は変える）
            const $elem = $(elem).add($(elem).find('div.connection'));
            const $title = $(elem).find('div.title');
            const id = $elem[0].attributes[1].nodeValue;
            const color = colors.get(sections.get(id));
            if (color != '#FFFFFF') {
              $title.css('color', '#FFFFFF');
            }
            $elem.css('background-color', color);
          });
        }
      },
      fail: function (res) {
        console.log(res);
      },
    });
  }
}
