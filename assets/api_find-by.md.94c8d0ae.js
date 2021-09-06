import{o as n,c as s,a}from"./app.016600e8.js";const t='{"title":"[resource].findBy","description":"","frontmatter":{},"relativePath":"api/find-by.md","lastUpdated":1630920910254}',o={},e=a('<h1 id="resource-findby"><a class="header-anchor" href="#resource-findby" aria-hidden="true">#</a> [resource].findBy</h1><p>Find the first resource that matches a specific query.</p><ul><li><p><strong>Arguments:</strong></p><ul><li><code>query: RequestQuery</code>: Query parameters that define how to search for the resource. <a href="/api/request-query.html">Read more</a></li></ul></li><li><p><strong>Returns:</strong></p><ul><li><code>Promise&lt;ResourceInstance | null&gt;</code>.</li></ul></li><li><p><strong>Example:</strong></p></li></ul><div class="language-ts"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> init<span class="token punctuation">,</span> Auth<span class="token punctuation">,</span> Skus <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@atoms-studio/commercelayer-sdk&#39;</span>\n\n<span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  host<span class="token operator">:</span> <span class="token string">&#39;https://&lt;domain&gt;.commercelayer.io/&#39;</span><span class="token punctuation">,</span>\n  clientId<span class="token operator">:</span> <span class="token string">&#39;9A-ewDDlpDHdeNeJiYDOFFt3g259GMdcVGQg-Jh_SDk&#39;</span><span class="token punctuation">,</span> \n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n<span class="token keyword">await</span> Auth<span class="token punctuation">.</span><span class="token function">setMarket</span><span class="token punctuation">(</span><span class="token number">1234</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> sku <span class="token operator">=</span> <span class="token keyword">await</span> Skus<span class="token punctuation">.</span><span class="token function">findBy</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  filter<span class="token operator">:</span> <span class="token punctuation">{</span>\n    code_eq<span class="token operator">:</span> <span class="token string">&#39;808811825&#39;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sku<span class="token punctuation">)</span>\n<span class="token comment">/*\nPrints:\n{\n  code: &quot;808811825&quot;,\n  created_at: &quot;2020-12-15T15:30:22.378Z&quot;,\n  description: null,\n  do_not_ship: false,\n  do_not_track: false,\n  hs_tariff_number: &quot;61091000&quot;,\n  id: &quot;nkGgSEKLqn&quot;,\n  image_url: null,\n  meta: {\n    mode: &quot;test&quot;, organization_id: &quot;asdasdsad&quot;\n  },\n  metadata: {\n    class: &quot;335&quot;, event: &quot;B6&quot;, colour: &quot;1200&quot;, pro_65: &quot;N&quot;, season: &quot;20193&quot;,\n  },\n  name: &quot;UJCA0LPZ6001200-2-t-shirt-pz600-graphite-l&quot;,\n  pieces_per_pack: null,\n  reference: &quot;&quot;\n  reference_origin: null\n  unit_of_weight: &quot;gr&quot;\n  updated_at: &quot;2021-02-18T12:05:26.205Z&quot;\n  weight: 150\n}\n*/</span>\n</code></pre></div>',4);o.render=function(a,t,o,p,u,c){return n(),s("div",null,[e])};export default o;export{t as __pageData};
