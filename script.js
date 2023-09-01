const search = document.getElementById("search");
const matchlist = document.getElementById("match-list");

const searchstates = async (searchtext) => {
  const res = await fetch("state.json");
  const states = await res.json();

  //get match to current text input

  let match = states.filter((state) => {
    const regex = new RegExp(`^${searchtext}`, "gi");
    return state.name.match(regex) || state.abbr.match(regex);
  });
  // console.log(match);
  if (searchtext.length === 0) {
    match = [];
    matchlist.innerHTML = "";
  }

  outputhtml(match);
};
const outputhtml = (match) => {
  if (match.length > 0) {
    const html = match
      .map(
        (match) => `
    <div class="card card-body mb-1">
      <h4>${match.name} (${match.abbr}) <span class="text-primary">
      ${match.capital}</span></h4>
      <small>lat: ${match.lat} / Long : ${match.long} </small>
    </div>
    `
      )
      .join("");
    matchlist.innerHTML = html;
  }
};

search.addEventListener("input", () => searchstates(search.value));
