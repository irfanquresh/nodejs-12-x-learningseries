const { Observable } = require("rxjs");

let onservable$ = new Observable((observable) => {
  let i = 0;
  let cancellationToken = setInterval(() => {
    observable.next(i);
    i++;
  }, 1000);

  setTimeout(() => {
    clearInterval(cancellationToken);
    observable.complete();
  }, 10000);
});

onservable$.subscribe(
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
