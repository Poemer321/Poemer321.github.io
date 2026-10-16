import { marked } from 'marked';
import sanitize from 'sanitize-html';
export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const safeURL = value => /^(https?:\/\/|\/(?!\/))[^\s"'()<>\\]*$/i.test(String(value || '')) ? value : '';
export function markdown(source) {
  let n = 0;
  return sanitize(marked.parse(source || '', { gfm: true }), {
    allowedTags: sanitize.defaults.allowedTags.concat(['img', 'del', 'input']),
    allowedAttributes: { ...sanitize.defaults.allowedAttributes, code: ['class'], img: ['src', 'alt', 'title', 'loading'], input: ['type','checked','disabled'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
    transformTags: {img: (tag, attrs) => ({tagName: 'img', attribs: {...attrs, loading:'lazy'}}), input: () => ({tagName:'input',attribs:{type:'checkbox',disabled:'disabled'}})}
  }).replace(/<h([1-6])>/g, (_, level) => `<h${level} id="section-${++n}">`);
}
export function validatePost(post, filename) {
  if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(post.slug || '') || post.slug !== filename) throw new Error('文章文件名与 slug 必须一致，且仅允许英文小写、数字、短横线');
  if (!post.title?.trim() || typeof post.body !== 'string') throw new Error('文章缺少标题或正文');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date || '') || Number.isNaN(Date.parse(post.date))) throw new Error('文章日期无效');
  if (new Date(post.date).toISOString().slice(0,10) !== post.date) throw new Error('文章日期不存在');
  if (!Array.isArray(post.tags) || post.tags.some(t => typeof t !== 'string')) throw new Error('文章 tags 必须是字符串数组');
  return post;
}
