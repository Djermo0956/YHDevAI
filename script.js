document.addEventListener("DOMContentLoaded", () => {
    const rainContainer = document.getElementById("rain-container");

    function createRaindrop() {
        const raindrop = document.createElement("div");
        raindrop.classList.add("raindrop");
        raindrop.style.left = `${Math.random() * 100}vw`;
        raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`;
        rainContainer.appendChild(raindrop);

        raindrop.addEventListener("animationend", () => {
            raindrop.remove();
        });
    }

    setInterval(createRaindrop, 100);
});
