
Meteor.publish("restaurantes", function () {
  return Restaurants.find({});
});

Meteor.publish("genero", function () {
  return Genero.find({});
});


Meteor.publish("estadisticas", function () {
  return Estadisticas.find({});
});

Meteor.publish("heat", function () {
  return Heat.find({});
});