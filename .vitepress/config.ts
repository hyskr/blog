import { defineConfig } from "vitepress"
import { getPosts, getPostLength, getTags } from "./theme/helpers/serverUtils";

const mathTags = [
  "math", "annotation", "semantics",
  "mtext", "mn", "mo", "mi", "mspace",
  "mover", "munder", "munderover", "msup", "msub", "msubsup",
  "mfrac", "mroot", "msqrt",
  "mtable", "mtr", "mtd", "mlabeledtr",
  "mrow", "menclose",
  "mstyle", "mpadded", "mphantom", "mglyph"
]

async function config() {
  return defineConfig(
    {
      lang: "en-US",
      title: "Heziah's Blog",
      description: " ",
      head: [
        ['meta', { charset: 'utf-8' }],
        ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        ['link', { rel: 'preconnect', href: 'https://hm.baidu.com' }],
        [
          "script",
          {},
          `
            var _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?c10b509d909d2b6d8a44a468b8815687";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
            })();
            `
        ],
        [
          "meta",
          {
            name: "author",
            content: "Heziah",
          },
        ],
        [
          "meta",
          {
            property: "og:title",
            content: "个人学习小站",
          },
        ],
        [
          "meta",
          {
            property: "og:description",
            content: "Heziah's Blog",
          },

        ],
        [
          'link',
          {
            rel: 'stylesheet', href: 'https://unpkg.com/katex@0.15.3/dist/katex.min.css',
          }
        ],
      ],
      themeConfig: {
        logo: "/blog_logo.png",
        docsDir: "/",
        author: "Heziah",
        lastUpdated: true,
        posts: await getPosts({
          // aiSummary: {
          //     openai_api_token: "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"
          // }
        }),
        pageSize: 10,
        postLength: await getPostLength(),
        tags: await getTags(),
        vanila: {
          enable: false,
          config: {
            el: '',
            appId: '',
            appKey: '',
            placeholder: '',
            avatar: '',
            visitor: true,
          }
        },
        nav: [
          {
            text: "Home",
            link: "/",
            icon: "home",
          },
          {
            text: "Tags",
            link: "/tags",
            icon: "tag",
          },
          {
            text: 'More',
            icon: "menu",
            items: [
              {
                text: "Cloud",
                link: "https://cloud.heziah.top/",
                icon: "cloud",
              },
              {
                text: "Notion",
                link: "https://heziah.notion.site/",
                icon: "pencil-alt",
              },{
                text: "Cnblogs",
                link: "https://www.cnblogs.com/hellohhy/",
                icon: "document-text",
              }
            ]
          },
        ] as any,
        socials: [
          {
            name: 'Github',
            link: 'https://github.com/hyskr',
          }
        ],
      } as any,
      markdown: {
        lineNumbers: true,
        headers: true,
        config: (md) => {
          md.use(require('./theme/helpers/markdown-it-katex.ts'), { strict: false });
        },
      },
      vue: {
        template: {
          compilerOptions: {
            isCustomElement: tag => mathTags.includes(tag)
          }
        }
      },
      srcExclude: ['README.md'],
    }
  )
}
export default config()