let slideIndex = 1;
showSlides(slideIndex);

function nextSlide() {
	showSlides(slideIndex += 1);
}

function prevSlide() {
	showSlides(slideIndex -= 1);
}

function currentSlide(n) {
	showSlides(slideIndex = n);
	console.log (n)
}

function showSlides(n) {
	let i;
	const slides = document.getElementsByClassName("slider-item");
	const dots = document.getElementsByClassName("dots_item");
	if (n > slides.length) {
		slideIndex = 1
	}
	if (n < 1) {
		slideIndex = slides.length
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].className = slides[i].className.replace(" active", "");
		slides[i].style.display = "none";
	}
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	slides[slideIndex - 1].style.display = "block";
	slides[slideIndex - 1].className += " active";
	dots[slideIndex - 1].className += " active";
}

setInterval(() => {
	nextSlide()
}, 3000)