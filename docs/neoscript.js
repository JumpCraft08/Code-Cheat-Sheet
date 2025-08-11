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



/* ===================================================
   NUEVA FUNCIÓN: LAZY LOAD PARA MODALES EN .modals
   Solo inicializa y muestra modales al abrirlos
=================================================== */
;(function() {  // Punto y coma para prevenir errores de concatenación en scripts
  const modalsContainer = document.querySelector('.modals')
  if (!modalsContainer) return

  const modales = Array.from(modalsContainer.querySelectorAll('.modal'))

  // Ocultamos todos los modales al inicio para que no ralenticen
  modales.forEach(modal => {
    modal.style.display = 'none'
  })

  // Función para inicializar el modal activo (como tu código, pero solo para uno)
  function initModal(modal) {
    if (modal.dataset.lazyInited === 'true') return // Ya inicializado

    const slides = modal.querySelectorAll('.slide')
    const header = modal.querySelector('.modal-header')
    const dotsContainer = modal.querySelector('.slide-dots')
    const prevBtn = modal.querySelector('.prev-slide')
    const nextBtn = modal.querySelector('.next-slide')
    let currentIndex = 0

    if (!slides.length) return

    if (dotsContainer) {
      dotsContainer.innerHTML = ''
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

    function showSlide(i) {
      i = (i + slides.length) % slides.length
      slides[currentIndex].classList.remove('active')
      if (dots.length) dots[currentIndex].classList.remove('active')
      slides[i].classList.add('active')
      if (dots.length) dots[i].classList.add('active')
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

    modal.dataset.lazyInited = 'true'
  }

  // Función para abrir un modal dado su id
  function abrirModal(id) {
    // Ocultar todos los modales
    modales.forEach(m => m.style.display = 'none')

    // Buscar modal por id
    const modal = modales.find(m => m.id === id)
    if (!modal) return

    modal.style.display = 'block'
    initModal(modal)
  }

  // Abrir modal según el hash en la URL, si existe
  function checkHash() {
    const hash = location.hash.slice(1)
    if (!hash) {
      modales.forEach(m => m.style.display = 'none')
      return
    }
    abrirModal(hash)
  }

  // Escuchar cambios de hash (cuando abres o cierras modales vía hash)
  window.addEventListener('hashchange', checkHash)
  window.addEventListener('load', checkHash)

  // Opcional: si quieres abrir modal con función JS, exponla:
  window.abrirModalLazy = abrirModal

})()
