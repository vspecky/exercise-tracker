import { Router } from 'express';
import User from '../models/user.model';

const router = Router();

router.get('/', async (_, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.post('/add', async (req, res) => {
    console.log(req.body);
    const newUser = new User({
        username: req.body.username
    });

    newUser.save()
        .then(() => res.json("User added successfully"))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

export default router;