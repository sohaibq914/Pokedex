const button = document.querySelector("#enter");

// anon func has to be async bc we calling getPokemon which makes requests
button.addEventListener("click", async function () {
  let input = document.querySelector("#name"); // input is string
  input = parseInt(input.value); // converting to int
  await getPokemon(input);
});

async function getPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString(); // url for api

  let res = await fetch(url); // fetch api
  let pokemon = await res.json(); // into json

  // (start) getting pokemon details
  let pokemonName = pokemon["name"];
  let pokemonType = pokemon["types"];
  let pokemonImg = pokemon["sprites"]["front_default"];

  res = await fetch(pokemon["species"]["url"]);
  let pokemonDesc = await res.json();
  pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"];
  // (end) getting pokemon details

  // name
  let name = document.querySelector("#name-label");
  name.textContent = "Name: ";
  name.textContent += pokemonName;

  // img
  let img = document.querySelector("img");
  img.src = pokemonImg;

  // type
  let type = document.querySelector("#type");
  type.textContent = "Type: ";
  for (let i = 0; i < pokemonType.length; i++) {
    // going thru the type array
    if (i == pokemonType.length - 1) {
      type.textContent += pokemonType[i]["type"]["name"];
    } else {
      type.textContent += pokemonType[i]["type"]["name"] + ", "; // comma formatting
    }
  }

  // desc
  let desc = document.querySelector("#desc");
  desc.textContent = "Description: ";
  desc.textContent += pokemonDesc;
}
