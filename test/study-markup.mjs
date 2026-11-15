import test from 'node:test';
import assert from 'node:assert/strict';
import {markdown} from '../lib/render.mjs';

test('Study notes preserve highlights and keyboard-native disclosure without event handlers', () => {
  const html = markdown('<mark onclick="alert(1)"><strong>ambition</strong></mark>\n\n<details open ontoggle="alert(1)">\n<summary>查看汉译与音标</summary>\n\n**音标** /æmˈbɪʃən/\n\n**汉译** 志向\n\n</details>');
  assert.match(html, /<mark><strong>ambition<\/strong><\/mark>/);
  assert.match(html, /<details open/);
  assert.match(html, /<summary>查看汉译与音标<\/summary>/);
  assert.match(html, /<strong>汉译<\/strong> 志向/);
  assert.doesNotMatch(html, /onclick|ontoggle|alert/);
});
