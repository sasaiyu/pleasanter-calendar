# pleasanter-calendar

[Pleasanter](https://pleasanter.org/)の[カレンダー](https://pleasanter.org/ja/manual/table-management-calendar)表示時にスケジュール（レコード）の背景色を変更するスクリプト。

## TL;DR

[カレンダーのイベントスクリプト](https://pleasanter.org/ja/manual/script-events-on-calendar-load)に`script.js`の内容を追加すれば利用できる。

#### 背景色を変更する条件

1. スケジュールに分類 A ～ H のいずれかを[追加](https://pleasanter.org/ja/manual/basic-operations-editor)し、表示名を「業務区分」に変更する。
1. 業務区分の選択肢は、先頭に**数字：** をつける。数字の先頭に 0 はつけず、コロンは全角であること。
1. 業務区分の数字に合わせてスケジュールの色が変更される。

#### スクリプトの修正

- 色を追加したり、別の色を変更したい場合、`script.js`の`map`に要素を追加するか、[HEX値](https://www.colordic.org/)を変更すること。

```javascript
  let map = new Map([
    ['1', '#EB6EA0'],
    （中略）
    ['17', '#8B4513'],
    ['99', '#ff0000'], # 99に赤色を追加
  ]);
```

- 色を変更する条件を分類以外にしたい場合は、`script.js`の 32 行目 `GridColumns`に要素を変更すること。例えば、分類 I の選択肢で変更したい場合は'ClassI'を追加すればよい。
- 表示区分を「業務区分」以外にしたい場合は、`script.js`の 45 行目の値を変更すること。
