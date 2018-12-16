const SegmentDao = require('../models/segmentDao');

exports.get = (req, res) => {
  new SegmentDao(req.connection)
    .list()
    .then(segments => res.status(200).json(segments.rows))
    .catch(segments => res.status(500).json(segments.rows));
};
