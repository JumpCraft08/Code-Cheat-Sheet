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



/* =========================
   LAZY LOAD PARA MODALES
========================= */
;(function() {
  const modalsContainer = document.querySelector('.modals')
  if (!modalsContainer) return

  const modales = Array.from(modalsContainer.querySelectorAll('.modal'))

  // Ocultar visualmente modales al inicio, pero sin display:none
  modales.forEach(modal => {
    modal.style.visibility = 'hidden'
    modal.style.pointerEvents = 'none'
  })

  // Función para mostrar modal (solo cambia visibilidad y pone foco)
  function mostrarModal(id) {
    // Ocultar todos
    modales.forEach(m => {
      m.style.visibility = 'hidden'
      m.style.pointerEvents = 'none'
    })

    // Buscar el modal por id y mostrarlo
    const modal = modales.find(m => m.id === id)
    if (!modal) return

    modal.style.visibility = 'visible'
    modal.style.pointerEvents = 'auto'

    // Para que las funciones normales se activen bien, lanzar evento load si fuera necesario
    // (O llamar manualmente a init si quieres, pero no toco tus funciones)
  }

  // Escuchar hash para mostrar modales
  function checkHash() {
    const hash = location.hash.slice(1)
    if (!hash) {
      modales.forEach(m => {
        m.style.visibility = 'hidden'
        m.style.pointerEvents = 'none'
      })
      return
    }
    mostrarModal(hash)
  }

  window.addEventListener('hashchange', checkHash)
  window.addEventListener('load', checkHash)

})()
