"use client"

import { useEffect } from "react"

/**
 * A hook that uses IntersectionObserver to add an 'active' class to elements
 * with the 'reveal-on-scroll' class when they enter the viewport.
 * 
 * Updated to use a MutationObserver to ensure that dynamically added elements
 * (like those appearing after a menu filter is applied) are also observed.
 */
export function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      { threshold: 0.1 }
    )

    const observeElements = () => {
      const elements = document.querySelectorAll(".reveal-on-scroll:not(.active)")
      elements.forEach((el) => observer.observe(el))
    }

    // Initial observation of static elements
    observeElements()

    // Watch for DOM changes (like menu filtering) to observe newly rendered elements
    const mutationObserver = new MutationObserver(() => {
      observeElements()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return null
}
