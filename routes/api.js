var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Post = mongoose.model('Post');
var Bride = mongoose.model('Bride');
var Payment = mongoose.model('Payment');
var Size = mongoose.model('Size');
var Dress = mongoose.model('Dress');
var Stage = mongoose.model('Stage');

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('#/login');
};

//Register the authentication middleware
// router.use('/posts', isAuthenticated);
router.route('/posts')
	//creates a new post
	.post(function(req, res){
		var post = new Post();
		post.text = req.body.text;
		post.created_by = req.body.created_by;
		post.save(function(err, post) {
			if (err){
				return res.send(500, err);
			}
			return res.json(post);
		});
	})
	//gets all posts
	.get(function(req, res){
		Post.find(function(err, data){
			if(err){
				return res.send(500, err);
			}
			return res.send(200,data);
		});
	});

//post-specific commands. likely won't be used
router.route('/posts/:id')
	//gets specified post
	.get(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);
			res.json(post);
		});
	}) 
	//updates specified post
	.put(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);

			post.username = req.body.created_by;
			post.text = req.body.text;

			post.save(function(err, post){
				if(err)
					res.send(err);

				res.json(post);
			});
		});
	})
	.delete(function(req, res) {
		Post.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
			 return	res.send(err);
		 return	res.json("deleted :(");
		});
	});

//-------------------------------------------brides -------------------------------------------------------------------
// router.use('/brides', isAuthenticated);
router.route('/brides')
	//creates a new bride
	.post(function(req, res){
		var bride = new Bride();
		//all var in bride
				bride.created_at = req.body.created_at;
				bride.b_id = req.body.b_id;
				bride.first_name = req.body.first_name;
				bride.last_name = req.body.last_name;
				bride.email = req.body.email;
				bride.phone1 = req.body.phone1;
				bride.phone2 = req.body.phone2;
				bride.adress = req.body.adress;
				bride.date_event = req.body.date_event;
				bride.day_service = req.body.day_service;
			 	bride.price = req.body.price;
				bride.remark = req.body.remark;
				bride.status = req.body.status;
		bride.save(function(err,bride) {
			if (err){
				return res.send(500,err);
			}
			return res.json(bride);
		});

	})
	//gets all brides
	.get(function(req, res){
	Bride.find(function(err, data){
			if(err){
				return res.send(500, err);
			}
			return res.send(200,data);
		});
	});
	router.route('/brideOne/:id')
	//gets specified bride
	.get(function(req, res){
		Bride.findById(req.params.id, function(err, bride){
			if(err)
				return res.send(err);
			return res.json(bride);
		});
	}) 
	router.route('/brideByDate/:startDate/:endDate')
	//gets all bride by date
	.get(function(req,res){
		Bride.find({"date_event":{"$gte" :new Date(req.params.startDate) ,"$lte" :new Date(req.params.endDate)}	},
		 function(err, docs){
			if(err){
			  res.send(500,err);
			}
			console.log(docs);
			 res.send(200,docs);
		});
	});


	router.route('/brides/:id')
	//gets specified bride
	.get(function(req, res){
		Bride.findById({_id:req.params.id}).populate("payments").exec(function(err,data) {
			res.json(data);
			}, function(err) {
				res.json(err);
			});
	})

		//deletes the bride	and all suns
	.delete(function(req, res) {
		Bride.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
			 return	res.send(err);
		return res.json("deleted :(");
		});
	});

router.route('/payments/:bride_id/:payment_id')
    .put(function(req , res){
        Bride.findOneAndUpdate({ _id: req.params.bride_id} , {$push: {payments: req.params.payment_id }}, function(err, updatedBride){
            if(err) {
               return	res.send(err);
            }else{
                return res.json(updatedBride);
            }
        });
        
    })
	.delete(function(req , res){
        Bride.findOneAndUpdate({ _id: req.params.bride_id} , {$pull: {payments: req.params.payment_id }}, function(err, deldBride){
            if(err) {
               return	res.send(err);
            }else{
                return res.json("deleted :(");
            }
        });
        
	});



router.route('/bridesizes/:id')
	//gets specified bride with size
	.get(function(req, res){
		Bride.findById({_id:req.params.id}).populate("sizes").exec(function(err,data) {
			res.json(data);
			}, function(err) {
				res.json(data);
			});
	})
		//deletes the bride	
	.delete(function(req, res) {
		Bride.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
			 return	res.send(err);
		return res.json("deleted :(");
		});
	});
router.route('/bride/update')
	//updates specified bride
	.put(function(req, res){
		Bride.findOneAndUpdate( {_id:req.body.id} , req.body.updatedObj , function(err, doc){
			if (err) return res.send(500, { error: err });
			return res.send("succesfully saved");
		});
	})
router.route('/payments')
	//creates a new payment
	.post(function(req, res){
		var payment = new Payment();
	//	payment.bride = req.body.bride;
	//payment.total_price = req.body.total_price;
		payment.pay = req.body.pay;
		payment.date_pay= req.body.date_pay;
		payment.done = req.body.done;
		payment.save(function(err, payment) {
			if (err){
				return res.send(500, err);
			}
			return res.json(payment);
		});
	});

		// Size ---------------------------------
router.route('/payments/update')
	//updates specified payments
	.put(function(req, res){
		Payment.findOneAndUpdate( {_id:req.body.id} , req.body.updatedObj , function(err, doc){
			if (err) return res.send(500, { error: err });
			return res.send("succesfully saved");
		});
	});



	// Size ---------------------------------
router.route('/sizes/update')
	//updates specified bride
	.put(function(req, res){
		Size.findOneAndUpdate( {_id:req.body.id} , req.body.updatedObj , function(err, doc){
			if (err) return res.send(500, { error: err });
			return res.send("succesfully saved");
		});
	});
router.route('/sizes')
	//creates a new size
	.post(function(req, res){
		var size = new Size();
		//all var in size
				size.last_update =req.body.last_update;
				size.chest = req.body.chest;
				size.waist = req.body.waist;
				size.hips = req.body.hips;
				size.upChest = req.body.upChest;
				size.downChest = req.body.downChest;
				size.breast_seam = req.body.breast_seam;
				size.stitch_back = req.body.stitch_back;
				size.front_width = req.body.front_width;
				size.back_width = req.body.back_width;
				size.chest_weidh = req.body.chest_weidh;
				size.hip_lenght = req.body.hip_lenght;
				size.side_lenght = req.body.side_lenght;
				size.shoulder = req.body.shoulder;
			 	size.sleeve_length = req.body.sleeve_length;
				size.dress_lenght = req.body.dress_lenght;
				size.top_lenght = req.body.top_lenght;

		size.save(function(err,size) {
			if (err){
				return res.send(500,err);
			}
			return res.json(size);
		});

	});
	
	router.route('/sizes/:bride_id/:size_id')
    .put(function(req , res){
        Bride.findOneAndUpdate({ _id: req.params.bride_id} , {$push: {sizes: req.params.size_id }}, function(err, updatedSize){
            if(err) {
               return	res.send(err);
            }else{
                return res.json(updatedSize);
            }
        });
        
    })
	.delete(function(req , res){
        Bride.findOneAndUpdate({ _id: req.params.bride_id} , {$pull: {sizes: req.params.size_id }}, function(err, delSize){
            if(err) {
               return	res.send(err);
            }else{
                return res.json("deleted :(");
            }
        });
        
	});

	// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	//post-specific commands. likely won't be used
router.route('/sizes/:id')
	//gets specified post
	.get(function(req, res){
		Size.findById(req.params.id, function(err, size){
			if(err)
				return res.send(err);
			return res.json(size);
		});
	}) 
	//updates specified size
	.put(function(req, res){
		Size.findById(req.params.id, function(err, size){
			if(err)
				return res.send(err);
			size.last_update =req.body.last_update;
			size.chest = req.body.chest;
			size.waist = req.body.waist;
			size.hips = req.body.hips;
			size.upChest = req.body.upChest;
			size.downChest = req.body.downChest;
			size.breast_seam = req.body.breast_seam;
			size.stitch_back = req.body.stitch_back;
			size.front_width = req.body.front_width;
			size.back_width = req.body.back_width;
			size.chest_weidh = req.body.chest_weidh;
			size.hip_lenght = req.body.hip_lenght;
			size.side_lenght = req.body.side_lenght;
			size.shoulder = req.body.shoulder;
			size.sleeve_length = req.body.sleeve_length;
			size.dress_lenght = req.body.dress_lenght;
			size.top_lenght = req.body.top_lenght;

			size.save(function(err, size){
				if(err)
					return res.send(err);
				return res.json(size);
			});
		});
	})
	//deletes the payment
	.delete(function(req, res) {
		Size.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
			 return	res.send(err);
		 return	res.json("deleted :(");
		});
	});
//post-specific commands. likely won't be used
router.route('/payments/:id')
	//gets specified post
	.get(function(req, res){
		Payment.findById(req.params.id, function(err, payment){
			if(err)
				return res.send(err);
			return res.json(payment);
		});
	}) 
	//updates specified post
	.put(function(req, res){
		Payment.findById(req.params.id, function(err, payment){
			if(err)
				return res.send(err);
		payment.pay = req.body.pay;
		payment.done = req.body.done;

			payment.save(function(err, payment){
				if(err)
					return res.send(err);

				return res.json(payment);
			});
		});
	})
	//deletes the payment
	.delete(function(req, res) {
		Payment.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
			 return	res.send(err);
		 return	res.json("deleted :(");
		});
	});
router.route('/dresses')
	//creates a new dress
	.post(function(req, res){
		var dress = new Dress();
		//all var in dress
			dress.price_dress = req.body.price_dress;
			dress.last_update =req.body.last_update;
			dress.t_dress =req.body.t_dress;
			dress.model = req.body.model;
			dress.color = req.body.color;
			dress.t_cloth = req.body.t_cloth;
			dress.t_lace = req.body.t_lace;
			dress.cleavage_detailes = req.body.cleavage_detailes;
			dress.cleft_place = req.body.cleft_place;
			dress.sleeve = req.body.sleeve;
			dress.another_skirt = req.body.another_skirt;
			dress.remark = req.body.remark;
		dress.save(function(err,dress) {
			if (err){
				return res.send(500,err);
			}
			return res.json(dress);
		});

	});
	router.route('/dresses/update')
	//updates specified dresses
	.put(function(req, res){
		Dress.findOneAndUpdate( {_id:req.body.id} , req.body.updatedObj , function(err, doc){
			if (err) 
			{return res.send(500, { error: err });}
			else
			return res.send({updated:doc.id , message:'success'});			
		});
	});
	router.route('/bridedresses/:id')
	//gets specified bride with dress
	.get(function(req, res){
		Bride.findById({_id:req.params.id}).populate("dresses").exec(function(err,data) {
			res.json(data);
			}, function(err) {
				res.json(data);
			});
	})
		//deletes the Dress	
	.delete(function(req, res) {
		
		Bride.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
			 return	res.send(err);
		return res.json("deleted :(");
		});
	});

router.route('/dresses/:bride_id/:dress_id')
    .put(function(req , res){
        Bride.findOneAndUpdate({ _id: req.params.bride_id} , {$push: {dresses: req.params.dress_id }}, function(err, updatedDress){
            if(err) {
               return	res.send(err);
            }else{
                return res.json(updatedDress);
            }
        });
        
    })
	.delete(function(req , res){
        Bride.findOneAndUpdate({ _id: req.params.bride_id} , {$pull: {dresses: req.params.dress_id }}, function(err, delDress){
            if(err) {
               return	res.send(err);
            }else{
                return res.json("deleted :(");
            }
        });
        
	});
	router.route('/dresses/:id')
	//gets specified dresses
	.get(function(req, res){
		Dress.findById(req.params.id, function(err, dress){
			if(err)
				return res.send(err);
			return res.json(dress);
		});
	}) 
	//delete the dresse
	.delete(function(req, res) {
		Dress.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
			 return	res.send(err);
		 return	res.json("deleted :(");
		});
	});

	router.route('/dressesRemoveAll/:bride_id/:dresses') 
	.delete(function(req , res){
		for(var i=0; i< dresses.length; i++)
        {	
			dress_id = dresses[i];
			Bride.findOneAndUpdate({ _id: req.params.bride_id} , {$pull: {dresses: req.params.dress_id }}, function(err, delDress){
				if(err) {
				return	res.send(err);
			}else{
				Dress.remove({
					_id: req.params.dress_id
				}, function(err) {
					if (err)
					return	res.send(err);
				// return	res.json("deleted :(");
				});
					return res.json("deleted :(");
				}
			});
		}
	});



	// stagessssssassssssssssssssssssssssssssss

router.route('/stages')
	//creates a new stage
	.post(function(req, res){
		var stage = new Stage();
		stage.s = req.body.s;
		stage.last_update = req.body.last_update;
	
		stage.save(function(err, stage) {
			if (err){
				return res.send(500, err);
			}
			return res.json(stage);
		});
	});


router.route('/stages/:bride_id/:stage_id')
    .put(function(req , res){
        Bride.findOneAndUpdate({ _id: req.params.bride_id} , {$push: {stages: req.params.stage_id }}, function(err, updatedBride){
            if(err) {
               return	res.send(err);
            }else{
                return res.json(updatedBride);
            }
        });
        
    })
	.delete(function(req , res){
        Bride.findOneAndUpdate({ _id: req.params.bride_id} , {$pull: {stages: req.params.stage_id }}, function(err, deldBride){
            if(err) {
               return	res.send(err);
            }else{
                return res.json("deleted :(");
            }
        });
        
	});

	router.route('/stages/:id')
	//gets specified Stage
	.get(function(req, res){
		Stage.findById(req.params.id, function(err, stage){
			if(err)
				res.send(err);
			res.json(stage);
		});
	}) 
	//updates specified Stage
	.put(function(req, res){
		Stage.findById(req.params.id, function(err, stage){
			if(err)
				res.send(err);

			stage.username = req.body.s;
			stage.text = req.body.last_update;

			Stage.save(function(err, stage){
				if(err)
					res.send(err);

				res.json(stage);
			});
		});
	})
	.delete(function(req, res) {
		Stage.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
			 return	res.send(err);
		 return	res.json("deleted :(");
		});
	});
	
router.route('/bridestages/:id')
	//gets specified bride with stage
	.get(function(req, res){
		Bride.findById({_id:req.params.id}).populate("stages").exec(function(err,data) {
			res.json(data);
			}, function(err) {
				res.json(data);
			});
	})
		//deletes the Dress	
	.delete(function(req, res) {
		Bride.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
			 return	res.send(err);
		return res.json("deleted :(");
		});
	});


module.exports = router;


