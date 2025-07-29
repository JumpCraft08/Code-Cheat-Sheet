/* ====================================
   CERRAR MODAL AL HACER CLICK FUERA
==================================== */
document.querySelectorAll('.modal').forEach(modal => {
  modal.onclick = e => {
    if (e.target === modal) {
      location.hash = ''
    }
  }
})

/* ===================================
   CONTROL DE SLIDES POR CADA MODAL
=================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal').forEach(modal => {
    const slides = modal.querySelectorAll('.slide')
    const header = modal.querySelector('.modal-header')
    const dotsContainer = modal.querySelector('.slide-dots')
    const prevBtn = modal.querySelector('.prev-slide')
    const nextBtn = modal.querySelector('.next-slide')
    let currentIndex = 0

    if (!slides.length) {
      return // Si no hay slides, no hacer nada.
    }

    if (dotsContainer) {
      slides.forEach((_, i) => {
        const dot = document.createElement('a')
        dot.href = '#'
        dot.className = 'dot' + (i === 0 ? ' active' : '')
        dot.onclick = e => {
          e.preventDefault()
          showSlide(i)
        }
        dotsContainer.appendChild(dot)
      })
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : []

    function showSlide (i) {
      i = (i + slides.length) % slides.length // cicla índice
      slides[currentIndex].classList.remove('active')
      if (dots.length) {
        dots[currentIndex].classList.remove('active')
      }
      slides[i].classList.add('active')
      if (dots.length) {
        dots[i].classList.add('active')
      }
      header.textContent = slides[i].dataset.title || 'Modal'
      currentIndex = i
    }

    if (prevBtn) {
      prevBtn.onclick = e => {
        e.preventDefault()
        showSlide(currentIndex - 1)
      }
    }
    if (nextBtn) {
      nextBtn.onclick = e => {
        e.preventDefault()
        showSlide(currentIndex + 1)
      }
    }

    showSlide(0)
  })
})
