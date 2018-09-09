const Clarifai= require('clarifai');
const app = new Clarifai.App({
 apiKey: 'c002c48de4ea4567a4a757e7f49698fb'
});
const handleAPICall=(req,res)=>{app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=> res.json(data))
	.catch(err=>res.status(400).json("unable to work with API"));}

const imageHandler= (req,res,db)=>{
	const {id}=req.body;
	db('users').where('id' , '=', id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => res.json(entries[0]))
	.catch(err=> res.status(400).json('unable to get entries'));
}

module.exports={
	imageHandler:imageHandler,
	handleAPICall:handleAPICall
}