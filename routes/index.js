var express = require('express');
var router = express.Router();
const posthtml = require('posthtml');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bootstrap to Tailwind' });
});

const bsMappings = require('../data/bs-mappings.json');

router.post('/convert', async (req, res) => {
  console.log(req.body);
  const { txtBootstrap } = req.body;
  const result = await posthtml((tree) => {
    const process = node => {

      if (node.attrs && node.attrs.class) {
        const classes = node.attrs.class.split(' ')
        const twClasses = []

        classes.forEach(cls => {
          console.log(cls);
          const newClass = bsMappings.classes[`.${cls}`];
          console.log(newClass);
          if(newClass) {
          twClasses.push(newClass)
          }
        })

        node.attrs.class = twClasses.join(' ')
      }

      return node
    }

    return tree.walk(process)
  })
    .process(txtBootstrap);


  res.send(`<textarea id="txtTailwind">${result.html}</textarea>`);

});

module.exports = router;
