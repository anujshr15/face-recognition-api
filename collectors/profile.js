const profileHandler=(req,res,db)=> {
	const {id}=req.params;
	db.select('*').from('users').where({id:id}).then(user=>{
		if(user.length){
			res.json(user[0]);
		}
		else{
			res.json('user not found');
		}

	}).catch(err=>res.status(400).json('some error occured'))
}

module.exports={
	profileHandler:profileHandler
}