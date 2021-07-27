import{o as n,c as s,a}from"./app.3b2c3a90.js";const t='{"title":"Auth.getToken","description":"","frontmatter":{},"relativePath":"api/auth/get-token.md","lastUpdated":1627386512109}',e={},p=a('<h1 id="auth-gettoken"><a class="header-anchor" href="#auth-gettoken" aria-hidden="true">#</a> Auth.getToken</h1><p>Get the currently active guest token and expiration time.</p><ul><li><p><strong>Returns:</strong></p><ul><li><code>tokenInfo: { token: string, expires: number }</code>.</li></ul></li><li><p><strong>Example:</strong></p></li></ul><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> init<span class="token punctuation">,</span> Auth <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@atoms-studio/commercelayer-sdk&#39;</span>\n\n<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  host<span class="token operator">:</span> <span class="token string">&#39;https://&lt;domain&gt;.commercelayer.io/&#39;</span><span class="token punctuation">,</span>\n  clientId<span class="token operator">:</span> <span class="token string">&#39;9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk&#39;</span><span class="token punctuation">,</span> \n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">await</span> Auth<span class="token punctuation">.</span><span class="token function">setMarket</span><span class="token punctuation">(</span><span class="token number">1234</span><span class="token punctuation">)</span>\n<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Auth<span class="token punctuation">.</span><span class="token function">getToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n<span class="token comment">/*\nPrints:\n{\n  token: &#39;eyJhbGciOiJIUzUxMiJ9.eyJ....&#39;,\n  expires: 1627373587\n}\n*/</span>\n</code></pre></div>',4);e.render=function(a,t,e,o,c,i){return n(),s("div",null,[p])};export default e;export{t as __pageData};
