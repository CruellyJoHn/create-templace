const DEFAULT_TPL_PATH = './template';

const DEFAULT_CONFIG = {
  tplOpt: {
    author: 'author',
    date: 'yyyy-mm-dd',
  },
  tplPath: DEFAULT_TPL_PATH,
};

let getClassName = () => {
  return 'test';
};

let getAuthor = (opt = {}) => {
  return opt?.author || DEFAULT_CONFIG.tplOpt.author;
};

let getTime = (opt = {}) => {
  let date = opt?.data || DEFAULT_CONFIG.tplOpt.date;
  return date;
};

const REPLACE_MAP = {
  'class-name': getClassName,
  'tpl-author': getAuthor,
  'tpl-create-time': getTime,
};
module.exports = { DEFAULT_TPL_PATH, DEFAULT_CONFIG, REPLACE_MAP };
