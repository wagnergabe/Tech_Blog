const router = require("express").Router();
// in order to work with the database we need to require the models which in turn are connected to the database
// this is a named import, Also a constructor, 
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

// http://localhost:3000/dashboard/
// withAuth middleware is used to check if the user is logged in
router.get("/", withAuth, (req, res) => {
	Post.findAll({
		//code here
	    where: {
			user_id: req.session.user_id
		  },
		  attributes: ['id', 'title', 'post_text', 'created_at'],
		  include: [
			{
			  model: User,
			  attributes: ['username']
			},
			{
			  model: Comment,
			  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
			  include: {
				model: User,
				attributes: ['username']
			  }
			}
		  ]
		})
		.then((data) => {
			const posts = data.map(post => post.get({ plain: true }));
			res.render("dashboard", {
				layout: "dashboard",
				posts,
			  })
		
		.catch((err) => {
			console.log(err);
		})
	})
		});
// http://localhost:3000/dashboard/new
// user must be logged in to see this route
router.get("/new", withAuth, (req, res) => {
	res.render("<!-- handlebar here -->", {
		// code here
	});
});

// http://localhost:3000/dashboard/edit/:id
router.get("/edit/:id", withAuth, (req, res) => {
	Post.findByPk(req.params.id)
		.then((data) => {
			// code here
		})
		.catch((err) => {
			res.status(500).json(err);
		});
})
router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;
