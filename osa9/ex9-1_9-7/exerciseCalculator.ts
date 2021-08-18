export interface exerciseReport {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }

 export const calculateExercises = (a: Array<number>, b: number): exerciseReport => {
    const periodLength = a.length;

    const trainingDays = a.filter(a => a !== 0).length;

    const success = (b <= (a.reduce((a, b) => a + b, 0))/periodLength)
    ? true
    : false;

    const rating = Math.round(((trainingDays/periodLength)*1)+2);

    const ratingDescription = (rating === 1)
    ? 'room for improvement'
    : (rating === 2)
    ? 'close but no cigar'
    : 'well done';

    const target = b;
    const average = (a.reduce((a, b) => a + b, 0))/periodLength;

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
  };

//const array:number[] = process.argv.map(Number);
//array.splice(0,3);

//console.log(calculateExercises(array, Number(process.argv[2])));
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))