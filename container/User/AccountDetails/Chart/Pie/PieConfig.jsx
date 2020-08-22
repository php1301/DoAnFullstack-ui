/* eslint-disable no-return-assign */

const processPieData = (data) => {
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;
  data.map((i) => {
    let overall = i.rating || Math.floor(Math.random() * 5) + 1; // 1 to 5
    overall /= ((i.reviews && i.reviews.length > 0) || 1);
    // console.log(overall);
    if (overall > 0 && overall <= 1) {
      one++;
    }
    if (overall > 1 && overall <= 2) {
      two++;
    }
    if (overall > 2 && overall <= 3) {
      three++;
    }
    if (overall > 3 && overall <= 4) {
      four++;
    }
    if (overall > 4) {
      five++;
    }
  });
  return {
    labels: ['1🌟', '2🌟', '3🌟', '4🌟', '5🌟'],
    datasets: [
      {
        data: [one, two, three, four, five],
        backgroundColor: ['#FF6384', '#48A6F2', '#ffbf00', '#ccffff', '#ff6600'],
        hoverBackgroundColor: ['#FF6384', '#48A6F2', '#ffbf00', '#ccffff', '#ff6600'],
      },
    ],
  };
};

export { processPieData };
