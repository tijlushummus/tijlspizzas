// Prijzen van pizza's
const prijzen = {
    Margherita: 9.5,
    Pepperoni: 10,
    Hawaii: 10,
    Vegetariana: 10.5,
    "Quattro Stagioni": 11
};

// Lijst bijhouden
const pizzaLijst = [];

// Toevoegen van pizza's
document.getElementById("voegToe").addEventListener("click", function () {
    const pizza = document.getElementById("pizza").value;
    const aantal = parseInt(document.getElementById("aantal").value);

    if (pizza && aantal) {
        pizzaLijst.push({ pizza, aantal });
        updateBestellingLijst();
    } else {
        alert("Selecteer een pizza en geef het aantal op.");
    }
});

// Bijwerken van de lijst
function updateBestellingLijst() {
    const lijstElement = document.getElementById("bestellingLijst");
    lijstElement.innerHTML = "";

    pizzaLijst.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.aantal}x ${item.pizza} `;

        // Verwijderknop maken
        const verwijderKnop = document.createElement("button");
        verwijderKnop.textContent = "x";
        verwijderKnop.style.marginLeft = "10px";
        verwijderKnop.style.fontSize = "12px";
        verwijderKnop.style.padding = "2px 5px";
        verwijderKnop.style.cursor = "pointer";
        verwijderKnop.addEventListener("click", function () {
            pizzaLijst.splice(index, 1); // Verwijder het item uit de lijst
            updateBestellingLijst();
        });

        li.appendChild(verwijderKnop);
        lijstElement.appendChild(li);
    });

    updateTotaalPrijs(); // Totale prijs bijwerken
}

// Totale prijs berekenen en weergeven
function updateTotaalPrijs() {
    const totaalPrijs = pizzaLijst.reduce((totaal, item) => {
        return totaal + prijzen[item.pizza] * item.aantal;
    }, 0);

    document.getElementById("totaalPrijs").textContent = `Totale prijs: €${totaalPrijs.toFixed(2)}`;
}

// Voeg een verborgen invoerveld toe voor de totale prijs
const totaalPrijsInput = document.createElement("input");
totaalPrijsInput.type = "hidden";
totaalPrijsInput.name = "totaalPrijs";
document.getElementById("bestelForm").appendChild(totaalPrijsInput);

// Update het verborgen veld telkens als de totale prijs verandert
function updateTotaalPrijs() {
    const totaalPrijs = pizzaLijst.reduce((totaal, item) => {
        return totaal + prijzen[item.pizza] * item.aantal;
    }, 0);

    document.getElementById("totaalPrijs").textContent = `Totale prijs: €${totaalPrijs.toFixed(2)}`;
    totaalPrijsInput.value = `€${totaalPrijs.toFixed(2)}`;
}

// Formulierverwerking
document.getElementById("bestelForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (pizzaLijst.length === 0) {
        alert("Voeg minstens één pizza toe aan je bestelling.");
        return;
    }

    // Ga naar de volgende pagina
    window.location.href = "behandeling.html";
});
