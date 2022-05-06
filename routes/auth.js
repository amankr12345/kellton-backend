const router=require('express').Router()
const Controller=require('../controller/get_controller')
const verify=require('./authVerify')

router.post('/signUp',Controller.signUp)

router.post('/signIn',Controller.signIn)
router.get('/',Controller.showIndex)
router.get('/getAll',verify,Controller.getallUsers)

router.get('/show',Controller.showProducts)
router.post('/add-products',Controller.addProducts)


module.exports=router