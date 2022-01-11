const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req,res,next) => {
    try{
        res.status(201).send(await Product.create(req.body))
    } catch(err){
        next(err)
    }
})

router.get('/:productId', async (req,res,next) => {
    try{
        const singleProduct = await Product.findByPk(req.params.productId);
        res.json(singleProduct);
    } catch(err){
        next(err)
    }
})

router.put('/:productId', async (req, res, next) => {
    try{
        const product = await Product.findByPk(req.params.productId);
        res.send(await product.update(req.body));
    } catch(err){
        next(err)
    }
})

router.delete('/:productId', async (req,res,next)=>{
    try{
        const findProduct = await Product.findByPk(req.params.productId);
        if(findProduct){
            await findProduct.destroy()
            res.send(findProduct).sendStatus(204)
        }
        else{
            res.sendStatus(404)
        }
    } catch(err){
        next(err)
    }
})