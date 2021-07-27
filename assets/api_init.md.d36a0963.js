import{o as n,c as s,a}from"./app.3b2c3a90.js";const t='{"title":"Initialization API","description":"","frontmatter":{},"relativePath":"api/init.md","lastUpdated":1627389514805}',o={},e=a('<h1 id="initialization-api"><a class="header-anchor" href="#initialization-api" aria-hidden="true">#</a> Initialization API</h1><p>To initialize the SDK, call the <code>init</code> function passing a configuration object.</p><ul><li><p><strong>Arguments:</strong></p><ul><li><code>config: Config</code></li></ul></li></ul><div class="language-ts"><pre><code><span class="token keyword">interface</span> <span class="token class-name">Config</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Your commercelayer installation URL</span>\n  host<span class="token operator">:</span> <span class="token builtin">string</span>\n\n  <span class="token comment">// Your client id</span>\n  clientId<span class="token operator">:</span> <span class="token builtin">string</span>\n\n  <span class="token comment">// Your client secret. Required only when logging in as an integration</span>\n  clientSecret<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>\n\n  <span class="token comment">// Atuomatically refresh tokens when they expire</span>\n  refreshTokens<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">true</span>\n\n  <span class="token comment">// Number of attempts to refresh a token before failing</span>\n  refreshTokensAttempts<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">=</span> <span class="token number">3</span>\n\n  <span class="token comment">// Function called when refresh token fails</span>\n  onRefreshError<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span>error<span class="token operator">:</span> Error<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span> <span class="token operator">|</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">(</span>error<span class="token operator">:</span> Error<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><ul><li><strong>Example:</strong></li></ul><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> init <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@atoms-studio/commercelayer-sdk&#39;</span>\n\n<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  host<span class="token operator">:</span> <span class="token string">&#39;https://&lt;domain&gt;.commercelayer.io/&#39;</span><span class="token punctuation">,</span>\n  clientId<span class="token operator">:</span> <span class="token string">&#39;9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk&#39;</span><span class="token punctuation">,</span> \n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div>',6);o.render=function(a,t,o,p,r,c){return n(),s("div",null,[e])};export default o;export{t as __pageData};
