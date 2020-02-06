import express from 'express';

export default new express.Router().get('', (req, res) => {
  res.send({
    connection: true,
    version: '0.01223'
  });
});

