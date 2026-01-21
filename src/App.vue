<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from './composables/useTheme'

// Components
import SpaceBackground from './components/common/SpaceBackground.vue'
import Navigation from './components/common/Navigation.vue'
import HeroSection from './components/sections/HeroSection.vue'
import SkillsSection from './components/sections/SkillsSection.vue'
import ProjectsSection from './components/sections/ProjectsSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import ContactSection from './components/sections/ContactSection.vue'

// Initialize theme on mount
const { theme } = useTheme()

onMounted(() => {
  // Theme is initialized via the composable
  console.log('Portfolio loaded with theme:', theme.value)
})
</script>

<template>
  <div class="app-wrapper">
    <!-- Animated space/sky background -->
    <SpaceBackground />

    <!-- Fixed navigation -->
    <Navigation />

    <!-- Main content -->
    <main class="main-content">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  position: relative;
}

.main-content {
  position: relative;
  z-index: 1;
}
</style>
