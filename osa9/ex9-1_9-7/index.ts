import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.send({
            error: "malformatted parameters"
        });
    } else res.send({
        "height": req.query.height, 
        "weight": req.query.weight, 
        "bmi": calculateBmi(Number(req.query.height), Number(req.query.weight))
    });
  });

  app.post('/exercises', (request, response) => {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!request.body.daily_exercises || !request.body.target) {
        response.json('missing parameters');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = Number(request.body.target);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!(request.body.daily_exercises instanceof Array) || isNaN(target)) {
        response.json('malformatted parameters');
    }

    // eslint-disable-next-line
    if (request.body.daily_exercises.find((i: any) => (typeof i !== "number"))) {
        response.json('malformatted parameters');
    }


    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    response.json(calculateExercises(request.body.daily_exercises, request.body.target));
  });



const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});