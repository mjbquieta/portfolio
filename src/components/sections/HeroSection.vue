<script setup lang="ts">
import { ref, onMounted } from "vue";
import SocialIcons from "../icons/SocialIcons.vue";

const isLoaded = ref(false);
const showEmailDropdown = ref(false);

const socialLinks = [
  { name: "GitHub", icon: "github", url: "https://github.com/mjbquieta" },
  {
    name: "LinkedIn",
    icon: "linkedin",
    url: "https://linkedin.com/in/mjbquieta",
  },
];

const emailOptions = [
  { label: "Professional", email: "info@michaelquieta.com" },
  { label: "Personal", email: "mjbquieta@gmail.com" },
];

const toggleEmailDropdown = () => {
  showEmailDropdown.value = !showEmailDropdown.value;
};

const closeEmailDropdown = () => {
  showEmailDropdown.value = false;
};

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

onMounted(() => {
  // Trigger entrance animation
  setTimeout(() => {
    isLoaded.value = true;
  }, 100);
});
</script>

<template>
  <section id="hero" class="hero-section">
    <div class="hero-container" :class="{ loaded: isLoaded }">
      <!-- Profile illustration -->
      <div class="hero-illustration">
        <div class="profile-wrapper">
          <img
            src="/images/profile.png"
            alt="Michael John Quieta - Cartoon Profile"
            class="profile-image"
          />
          <!-- Glow effect behind profile -->
          <div class="profile-glow"></div>
        </div>
      </div>

      <!-- Hero content -->
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Available for work
        </div>

        <h1 class="hero-title">
          <span class="greeting">Hi, I'm</span>
          <span class="name">Michael John Quieta</span>
        </h1>

        <h2 class="hero-subtitle">
          <span class="typed-text">Fullstack &amp; Mobile Developer</span>
          <span class="cursor">|</span>
          <span class="typed-text secondary">Cloud Engineer</span>
        </h2>

        <p class="hero-description">
          Senior full-stack and mobile engineer with 11+ years building scalable
          systems across <strong>healthcare</strong>, <strong>banking</strong>,
          <strong>blockchain</strong>, and <strong>AI platforms</strong>.
          Turning complex problems into elegant solutions.
        </p>

        <!-- CTA Buttons -->
        <div class="hero-cta">
          <button class="btn btn-primary" @click="scrollToSection('#projects')">
            <span>View Projects</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            class="btn btn-secondary"
            @click="scrollToSection('#contact')"
          >
            <span>Get in Touch</span>
          </button>
        </div>

        <!-- Social links -->
        <div class="hero-social">
          <a
            v-for="link in socialLinks"
            :key="link.name"
            :href="link.url"
            :aria-label="link.name"
            class="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SocialIcons :icon="link.icon" :size="22" />
          </a>

          <!-- Email dropdown -->
          <div class="email-dropdown-container" @mouseleave="closeEmailDropdown">
            <button
              class="social-link email-trigger"
              @click="toggleEmailDropdown"
              aria-label="Email options"
            >
              <SocialIcons icon="email" :size="22" />
            </button>
            <div class="email-dropdown" :class="{ visible: showEmailDropdown }">
              <a
                v-for="option in emailOptions"
                :key="option.email"
                :href="`mailto:${option.email}`"
                class="email-option"
                @click="closeEmailDropdown"
              >
                <span class="email-label">{{ option.label }}</span>
                <span class="email-address">{{ option.email }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator" @click="scrollToSection('#skills')">
      <span class="scroll-text">Scroll to explore</span>
      <div class="scroll-arrow">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6rem 2rem 2rem;
  position: relative;
  overflow: hidden;
}

.hero-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.hero-container.loaded {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 900px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
}

/* Profile Illustration */
.hero-illustration {
  display: flex;
  justify-content: center;
  align-items: center;
  order: 2;
}

@media (max-width: 900px) {
  .hero-illustration {
    order: 1;
  }
}

.profile-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  filter: drop-shadow(0 10px 40px rgba(37, 99, 180, 0.3));
  border: 4px solid var(--color-border);
  transition:
    border-color 0.3s ease,
    filter 0.3s ease;
}

.profile-image:hover {
  border-color: var(--color-primary);
  filter: drop-shadow(0 15px 50px rgba(37, 99, 180, 0.4));
}

.profile-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    var(--color-primary-glow) 0%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.5;
  z-index: -1;
}

/* Floating animation for profile */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

/* Hero Content */
.hero-content {
  order: 1;
}

@media (max-width: 900px) {
  .hero-content {
    order: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.6s ease 0.2s backwards;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #22c55e;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

.hero-title {
  margin-bottom: 1rem;
  animation: fadeInUp 0.6s ease 0.3s backwards;
}

.greeting {
  display: block;
  font-size: 1.25rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: 0.25rem;
}

.name {
  display: block;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  background: var(--color-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
  animation: fadeInUp 0.6s ease 0.4s backwards;
}

@media (max-width: 900px) {
  .hero-subtitle {
    justify-content: center;
  }
}

.cursor {
  animation: blink 1s step-end infinite;
  color: var(--color-primary);
  margin: 0 0.25rem;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.secondary {
  color: var(--color-text-secondary);
}

.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 500px;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease 0.5s backwards;
}

.hero-description strong {
  color: var(--color-text);
  font-weight: 600;
}

/* CTA Buttons */
.hero-cta {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  animation: fadeInUp 0.6s ease 0.6s backwards;
}

@media (max-width: 480px) {
  .hero-cta {
    flex-direction: column;
    width: 100%;
  }

  .hero-cta .btn {
    width: 100%;
    justify-content: center;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--color-gradient);
  color: white;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
}

.btn-primary svg {
  transition: transform 0.2s ease;
}

.btn-primary:hover svg {
  transform: translateX(4px);
}

.btn-secondary {
  background: var(--color-bg-elevated);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-bg-hover);
  border-color: var(--color-primary);
}

/* Social Links */
.hero-social {
  display: flex;
  gap: 0.75rem;
  animation: fadeInUp 0.6s ease 0.7s backwards;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: var(--color-text-secondary);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.social-link:hover {
  color: var(--color-primary);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

/* Email Dropdown */
.email-dropdown-container {
  position: relative;
}

.email-trigger {
  cursor: pointer;
}

.email-dropdown {
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0.5rem;
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.email-dropdown.visible {
  opacity: 1;
  visibility: visible;
}

.email-option {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s ease;
}

.email-option:hover {
  background: var(--color-bg-hover);
}

.email-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.125rem;
}

.email-address {
  font-size: 0.875rem;
  color: var(--color-text);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease;
  animation: fadeIn 1s ease 1s backwards;
}

.scroll-indicator:hover {
  opacity: 1;
}

.scroll-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.scroll-arrow {
  animation: bounce 2s ease-in-out infinite;
  color: var(--color-text-secondary);
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.6;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 5rem 1rem 2rem;
  }

  .profile-wrapper {
    width: 220px;
    height: 220px;
  }
}
</style>
