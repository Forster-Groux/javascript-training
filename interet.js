function epargne(taux) {
  var capital = 10000;

  for (var i = 0; i < 10; i++) {
    capital += 6000;
    capital += capital*taux/100;
    capital += 6000;
  }

  console.log("Capital pour " + taux + "% : " + capital);
}

epargne(5);
epargne(10);
