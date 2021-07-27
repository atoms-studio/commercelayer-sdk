import{o as n,c as s,a}from"./app.3b2c3a90.js";const t='{"title":"Auth.setMarket","description":"","frontmatter":{},"relativePath":"api/auth/set-market.md","lastUpdated":1627385500174}',p={},e=a('<h1 id="auth-setmarket"><a class="header-anchor" href="#auth-setmarket" aria-hidden="true">#</a> Auth.setMarket</h1><p>Set the market number to use as scope when fetching access tokens.</p><ul><li><p><strong>Arguments:</strong></p><ul><li><code>marketNumber: number | number[]</code></li></ul></li><li><p><strong>Returns:</strong></p><ul><li><code>Promise&lt;void&gt;</code></li></ul></li><li><p><strong>Example:</strong></p></li></ul><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> init<span class="token punctuation">,</span> Auth <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@atoms-studio/commercelayer-sdk&#39;</span>\n\n<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  host<span class="token operator">:</span> <span class="token string">&#39;https://&lt;domain&gt;.commercelayer.io/&#39;</span><span class="token punctuation">,</span>\n  clientId<span class="token operator">:</span> <span class="token string">&#39;9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk&#39;</span><span class="token punctuation">,</span> \n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">await</span> Auth<span class="token punctuation">.</span><span class="token function">setMarket</span><span class="token punctuation">(</span><span class="token number">1234</span><span class="token punctuation">)</span>\n</code></pre></div><p>You can pass multiple market numbers to support inventory fallbacks:</p><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> init<span class="token punctuation">,</span> Auth <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@atoms-studio/commercelayer-sdk&#39;</span>\n\n<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  host<span class="token operator">:</span> <span class="token string">&#39;https://&lt;domain&gt;.commercelayer.io/&#39;</span><span class="token punctuation">,</span>\n  clientId<span class="token operator">:</span> <span class="token string">&#39;9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk&#39;</span><span class="token punctuation">,</span> \n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">await</span> Auth<span class="token punctuation">.</span><span class="token function">setMarket</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1234</span><span class="token punctuation">,</span> <span class="token number">5678</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n</code></pre></div>',6);p.render=function(a,t,p,o,c,u){return n(),s("div",null,[e])};export default p;export{t as __pageData};
