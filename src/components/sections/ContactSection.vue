<script setup lang="ts">
import { ref } from "vue";
import { useScrollReveal } from "../../composables/useScrollReveal";
import SocialIcons from "../icons/SocialIcons.vue";

const { isVisible, setTarget } = useScrollReveal();

const contactInfo = [
  {
    icon: "email",
    label: "Professional Email",
    value: "info@michaelquieta.com",
    href: "mailto:info@michaelquieta.com",
  },
  {
    icon: "email",
    label: "Personal Email",
    value: "mjbquieta@gmail.com",
    href: "mailto:mjbquieta@gmail.com",
  },
  {
    icon: "phone",
    label: "Phone",
    value: "+63 906 556 4152",
    href: "tel:+639065564152",
  },
  {
    icon: "location",
    label: "Location",
    value: "Cebu City, Philippines 6000",
    href: null,
  },
];

const socialLinks = [
  { name: "GitHub", icon: "github", url: "https://github.com/mjbquieta" },
  {
    name: "LinkedIn",
    icon: "linkedin",
    url: "https://www.linkedin.com/in/michaelquieta",
  },
];

// Simple contact form state
const formData = ref({
  name: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);

const submitError = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  submitError.value = false;

  try {
    const response = await fetch("https://formspree.io/f/mkooqkvn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message,
      }),
    });

    if (response.ok) {
      isSubmitted.value = true;
      // Reset after showing success
      setTimeout(() => {
        isSubmitted.value = false;
        formData.value = { name: "", email: "", message: "" };
      }, 3000);
    } else {
      submitError.value = true;
      setTimeout(() => {
        submitError.value = false;
      }, 3000);
    }
  } catch {
    submitError.value = true;
    setTimeout(() => {
      submitError.value = false;
    }, 3000);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <section
    id="contact"
    class="contact-section"
    :ref="(el) => setTarget(el as HTMLElement)"
  >
    <div class="contact-container" :class="{ visible: isVisible }">
      <!-- Section Header -->
      <div class="section-header">
        <span class="section-label">Get In Touch</span>
        <h2 class="section-title">Let's Build Something Together</h2>
        <p class="section-description">
          Have a project in mind or just want to chat? I'm always open to
          discussing new opportunities and interesting ideas.
        </p>
      </div>

      <div class="contact-grid">
        <!-- Contact Info -->
        <div class="contact-info">
          <div class="info-card">
            <h3 class="info-title">Contact Information</h3>

            <div class="info-list">
              <a
                v-for="info in contactInfo"
                :key="info.label"
                :href="info.href || '#'"
                class="info-item"
                :class="{ 'no-link': !info.href }"
              >
                <span class="info-icon">
                  <SocialIcons :icon="info.icon" :size="20" />
                </span>
                <div class="info-content">
                  <span class="info-label">{{ info.label }}</span>
                  <span class="info-value">{{ info.value }}</span>
                </div>
              </a>
            </div>

            <!-- Social Links -->
            <div class="social-section">
              <span class="social-label">Find me on</span>
              <div class="social-links">
                <a
                  v-for="link in socialLinks"
                  :key="link.name"
                  :href="link.url"
                  :aria-label="link.name"
                  class="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcons :icon="link.icon" :size="24" />
                </a>
              </div>
            </div>

            <!-- Availability Badge -->
            <div class="availability">
              <span class="availability-dot"></span>
              <span class="availability-text">Available for new projects</span>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-wrapper">
          <form class="contact-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name" class="form-label">Your Name</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="form-input"
                placeholder="John Doe"
                required
              />
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="form-input"
                placeholder="john@example.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <textarea
                id="message"
                v-model="formData.message"
                class="form-input form-textarea"
                placeholder="Tell me about your project or just say hi!"
                rows="5"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              class="submit-btn"
              :class="{
                submitting: isSubmitting,
                submitted: isSubmitted,
                error: submitError,
              }"
              :disabled="isSubmitting || isSubmitted"
            >
              <span
                class="btn-text"
                v-if="!isSubmitting && !isSubmitted && !submitError"
              >
                Send Message
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </span>
              <span class="btn-loading" v-else-if="isSubmitting">
                <svg class="spinner" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    opacity="0.2"
                  />
                  <path
                    d="M12 2a10 10 0 0 1 10 10"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                  />
                </svg>
                Sending...
              </span>
              <span class="btn-error" v-else-if="submitError">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                Failed to send
              </span>
              <span class="btn-success" v-else>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Message Sent!
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <!-- <p class="footer-text">
          Designed & Built by <strong>MJBQUIETA</strong>
        </p> -->
        <p class="footer-copyright">
          &copy; {{ new Date().getFullYear() }} All rights reserved
        </p>
      </div>
    </footer>
  </section>
</template>

<style scoped>
.contact-section {
  padding: 6rem 1.5rem 0;
  position: relative;
}

.contact-container {
  max-width: 1100px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.contact-container.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-label {
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-description {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Contact Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

@media (max-width: 800px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

/* Contact Info Card */
.info-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 2rem;
  height: fit-content;
}

.info-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.info-item:not(.no-link):hover {
  background: var(--color-bg-hover);
  transform: translateX(4px);
}

.info-item.no-link {
  cursor: default;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--color-bg-hover);
  border-radius: 12px;
  color: var(--color-primary);
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.125rem;
}

.info-value {
  font-size: 0.9375rem;
  color: var(--color-text);
  font-weight: 500;
}

/* Social Section */
.social-section {
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  margin-bottom: 1.5rem;
}

.social-label {
  display: block;
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 0.75rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--color-bg-hover);
  border-radius: 12px;
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
}

.social-link:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
}

/* Availability */
.availability {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 12px;
}

.availability-dot {
  width: 10px;
  height: 10px;
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
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.availability-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #22c55e;
}

/* Contact Form */
.contact-form-wrapper {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 2rem;
  height: fit-content;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

.form-input {
  padding: 1rem 1.25rem;
  font-size: 1rem;
  font-family: inherit;
  color: var(--color-text);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  outline: none;
  transition: all 0.2s ease;
}

.form-input::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.6;
}

.form-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Submit Button */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: var(--color-gradient);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
}

.submit-btn:disabled {
  cursor: not-allowed;
}

.submit-btn.submitting {
  background: var(--color-bg-hover);
  color: var(--color-text-secondary);
  box-shadow: none;
}

.submit-btn.submitted {
  background: #22c55e;
  box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
}

.submit-btn.error {
  background: #ef4444;
  box-shadow: 0 4px 14px rgba(239, 68, 68, 0.35);
}

.btn-text,
.btn-loading,
.btn-success,
.btn-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Footer */
.footer {
  padding: 2rem 0;
  margin-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.footer-content {
  text-align: center;
}

.footer-text {
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.footer-text strong {
  color: var(--color-text);
}

.footer-copyright {
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-section {
    padding: 4rem 1rem 0;
  }

  .info-card,
  .contact-form-wrapper {
    padding: 1.5rem;
  }
}
</style>
