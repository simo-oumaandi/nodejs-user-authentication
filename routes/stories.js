const express = require('express');
const router = express();
const Story = require('../models/Story');
// MIDDLEWARE WILL BE ADDED IN SECOND AGRUEMENT OF A ROUTE 
const { ensureAuth } = require('../middleware/auth');

console.log("Storis");
router.get('/add', ensureAuth, (req, res, next) => {
    res.render('stories/add');
});



router.post('/add', ensureAuth, async (req, res, next) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});



router.get('/', ensureAuth, async (req, res, next) => {
    try {
        const stories = await Story.find({ status: 'public' }).populate('user').sort({ createdAt: 'desc' }).lean();
        res.render('stories/index', { stories });
    } catch (err) {
        console.log(err);
        res.render('error/500', { stories });
    }
});








// The lean option tells Mongoose to skip hydrating the result documents.
// https://mongoosejs.com/docs/tutorials/lean.html
router.get('/edit/:id', ensureAuth, async (req, res, next) => {
    try {
        const story = await Story.findOne({ _id: req.params.id }).lean();
        if (!story) {
            return res.render('error/404');
        }
        if (story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            res.render('stories/edit', { story });
        }
    } catch (err) {
        console.error(err);
        return res.render('error/500');
    }

});



router.put('/:id', ensureAuth, async (req, res, next) => {
    try {
        let story = await Story.findById(req.params.id).lean();
        if (!story) {
            return res.render('error/404');
        }
        if (story.user != req.user.id) {
            res.redirect('/stories');
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });
            res.redirect('/dashboard');
        }
    } catch (err) {
        console.error(err);
        return res.render('error/500');
    }

});


router.delete('/:id', ensureAuth, async (req, res, next) => {
    try {
        await Story.remove({ _id: req.params.id });
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err);
        return res.render('error/500');
    }
});


module.exports = router;