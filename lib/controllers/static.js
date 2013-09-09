/*
 * GET /
 */

exports.index = function(req, res) {
  var rand = Math.round( Math.random() )
    , bg   = 'girl';
  if (0 === rand) bg = 'boy';
  res.render('static/index', {
    backgroundClass: bg
  });
};
