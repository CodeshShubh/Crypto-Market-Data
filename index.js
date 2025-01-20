document.addEventListener("DOMContentLoaded", () => {
  let cardContainer = document.querySelector(".data_container");
  const sortByMarketCapBtn = document.getElementById("sortByMarketCap");
  const sortByPercentageBtn = document.getElementById("sortByPercentage");
  const searchBySymbolInput = document.getElementById('name_symbol');

  let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline";
  let cryptData = [];

  async function fetchingData() {
    try {
      let response = await fetch(url);
      let data = await response.json();
        cryptData = data;
        originRender(cryptData);
    } catch (error) {
      console.log("You Tring to do  too much get request form API:", error);
    }
  }
  

  function originRender(data){
      cardContainer.innerHTML = '';
      data.forEach((crData)=>{
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("data_card");

        cardDiv.innerHTML = `
        <div class="logo_name" style="display: flex; gap: 1rem;">
            <img src="${
              crData.image
            }" alt="img" style="width: 30px; height: 30px;" />
            <p>${crData.name}</p>
        </div>
        <p>${crData.symbol.toUpperCase()}</p>
        <p>$${crData.current_price.toLocaleString()}</p>
        <p style="color: ${crData.price_change_24h > 0 ? "green" : "red"};">${crData.price_change_24h.toFixed(2)}%</p>
        <p>Market Cap: $${crData.market_cap.toLocaleString()}</p>`;
        cardContainer.appendChild(cardDiv);
        const separator = document.createElement('hr');
            cardContainer.appendChild(separator);
         
      })
  };

  sortByMarketCapBtn.addEventListener('click', marktSort)

  function marktSort(){
          const soredByMarketCap = [...cryptData].sort(
            (a,b)=> b.market_cap - a.market_cap
          );
          originRender(soredByMarketCap);
  }

  sortByPercentageBtn.addEventListener('click', percentageSort)

  function percentageSort(){
    const sortByPercentage  =[...cryptData].sort(
        (a,b)=> b.price_change_24h - a.price_change_24h
    )
     originRender(sortByPercentage);
  }

  searchBySymbolInput.addEventListener('input', searchBySymbol);

  function searchBySymbol(){
     const searchTerm =   searchBySymbolInput.value.trim().toLowerCase();
     const filterData = cryptData.filter((data)=>
        data.symbol.toLowerCase().includes(searchTerm) ||
        data.name.toLowerCase().includes(searchTerm)
     );
     originRender(filterData);
  }

fetchingData();
});
