// // Google Map iFrame 

const landmarks = document.querySelectorAll('#landmarkList li');
const mapFrame = document.getElementById('mapFrame');

landmarks.forEach(item => {
    item.addEventListener("click", () => {
        landmarks.forEach(li => li.classList.remove("active"));
        item.classList.add("active");
        const location = item.getAttribute("data-location")

        mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`
    })
})
            
