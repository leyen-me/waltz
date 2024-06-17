(function (Prism) {
  Prism.languages.vue = Prism.languages.extend("markup", {
    script: {
      pattern: /<script(?=\s|>)(?:\s+setup)?(?:\s+lang=["'](?:js|ts)["'])?>([\s\S]*?)<\/script>/i,
      inside: {
        // Include the language depending on the 'lang' attribute
        "script-punctuation": {
          pattern: /<\/script>/i,
          alias: "punctuation",
        },
        "setup-punctuation": {
          pattern: /\s+setup\b/i,
          alias: "punctuation",
        },
        "lang-punctuation": {
          pattern: /\s+lang=["'](?:js|ts)["']/i,
          alias: "punctuation",
        },
        // Use JavaScript by default, and switch to TypeScript for 'ts' lang attribute
        "javascript": {
          pattern: /(?<!lang=['"]ts["'])\S+/,
          alias: "language-javascript",
          inside: Prism.languages.javascript,
        },
        "typescript": {
          pattern: /(?<=lang=['"]ts["'])\S+/,
          alias: "language-typescript",
          inside: Prism.languages.typescript,
        },
      },
    },
    style: {
      pattern: /<style>([\s\S]*?)<\/style>/i,
      inside: Prism.languages.css,
    },
    // 添加对 Vue 模板语法的支持
    template: {
      pattern: /<template>([\s\S]*?)<\/template>/i,
      inside: {
        // 这里定义 Vue 模板特有的标签或语法的高亮规则
        interpolation: {
          pattern: /{{[\s\S]+?}}/,
          inside: {
            delimiter: {
              pattern: /^\{\{|\}\}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        tag: [
          {
            pattern: /<[^>]+>/,
            inside: {
              attr: {
                pattern:
                  /\b(?:v-)?[a-zA-Z0-9-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>])))?/,
                inside: {
                  "attr-name": /^[a-zA-Z0-9-]+/,
                  punctuation: /=/,
                  punctuation: /^[="']|[="']$/,
                  expression: {
                    pattern: /=\s*[^>"']*/,
                    inside: Prism.languages.javascript,
                  },
                },
              },
              tag: {
                pattern: /<\/?[^>]+>/,
                inside: {
                  punctuation: /^<\/?/,
                  namespace: /^[^>]+:/,
                },
              },
            },
          },
        ],
      },
    },
  });
})(Prism);
