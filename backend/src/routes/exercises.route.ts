import { Router } from 'express';
import Exercise from '../models/exercise.model';

const router = Router();

router.get('/', async (_, res) => {
    Exercise.find()
        .then(async exs => res.json(exs))
        .catch(async err => res.status(400).json(`Error: ${err}`));
});

router.post('/add', async (req, res) => {
    const newExercise = new Exercise({
        username: req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date)
    });

    newExercise.save()
        .then(async () => res.json("Exercise added successfully!"))
        .catch(async err => res.status(400).json(`Error: ${err}`));
});

router.get('/get/:id', async (req, res) => {
    console.log(req.params);
    Exercise.findById(req.params.id)
        .then(async doc => res.json(doc))
        .catch(async err => res.status(400).json(`Error: ${err}`));
});

router.delete('/:id', async (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(async () => res.json("Exercise deleted successfully"))
        .catch(async err => res.json(`Error: ${err}`));
});

router.post('/update/:id', async (req, res) => {
    Exercise.findById(req.params.id)
        .then(async doc => {
            if (!doc) {
                res.json(`Exercise not found.`);
                return;
            }

            doc.username = req.body.username;
            doc.description = req.body.description;
            doc.duration = Number(req.body.duration);
            doc.date = Date.parse(req.body.date);

            doc.save()
                .then(async () => res.json("Exercise updated successfully"))
                .catch(async err => res.status(400).json(`Error: ${err}`));
        })
        .catch(async err => res.status(400).json(`Error: ${err}`));
});

export default router;