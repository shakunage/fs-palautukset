const calculateBmi = (a: number, b: number) : string => {
  const bmi = b/((a/100)*(a/100));
  if (18.5 > bmi) {
    return 'Low (underweigth)';
  }
  if (18.5 <= bmi && bmi <= 25) {
    return 'Normal (healthy weight)';
  }
  if (25 < bmi) {
    return 'High (overweigth)';
  }
  else return (
    'invalid parameters'
  );
};


//console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));

export default calculateBmi;

