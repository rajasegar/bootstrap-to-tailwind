var express = require('express');
var router = express.Router();
const posthtml = require('posthtml');
const pug = require('pug');

/* GET home page. */
router.get('/', function (req, res, next) {
  const code = `<button type="button" class="inline-block font-normal leading-normal  text-center no-underline align-middle cursor-pointer   select-none bg-transparent  px-3 py-1.5 text-base rounded text-white bg-blue-600 border-blue-500 hover:bg-blue-700">Primary Button</button>`;
  res.render('index', { title: 'Bootstrap to Tailwind', code });
});

const bsMappings = require('../data/bs-mappings.json');

router.post('/convert', async (req, res) => {
  console.log(req.body);
  const { txtBootstrap } = req.body;
  const result = await posthtml((tree) => {
    const process = (node) => {
      if (node.attrs && node.attrs.class) {
        const classes = node.attrs.class.split(' ');
        const twClasses = [];

        classes.forEach((cls) => {
          console.log(cls);
          const newClass = bsMappings.classes[`.${cls}`];
          console.log(newClass);
          if (newClass) {
            twClasses.push(newClass);
          }
        });

        node.attrs.class = twClasses.join(' ');
      }

      return node;
    };

    return tree.walk(process);
  }).process(txtBootstrap);

  const template = pug.compileFile('views/_txtTailwind.pug');
  const canvas = pug.compileFile('views/_canvas.pug');
  console.log(canvas({ code: result.html }));
  const markup =
    canvas({ code: result.html }) + template({ code: result.html });
  res.send(markup);
});

module.exports = router;
