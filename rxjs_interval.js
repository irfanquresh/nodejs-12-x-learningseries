const { interval } = require("rxjs");
const { map, filter, buffer } = require("rxjs/operators");

observable$ = interval(1000).pipe(
  map((v) => v + 10),
  filter((v) => v % 2 == 0),
  buffer(interval(5000))
);

observable$.subscribe(
  (value) => {
    console.log(`Observable emitted value: ${value}`);
  },
  (err) => {
    console.log(`There has been an error: `, err);
  },
  (completed) => {
    console.log(`Observable completed`);
  }
);
