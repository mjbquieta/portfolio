<script setup lang="ts">
// Skill icons with playful, slightly cartoonish styling
defineProps<{
  icon: string
  size?: number
}>()
</script>

<template>
  <!-- Linux -->
  <svg v-if="icon === 'linux'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <path d="M20 8c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm-2 6c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm4 0c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm-2 12c-3 0-5-2-5-4h10c0 2-2 4-5 4z" fill="currentColor"/>
  </svg>

  <!-- AWS Cloud -->
  <svg v-else-if="icon === 'aws'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <path d="M10 22c0-3 2-5 5-5 1.5 0 2.8.6 3.7 1.5C19.5 15.5 22.5 13 26 13c4.4 0 8 3.6 8 8h-2c0-3.3-2.7-6-6-6-3 0-5.5 2.2-5.9 5-.4-.3-.9-.5-1.4-.5-1.4 0-2.5 1.1-2.5 2.5 0 1.4 1.1 2.5 2.5 2.5h13.8v2H18.7c-2.5 0-4.5-2-4.5-4.5 0-.5.1-1 .3-1.5-.9-.9-1.5-2.2-1.5-3.5H10z" fill="currentColor"/>
  </svg>

  <!-- Google Cloud -->
  <svg v-else-if="icon === 'gcp'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <path d="M20 10l8 4.6v9.2L20 28.4l-8-4.6v-9.2L20 10zm0 2.3L14 15v7l6 3.5 6-3.5v-7l-6-2.7z" fill="currentColor"/>
    <circle cx="20" cy="19" r="3" fill="currentColor"/>
  </svg>

  <!-- Java/Scala -->
  <svg v-else-if="icon === 'java'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <path d="M15 12h2v12c0 2 1.5 3.5 3.5 3.5S24 26 24 24h2c0 3-2.5 5.5-5.5 5.5S15 27 15 24V12z" fill="currentColor"/>
    <circle cx="20" cy="9" r="2" fill="currentColor"/>
  </svg>

  <!-- Docker -->
  <svg v-else-if="icon === 'docker'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <rect x="10" y="17" width="4" height="4" rx="0.5" fill="currentColor"/>
    <rect x="15" y="17" width="4" height="4" rx="0.5" fill="currentColor"/>
    <rect x="20" y="17" width="4" height="4" rx="0.5" fill="currentColor"/>
    <rect x="15" y="12" width="4" height="4" rx="0.5" fill="currentColor"/>
    <rect x="20" y="12" width="4" height="4" rx="0.5" fill="currentColor"/>
    <path d="M8 23c0 0 2 6 12 6s14-4 14-6c0-1-1-2-3-2h-22c-1 0-1 1-1 2z" fill="currentColor" opacity="0.6"/>
  </svg>

  <!-- Kubernetes -->
  <svg v-else-if="icon === 'kubernetes'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <polygon points="20,8 28,14 28,26 20,32 12,26 12,14" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="20" cy="20" r="4" fill="currentColor"/>
    <line x1="20" y1="16" x2="20" y2="8" stroke="currentColor" stroke-width="2"/>
    <line x1="23.5" y1="18" x2="28" y2="14" stroke="currentColor" stroke-width="2"/>
    <line x1="23.5" y1="22" x2="28" y2="26" stroke="currentColor" stroke-width="2"/>
    <line x1="20" y1="24" x2="20" y2="32" stroke="currentColor" stroke-width="2"/>
    <line x1="16.5" y1="22" x2="12" y2="26" stroke="currentColor" stroke-width="2"/>
    <line x1="16.5" y1="18" x2="12" y2="14" stroke="currentColor" stroke-width="2"/>
  </svg>

  <!-- JavaScript/TypeScript -->
  <svg v-else-if="icon === 'typescript'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <rect x="10" y="10" width="20" height="20" rx="3" fill="currentColor" opacity="0.3"/>
    <text x="20" y="26" text-anchor="middle" fill="currentColor" font-size="14" font-weight="bold">TS</text>
  </svg>

  <!-- DevOps -->
  <svg v-else-if="icon === 'devops'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <path d="M20 10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10zm0 3c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7z" fill="currentColor"/>
    <path d="M20 15l2 3-2 3-2-3 2-3z" fill="currentColor"/>
    <circle cx="20" cy="20" r="2" fill="currentColor"/>
  </svg>

  <!-- Vue/NextJS -->
  <svg v-else-if="icon === 'vue'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <path d="M20 10l-8 16h4l4-8 4 8h4l-8-16z" fill="currentColor"/>
    <path d="M20 14l-4 8h8l-4-8z" fill="currentColor" opacity="0.5"/>
  </svg>

  <!-- Database -->
  <svg v-else-if="icon === 'database'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <ellipse cx="20" cy="12" rx="8" ry="3" fill="currentColor"/>
    <path d="M12 12v16c0 1.7 3.6 3 8 3s8-1.3 8-3V12" fill="none" stroke="currentColor" stroke-width="2"/>
    <ellipse cx="20" cy="20" rx="8" ry="3" fill="none" stroke="currentColor" stroke-width="2"/>
  </svg>

  <!-- AI/ML -->
  <svg v-else-if="icon === 'ai'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <circle cx="20" cy="14" r="3" fill="currentColor"/>
    <circle cx="14" cy="24" r="3" fill="currentColor"/>
    <circle cx="26" cy="24" r="3" fill="currentColor"/>
    <line x1="20" y1="17" x2="14" y2="21" stroke="currentColor" stroke-width="2"/>
    <line x1="20" y1="17" x2="26" y2="21" stroke="currentColor" stroke-width="2"/>
    <line x1="14" y1="24" x2="26" y2="24" stroke="currentColor" stroke-width="2"/>
  </svg>

  <!-- NestJS -->
  <svg v-else-if="icon === 'nestjs'" :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <path d="M20 8c-1.5 0-2.8.8-3.5 2-.7-.3-1.5-.5-2.3-.5-3 0-5.5 2.5-5.5 5.5 0 1.2.4 2.3 1 3.2-.6.9-1 2-1 3.3 0 3 2.5 5.5 5.5 5.5.8 0 1.6-.2 2.3-.5.7 1.2 2 2 3.5 2s2.8-.8 3.5-2c.7.3 1.5.5 2.3.5 3 0 5.5-2.5 5.5-5.5 0-1.3-.4-2.4-1-3.3.6-.9 1-2 1-3.2 0-3-2.5-5.5-5.5-5.5-.8 0-1.6.2-2.3.5-.7-1.2-2-2-3.5-2z" fill="currentColor"/>
  </svg>

  <!-- Default fallback -->
  <svg v-else :width="size || 40" :height="size || 40" viewBox="0 0 40 40" class="skill-icon">
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" />
    <circle cx="20" cy="20" r="8" fill="currentColor" opacity="0.5"/>
  </svg>
</template>

<style scoped>
.skill-icon {
  transition: transform 0.3s ease, filter 0.3s ease;
}

.skill-icon:hover {
  transform: scale(1.1);
}
</style>
