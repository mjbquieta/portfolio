<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    isMobileMenuOpen.value = false
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="navigation" :class="{ scrolled: isScrolled, 'menu-open': isMobileMenuOpen }">
    <div class="nav-container">
      <!-- Logo / Name -->
      <a href="#hero" class="nav-logo" @click.prevent="scrollToSection('#hero')">
        <span class="logo-icon">MJ</span>
        <span class="logo-text">Michael John</span>
      </a>

      <!-- Desktop Navigation -->
      <ul class="nav-links">
        <li v-for="item in navItems" :key="item.href">
          <a
            :href="item.href"
            class="nav-link"
            @click.prevent="scrollToSection(item.href)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>

      <!-- Right side: Theme toggle + Mobile menu button -->
      <div class="nav-actions">
        <ThemeToggle />

        <!-- Mobile menu button -->
        <button
          class="mobile-menu-btn"
          :class="{ active: isMobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Toggle mobile menu"
        >
          <span class="hamburger">
            <span class="line" />
            <span class="line" />
            <span class="line" />
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ open: isMobileMenuOpen }">
      <ul class="mobile-nav-links">
        <li v-for="(item, index) in navItems" :key="item.href" :style="{ '--delay': `${index * 0.1}s` }">
          <a
            :href="item.href"
            class="mobile-nav-link"
            @click.prevent="scrollToSection(item.href)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 0;
  transition: background 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease;
}

.navigation.scrolled {
  padding: 0.75rem 0;
  background: var(--color-bg-glass);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 700;
  transition: transform 0.2s ease;
}

.nav-logo:hover {
  transform: scale(1.02);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: var(--color-gradient);
  color: white;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.nav-logo:hover .logo-icon {
  transform: rotate(-5deg);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

.logo-text {
  font-size: 1.125rem;
  letter-spacing: -0.02em;
}

/* Desktop Navigation Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}

.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 8px;
  transition: color 0.2s ease, background 0.2s ease;
}

.nav-link:hover {
  color: var(--color-text);
  background: var(--color-bg-hover);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  border-radius: 2px;
  transform: translateX(-50%);
  transition: width 0.2s ease;
}

.nav-link:hover::after {
  width: calc(100% - 2rem);
}

/* Nav Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Mobile Menu Button */
.mobile-menu-btn {
  display: none;
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.mobile-menu-btn:hover {
  background: var(--color-bg-hover);
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 24px;
}

.line {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.mobile-menu-btn.active .line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn.active .line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn.active .line:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* Mobile Navigation */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-bg-glass);
  backdrop-filter: blur(16px);
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}

.mobile-nav.open {
  max-height: 400px;
  padding: 1rem 0;
}

.mobile-nav-links {
  list-style: none;
  margin: 0;
  padding: 0 1.5rem;
}

.mobile-nav-links li {
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  transition-delay: var(--delay);
}

.mobile-nav.open .mobile-nav-links li {
  opacity: 1;
  transform: translateY(0);
}

.mobile-nav-link {
  display: block;
  padding: 1rem;
  color: var(--color-text);
  text-decoration: none;
  font-size: 1.125rem;
  font-weight: 500;
  border-radius: 12px;
  transition: background 0.2s ease, color 0.2s ease;
}

.mobile-nav-link:hover {
  background: var(--color-bg-hover);
  color: var(--color-primary);
}

/* Hide logo text on small screens */
@media (max-width: 480px) {
  .logo-text {
    display: none;
  }
}
</style>
